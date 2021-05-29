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
      const { _id: userId, name } = userState;
      const { id: socketId } = socket;
      if (!userId || !name) {
        socket.emit("generalSocketError", ({ message: "Could not resolve user" }));
        return;
      }
      // set client id with socket id in redis to prevent multiple connections //
      return RedisController.setClientCredentials({ userId, socketId, name })
        .then((res) => {
          if (res && res === 1) {
            // new user //
            return RedisController.getVisibleAdmins();
          } else {
            return Promise.resolve({ visibleAdminSocketIds: [] });
          }
          // emit new connection to admin? //
        })
        .then(({ visibleAdminSocketIds }) => {
          if (visibleAdminSocketIds.length > 0) {
            for (const adminSocketId of visibleAdminSocketIds) {
              io.to(adminSocketId).emit("newClientConnected", { ...userState, socketId: socketId });
            }
          }
          socket.emit("clientCredentialsReceived");
        })
        .catch((err) => {
          console.log(err)
          socket.emit("socketConnectionError", { message: "Messenger connection error" });
        })
    });


    // listen for an administrator to connect //
    socket.on("adminConnected", (admin) => {
      console.log("adminConnected")
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
      console.log("Status: " + messengerOnline);
      if (messengerOnline) {
        // take admin messenger online //
        return RedisController.setNewVisibleAdmin(socketId)
          .then(() => {
            io.to(socketId).emit("setAdminMessengerOnlineStatus", { messengerOnline: true });
          })
          .catch((error) => {
            io.to(socketId).emit("generalSocketIOError", error);
          });
      } else {
        // take admin messenger offline //
        return RedisController.removeVisibleAdmin(socketId)
          .then(() => {
            io.to(socketId).emit("setAdminMessengerOnlineStatus", { messengerOnline: false });
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
              console.log(214)
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
        })
      
    });
    // end client messaging //
    // end admin response 
    socket.once("disconnect", () => {
      console.log("client disconnected");
      const { id : socketId } = socket;
      // remove from redis mem //
      return RedisController.removeClientCredentials(socketId)
        .then((res) => {
          if (res && res === 1) {
            console.log("guest client exited");
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
            return RedisController.removeVisibleAdmin(socketId);
          }
        })
      .then(() => {
      })
      .catch((err) => {
        console.error(err);
      })
    })
    socket.emit("hello", "hello there");

  });
});
// variable exports //
export { io as ioInstance };



