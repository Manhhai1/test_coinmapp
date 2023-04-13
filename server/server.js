import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.CONNECT_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected!!");
  });
mongoose.set("strictQuery", false);
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listen on Port:", PORT);
});

app.get("/", (req, res) => {
  res.json({
    errCode: 0,
    message: "get /s success",
  });
});
app.use("/user", userRouter);
