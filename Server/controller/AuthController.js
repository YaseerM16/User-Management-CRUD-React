import User from "../model/userMode.js";
import pkg from "bcryptjs";
import bcrypt from "bcryptjs";
const { genSalt, hash } = pkg;
import jwt from "jsonwebtoken";
import fs from "fs";
import { Blob } from "blob-polyfill";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// const filePath = "../uploads/2022-01-24.png";

// fs.unlink(filePath, (err) => {
//   if (err) {
//     console.error("Error deleting the file:", err);
//     return;
//   }
//   console.log("File deleted successfully");
// });

export const Signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.send({
        userExist: true,
      });
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      String(process.env.JWT_KEY),
      { expiresIn: "1h" }
    );

    const user = {
      name,
      email,
      phone,
      password,
      userId: newUser.id,
      token: token,
    };

    // console.log("Sending Value of User :", user);

    res.status(200).send({
      message: "User registered successfully!",
      token: token,
      user,
    });
  } catch (error) {
    console.log("Error in submitting the signup form ;/", error);
  }
};

export const Login = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
      return res.send({ success: false });
    }

    const passwordVer = await bcrypt.compare(
      req.body.password,
      userExist.password
    );

    if (!passwordVer) {
      return res.send({ success: false });
    }

    const { name, email, password, phone, profilePicture } = userExist;

    const token = jwt.sign(
      { id: userExist.id, email: userExist.email },
      String(process.env.JWT_KEY),
      { expiresIn: "1h" }
    );
    const user = {
      name,
      email,
      password,
      phone,
      userId: userExist.id,
      token: token,
      profilePicture,
    };

    // console.log("Sending Value of User :", user);

    res.status(200).send({
      message: "User registered successfully!",
      token: token,
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

export const Profile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    res.send({ user });
  } catch (err) {
    console.log(err);
  }
};

export const uploadImage = async (req, res) => {
  try {
    const imagefile = req.file;
    const userId = req.body.userId;
    const user = await User.findById({ _id: userId });

    // Creating Actual Img Url
    const filePath = imagefile.path;
    const fileType = imagefile.mimetype;
    const fileBuffer = fs.readFileSync(filePath);
    const blob = new Blob([fileBuffer], { type: fileType });
    const imageUrl = URL.createObjectURL(blob);

    if (user.profilePicture.imageName) {
      const filePath = fileURLToPath(import.meta.url);
      const dirPath = dirname(filePath);
      const absoluteFilePath = path.join(
        dirPath,
        "../uploads",
        user.profilePicture.imageName
      );

      fs.unlink(absoluteFilePath, (err) => {
        if (err) console.log("Error While Deleting the Profile Picture", err);
        else console.log("Profile deleted successfully :)");
      });

      user.profilePicture.imageName = imagefile.originalname;
      user.profilePicture.imageUrl = imageUrl;
      await user.save();
      console.log("Profile Picture updated successfully");
    } else {
      user.profilePicture.imageName = imagefile.originalname;
      user.profilePicture.imageUrl = imageUrl;
      await user.save();
      console.log("Profile Picture updated successfully");
    }

    res.status(201).send({ imgDet: user.profilePicture });
  } catch (error) {
    console.log("Error while Uploading the Profile Image : ", error);
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("Token Val :", token);

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, String(process.env.JWT_KEY));
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        // Add other user details as needed
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error verifying token" });
  }
};
