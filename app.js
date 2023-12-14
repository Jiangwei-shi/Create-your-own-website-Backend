import { config } from "dotenv";
config();
import express from "express";
import session from "express-session";
import cors from "cors";
import HelloController from "./controllers/hello-controller.js";
import AuthController from "./controllers/users/auth-controller.js";

import mongoose from "mongoose";
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb+srv://keelworks:portfoliogenerator@cluster0.luzyjno.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_STRING)
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.error("Database connection error:", error));

const app = express();

const middlewares = [
  cors({
    origin: ["https://main--resplendent-kitten-26c0ff.netlify.app", "http://localhost:3000"],
    credentials: true
  }),
  express.json(),
  session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
  }),
];

app.use(middlewares);

HelloController(app);
AuthController(app);

app.listen(process.env.PORT || 4000);

