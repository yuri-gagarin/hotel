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
// redis and socketio for messenger functionality //
import SocketIOController from "./controllers/socketIOController";
import RedisController from "./controllers/redisController";
// dotenv config //
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



const redisPassword = process.env.NODE_ENV === "production" ? process.env.REDIS_PASS : null;
export const redisControllerInstance = RedisController({ password: redisPassword });
// app config //
app.on("dbReady", () => {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.info(`App listening at Port: ${PORT}`);
  });
  // socketio settings //
  // spocketio listeners and emitters //
  io.attach(server, { cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] } });
  SocketIOController(io, redisControllerInstance);

});
// variable exports //
export { io as ioInstance };



