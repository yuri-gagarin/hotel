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
const redisClient = redis.createClient();
app.on("dbReady", () => {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.info(`App listening at Port: ${PORT}`);
  });
  global.io = socketIo.listen(server);
  io.attach(redisClient);
  // IO functionality //
  io.sockets.on("connection", (socket) => {
    console.log("connected");
    io.to(`${socket.id}`).emit("askForCredentials");
    socket.on("sendClientCredentials", (user) => {
      //console.log(socket.id);
      console.log(socket.id);
      console.log(user);
    });
    // client is messaging //
    socket.on("clientMessageSent", (data) => {
      const { conversationId, newMessage } = data;
      const clientSocket = socket.id;
      socket.broadcast.emit("newClientMessage", { conversationId: conversationId, clientSocket: clientSocket, newMessage: newMessage });
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



