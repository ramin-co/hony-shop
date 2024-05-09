const express = require("express");
const app = express();
const router = require("./src/routes/index");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

app.use(cors({ origin: ["*"], credentials: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to Mongodb"))
  .catch(() => console.log("Can't Connect to MongoDb"));

app.use("/api", router);

app.listen(process.env.PORT, () =>
  console.log(`App Running on port ${process.env.PORT} ...`)
);
