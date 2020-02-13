import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import socketIo from 'socket.io';

import combineRoutes from "./routes/combineRoutes";
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

// Router and routers //
combineRoutes(router);
app.use(router);
// body parser middleware //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use()
const server = app.listen(PORT, () => {
  console.log(`Listening at PORT: ${PORT}`);
});
const IO = socketIo(server);

// IO functionality //
IO.on("connection", (socket) => {
  socket.emit("test_event", { hello: "hello there" });
  socket.on("response_event", (data) => {
    console.log(data);
  });
});

