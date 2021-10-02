import express from "express";
import authRouter from "./routes/auth";
import mongoose from "mongoose";
import dotenv from "dotenv";
import homeRouter from "./routes/home";

dotenv.config();
mongoose.connect(`${process.env.MONGO_DB_CLUSTER_URL}`, () => console.log("DB connected"));
const app = express();

//middleware
app.use(express.json());

//Routes
app.get("/", (req, res) => {
    res.send("Welcome user...This site is under development");
});

//middleware routes
app.use("/api/user", authRouter);
app.use("/api", homeRouter);

//listening to port
app.listen(3001, () => {
    console.log("Connected to server");
});
