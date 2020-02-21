import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import socketIo from 'socket.io';
import path from "path";

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
// Router and routers //
combineRoutes(router);
app.use(router);

//app.use()
//let socket;
app.on("dbReady", () => {
  const server = app.listen(PORT, () => {
    console.log(`Listening at PORT: ${PORT}`);
  });
  global.io = socketIo.listen(server);
  // IO functionality //
  io.sockets.on("connection", (socket) => {
    //console.log("connected");
    socket.on("sendClientCredentials", (user) => {
      //console.log(socket.id);
      clientsMap[user._id] = socket.id;
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



