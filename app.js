import { config } from "dotenv";
config();
import express from "express";
import session from "express-session";
import cors from "cors";
import HelloController from "./controllers/hello-controller.js";
import AuthController from "./controllers/users/auth-controller.js";

import mongoose from "mongoose";
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb+srv://jiangweishi:Herg9wA8kwas3AtK@buildyourownwebsite.uh7imtw.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(CONNECTION_STRING)
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.error("Database connection error:", error));

const app = express();

const middlewares = [
  cors({
    origin: ["https://buildyourownwebsite.netlify.app",
      "https://loveletter.netlify.app",
      "http://localhost:3000"],
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


