import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use
app.listen(PORT, () => {
  console.log(`Listening at PORT: ${PORT}`);
});
