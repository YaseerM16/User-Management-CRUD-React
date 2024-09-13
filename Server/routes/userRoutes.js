import express from "express";
import multer from "multer";
import {
  Login,
  Profile,
  Signup,
  uploadImage,
  verifyToken,
} from "../controller/AuthController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const userRoutes = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

userRoutes.post("/signup", Signup);
userRoutes.post("/login", Login);
userRoutes.get("/profile", authenticateToken, Profile);
userRoutes.get("/verify-token", verifyToken);
userRoutes.post("/uploadImage", upload.single("file"), uploadImage);

userRoutes.get("/", (req, res) => res.send("hello"));

export default userRoutes;
