import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { router } from "./src/routes/route-index";
import passport from "passport";
import "./src/strategies/local-strategy";
import "./src/strategies/jwt-strategy";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(passport.initialize());
app.use("/api", router);

async function start() {
  try {
    app.listen(port, () => console.log(`Server started on port ${port}`));
    await mongoose.connect(process.env.DB_URL!);
  } catch (e) {
    console.log(e);
  }
}

start();
