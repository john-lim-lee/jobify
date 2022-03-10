//SERVER.JS
import express from "express";
const app = express()
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

import connectDB from "./db/connect.js";
import morgan from "morgan";

// app.use((req, res, next) => {
//   console.log(req.url);
//   console.log(req.method);
//   next();
// });

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>console.log(`Server is listening @ ${port}`))
    } catch (error) {
        console.log(error)
    }

}

start()