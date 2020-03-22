import express from "express";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import socketIo from 'socket.io';
import redis from "redis";
import path from "path";
import passport from "passport";
import session from "express-session";
import passportSrategy from "./controllers/helpers/authHelper";
import appConfig from "./config/appConfig";
import combineRoutes from "./routes/combineRoutes";

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8080;
const clientsMap = new Map();
// database and connection //
const { dbSettings } = appConfig;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: dbSettings.useFindAndModify,
  user: dbSettings.username,
  pass: dbSettings.password
};
mongoose.connect(dbSettings.mongoURI, mongoOptions, (err) => {
  if (err) console.error(err);
});
mongoose.connection.once("open", () => {
  app.emit("dbReady");
});
// end database setup //

// body parser middleware //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// passport middleware //
app.use(session({
  ...appConfig.session
}));
passportSrategy(passport);
app.use(passport.initialize());
app.use(passport.session());

// serve the static files from the React app //
// app.use(express.static(path.join(__dirname, "client/build")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client/build")));
  app.get("/", () => {
    res.sendFile(path.resolve(__dirname, "client/dist/index.html"));
  });
}
else {
  app.use(express.static(path.resolve(__dirname, "client/src")));
  app.get("/", () => {
    res.sendFile(path.resolve(__dirname, "client/public/index.html"));
  });
}
app.use(express.static(path.resolve(__dirname,  "public"))); 
// Router and routers //
combineRoutes(router);
app.use(router);

//app.use()
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
  global.io = socketIo.listen(server);
  io.attach(redisClient);
  // IO functionality //
  io.sockets.on("connection", (socket) => {
    socket.on("sendClientCredentials", (user) => {
      // set client id with socket id in redis to prevent multiple connections //
      redisClient.hmset(user._id, user._id, socket.id, (error, reply) => {
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
      redisClient.del(user._id, (error, reply) => {
        if (error) {
          console.error(error);
          socket.emit("socketConnectionError");
          return;
        }
      });
      
    });
    // listen for an administrator to connect //
    socket.on("adminConnected", (admin) => {
      console.log(admin);
      redisClient.hmset(admin._id, admin._id, socket.id, (error, reply) => {
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
      socket.broadcast.emit("newClientMessage", { ...data, socketId: socket.id });
    });
    // end client messaging //
    // admin response messaging //
    socket.on("adminResponseSent", (data) => {
      const { clientSocketId, newMessage } = data;
      console.log(data);
      socket.broadcast.to(clientSocketId).emit("newAdminMessage", data);
    });
    // end admin response 
    socket.once("disconnect", () => {
      console.log("client disconnected");
    })
    socket.emit("hello", "hello there");

  });
});



