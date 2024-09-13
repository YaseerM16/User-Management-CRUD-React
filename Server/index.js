import express, { json } from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
config();

connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected :"))
  .catch((err) => console.log("Error while connecting to the Database :", err));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use("/", userRoutes);
app.use(adminRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server Connected to --", port);
});
