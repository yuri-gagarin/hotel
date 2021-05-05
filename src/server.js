import express from "express";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import socketIo from 'socket.io';
import redis from "redis";
import path from "path";
import passport from "passport";
import session from "express-session";
import passportSrategy from "./controllers/helpers/authHelper";
import combineRoutes from "./routes/combineRoutes";
import cors from "cors";
dotenv.config();

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8080;
let io;
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
app.use(express.static(path.join(__dirname, "..", "public"))); 

// Router and routers //
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));
  app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/build/index.html"));
  });
}
else {
  app.use(express.static(path.join(__dirname, "..", "client", "public")));
  app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/public/index.html"));
  });
}
combineRoutes(router);
app.use(router);



// app config //
export const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASS || 'password',
});
app.on("dbReady", () => {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.info(`App listening at Port: ${PORT}`);
  });
  io = socketIo.listen(server);
  io.set("origins","*:*");
  io.attach(redisClient);
  // IO functionality //
  io.sockets.on("connection", (socket) => {
    socket.on("sendClientCredentials", (user) => {
      // set client id with socket id in redis to prevent multiple connections //
      redisClient.hmset(user._id, user._id, socket.id, (error) => {
        if (error) {
          console.error(error);
          socket.emit("socketConnectionError");
          return;
        }
        socket.emit("clientCredentialsReceived");
      });
    });
    socket.on("clientLeaving",  (user) => {
      // remove client information from redis //
      if (user._id)
      redisClient.del(user._id, (error) => {
        if (error) {
          console.error(error);
          socket.emit("socketConnectionError");
          return;
        }
      });
      
    });
    // listen for an administrator to connect //
    socket.on("adminConnected", (admin) => {
      redisClient.hmset(admin._id, admin._id, socket.id, (error) => {
        if (error) {
          console.error(error);
          socket.emit("socketConnectionError");
          return;
        }
        socket.emit("adminCredentialsReceived");
      })
    })
    // keeping connection alive //
    socket.on("keepConnectionAlive", () => {
    });
    //

    // client is messaging //
    socket.on("clientMessageSent", (data) => {
      // emits a an event to notify admin of a new message //
      const { conversationId, userId, newMessage } = data;
      const socketId = socket.id;
      redisClient.hmset(userId, userId, socketId, (error) => {
        if (error) {
          console.error(error);
          return;
        }
        socket.broadcast.emit("newClientMessage", { conversationId: conversationId, newMessage: newMessage, socketId: socketId });
      });
    });
    // end client messaging //
    // admin response messaging //
    socket.on("adminResponseSent", (data) => {
      const { clientSocketId, newMessage } = data;
      socket.broadcast.to(clientSocketId).emit("newAdminMessage", newMessage);
    });
    // end admin response 
    socket.once("disconnect", () => {
      console.log("client disconnected");
    })
    socket.emit("hello", "hello there");

  });

});
// variable exports //
export const APP_HOME_DIRECTORY = path.join(__dirname, "..");
export { io as ioInstance };



