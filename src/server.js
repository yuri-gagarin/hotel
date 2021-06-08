import express from "express";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import { Server as SocketIOServer } from 'socket.io';
import path from "path";
import passport from "passport";
import session from "express-session";
import passportSrategy from "./controllers/helpers/authHelper";
import combineRoutes from "./routes/combineRoutes";
import cors from "cors";
import RedisController from "./controllers/redisController";
import Conversation from "./models/Conversation";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8080;
const io = new SocketIOServer();
// directories //
export const APP_HOME_DIRECTORY = path.join(__dirname, "..");
// database and connection //
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
}
if (process.env.NODE_ENV === "production") {
  mongoose.connect(process.env.PRODUCTION_MONGO_URI, mongoOptions, (err) => {
    if (err) console.error(err);
  });
} else if (process.env.NODE_ENV === "test") {
  mongoose.connect(process.env.TEST_MONGO_URI, mongoOptions, (err) => {
    if (err) console.error(err);
  });
} else {
  mongoose.connect(process.env.DEV_MONGO_URI, mongoOptions, (err) => {
    if (err) console.error(err);
  });
}

mongoose.connection.once("open", () => {
  app.emit("dbReady");
});
// end database setup //

// body parser middleware //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// passport middleware //
if (process.env.NODE_ENV === "production") {
  app.use(session({ 
    secret: process.env.SECRET, 
    saveUninitialized: false,
    resave: false,
    unset: 'destroy',
    store: new MongoStore({ mongoUrl: process.env.PRODUCTION_SESSION_MONGO_URI }),
    cookie: {
        sameSite: 'Lax',
        maxAge: 60000,
        secure: true
    } 
  }));

} else {
  app.use(session({ secret: process.env.SECRET, saveUninitialized: false,
    resave: false,
    unset: 'destroy',
    cookie: {
        sameSite: 'Lax',
        maxAge: 60000,
        secure: true
    } 
  }));
}

passportSrategy(passport);
app.use(passport.initialize());
app.use(passport.session());


// cors //
app.use(cors({origin : '*'}))

// serve the static files from the React app /
app.use(express.static(path.join(APP_HOME_DIRECTORY, "public"))); 

// Router and routers //
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(APP_HOME_DIRECTORY, "client", "build")));
  app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path.join(APP_HOME_DIRECTORY, "client/build/index.html"));
  });
}
else {
  app.use(express.static(path.join(APP_HOME_DIRECTORY, "client", "public")));
  app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path.join(APP_HOME_DIRECTORY, "client/public/index.html"));
  });
}
combineRoutes(router);
app.use(router);



// app config //
app.on("dbReady", () => {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.info(`App listening at Port: ${PORT}`);
  });
  io.attach(server, { cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] } });

  // TODO this needs to be separated to separate controller //
  // IO functionality //
  io.on("connection", (socket) => {
    console.log("connection");

    socket.on("receiveClientCredentials", (userState) => {
      const { _id: userId, name, email } = userState;
      const { id: socketId } = socket;
      if (!userId || !name) {
        socket.emit("generalSocketError", ({ message: "Could not resolve user" }));
        return;
      }
      // set client id with socket id in redis to prevent multiple connections //
      return RedisController.setClientCredentials({ userId, socketId, name, email })
        .then((res) => {
          if (res && res === "OK") {
            // new user //
            return RedisController.getVisibleAdmins();
          } else {
            return Promise.resolve({ visibleAdminSocketIds: [], numberOfVisibleAdmins: 0 });
          }
          // emit new connection to admin? //
        })
        .then(({ visibleAdminSocketIds, numberOfVisibleAdmins }) => {
          if (visibleAdminSocketIds.length > 0) {
            for (const adminSocketId of visibleAdminSocketIds) {
              io.to(adminSocketId).emit("newClientConnected", { ...userState, socketId: socketId });
            }
          }
          if (numberOfVisibleAdmins > 0) {
            const messageData = {
              _id: mongoose.Types.ObjectId(),
              conversationId: `CONVERSATION_${socket.id}`,
              receiverSocketId: socket.id,
              sender: "admin",
              senderSocketId: "",
              messageContent: "Hello and welcome. We are online. Feel free to message us with any questions",
              sentAt: new Date().toDateString()
            };
            socket.emit("clientCredentialsReceived", { numberOfVisibleAdmins, messageData });
          } else {
            socket.emit("clientCredentialsReceived", { numberOfVisibleAdmins });
          }
        })
        .catch((err) => {
          console.log(err)
          socket.emit("socketConnectionError", { message: "Messenger connection error" });
        })
    });


    // listen for an administrator to connect //
    socket.on("adminConnected", (admin) => {
      RedisController.setAdminCredentials(admin)
        .then(() => {
          socket.emit("adminCredentialsReceived");
        })
        .catch((error) => {
          console.log(error);
        })
    })
    // admin messenger online offline listener //
    socket.on("toggleAdminOnlineStatus", (data) => {
      const { messengerOnline } = data;
      const { id : socketId } = socket;
      if (messengerOnline) {
        // take admin messenger online //
        return Promise.all( [
          RedisController.setNewVisibleAdmin(socketId),
          RedisController.getConnectedClients(),
        ])
        .then(([ _, connectedClientsRes ]) => {
          const { numberOfConnectedClients, visibleClientSocketIds, clientsDataArr } = connectedClientsRes;
          io.to(socketId).emit("setAdminMessengerOnlineStatus", { messengerOnline: true, numberOfConnectedClients, visibleClientSocketIds, clientsDataArr });
          io.emit("adminConnected", { adminSocketId: socketId });
        })
        .catch((error) => {
          io.to(socketId).emit("generalSocketIOError", error);
        });
      } else {
        // take admin messenger offline //
        return RedisController.removeVisibleAdmin(socketId)
          .then(() => {
            io.to(socketId).emit("setAdminMessengerOnlineStatus", { messengerOnline: false });
            return RedisController.getVisibleAdmins();
          })
          .then(({ numberOfVisibleAdmins }) => {
            if (numberOfVisibleAdmins === 0) {
              io.emit("adminMessengerOffline");
            }
          })
          .catch((error) => {
            console.log(error);
            io.to(socketId).emit("generalSocketIOError", error);
          })
      }
    })
    // keeping connection alive //
    socket.on("keepConnectionAlive", () => {
    });
    //

    // client is messaging //
    socket.on("newClientMessageSent", (data) => {
      // emits a an event to notify admin of a new message //
      return RedisController.getVisibleAdmins()
        .then(({ numberOfVisibleAdmins, visibleAdminSocketIds }) => {
          if (numberOfVisibleAdmins === 0) {
            // emit a messenger offline message //
            // save message to the database ? //
            const genericResponseMsg = {
              _id: mongoose.Types.ObjectId(),
              conversationId: `CONVERSATION_${socket.id}`,
              receiverSocketId: socket.id,
              sender: "admin",
              senderSocketId: "",
              messageContent: "We are offline but your message has been sent to our servers",
              sentAt: new Date().toDateString()
            }
            socket.emit("adminMessengerOffline", genericResponseMsg);
          } else {
            for (const socketId of visibleAdminSocketIds) {
              io.to(socketId).emit("receiveClientMessage", data);
            }
            return RedisController.setNewMessage(data)
              .then(() => {
                // do something with it //
                io.to(socket.id).emit("messageDelivered", data);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      
    });
    // end client messaging //

    socket.on("newAdminMessageSent", (data) => {
      const { receiverSocketId } = data;
      console.log(242);
      console.log(data);
      if (receiverSocketId) {
        return RedisController.setNewMessage(data)
          .then(() => {
            io.to(receiverSocketId).emit("receiveAdminReply", data);
          })
          .catch((error) => {
            console.log(`server.js 250:`, error);
          });
      }
    });

    socket.on("conversationArchived", (data) => {
      const { conversationId, receiverSocketId } = data;
      // TODO //
      // handle an error with incorrect input //
      if (!conversationId || !receiverSocketId) return;
      console.log(257);
      console.log(data);
      return RedisController.removeConversationData(conversationId)
        .then(() => {
          const archivedConversationMessage = {
            _id: mongoose.Types.ObjectId(),
            conversationId: conversationId,
            senderSocketId: "",
            receiverSocketId: "",
            sender: "admin",
            messageContent: "Our admins have marked this conversation as resolved. If you would like to continue the conversation please click on the button below...",
            sentAt: new Date().toISOString()
          };
          io.to(receiverSocketId).emit("receiveAdminConversationArchived", archivedConversationMessage);
        })
        .catch((error) => {
          console.log(`server.js: 265`);
          console.log(error);
        });
    });
    socket.on("continueClientConversationRequest", (data) => {
      // CLIENT WANTS TO CONTINUE CONVERSTION WHICH ADMIN ARCHIVED //
      const { conversationId } = data;
      if (!conversationId) {
        io.to(socket.id).emit("generalSocketIOError", (new Error("Couldn't resolve archived conversation")));
      } else {
        Conversation.findOne({ conversationId }).exec()
          .then((conversation) => {
            console.log(conversation);
            const { conversationId } = conversation;
            io.to(socket.id).emit("continueClientConversationSuccess", { conversationId });
          })
          .catch((error) => {
            console.log(error);
            io.to(socket.id).emit("generalSocketIOError");
          });
      }
    });
    // end admin response 
    socket.once("disconnect", () => {
      const { id : socketId } = socket;
      // remove from redis mem //
      console.log("disconnected");
      return RedisController.removeClientCredentials(socketId)
        .then(({ numOfClientHashesRemoved, numOfClientSocketIdsRemoved }) => {
          if (numOfClientHashesRemoved > 0 || numOfClientSocketIdsRemoved > 0) {
            return RedisController.getVisibleAdmins()
              .then(({ visibleAdminSocketIds }) => {
                if (visibleAdminSocketIds.length > 0) {
                  for (const adminSocketId of visibleAdminSocketIds) {
                    io.to(adminSocketId).emit("clientDisconnected", { clientSocketId: socketId });
                  }
                }
                return Promise.resolve()
              })
          } else {
            return RedisController.removeVisibleAdmin(socketId)
              .then(({ numberRemoved }) => {
                if (numberRemoved > 0) {
                  return RedisController.getVisibleAdmins();
                } else {
                  return Promise.resolve({ numberOfVisibleAdmins: 0 });
                }
              })
              .then(({ numberOfVisibleAdmins }) => {
                if (numberOfVisibleAdmins === 0) {
                  io.emit("adminMessengerOffline")
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
      .then(() => {
      })
      .catch((err) => {
        console.error(err);
      });
    });

  });
});
// variable exports //
export { io as ioInstance };



