import config from "config";
import Joi from "joi";
import cors from "cors";
import fun from "joi-objectid";
Joi.objectId = fun(Joi);
import express from "express";
import mongoose from "mongoose";
import todos from "./routes/totos.js";
import users from "./routes/users.js";
import auth from "./routes/auth.js";

const app = express();
const port = process.env.PORT || 9000;

if (!config.has("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/todo")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

// midwares
app.use(express.json());
app.use(cors());
app.use("/api/todos", todos);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(port, () => console.log(`Listening on port ${port}...`));
