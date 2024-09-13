import jwt from "jsonwebtoken";
import User from "../model/userMode.js";
import pkg from "bcryptjs";
const { genSalt, hash } = pkg;

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailMatch = email === process.env.ADMIN_EMAIL;
    const passMatch = password === process.env.ADMIN_PASSWORD;

    if (emailMatch && passMatch) {
      const adminJWT = jwt.sign({ email }, String(process.env.JWT_KEY), {
        expiresIn: "1h",
      });
      const users = await User.find();

      res
        .status(200)
        .send({ success: true, adminJWT, usersCount: users.length });
    } else {
      res.status(401).send({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const dashBoardData = async (req, res) => {
  try {
    const { adminJWT } = req.body;
    const users = await User.find();
    res.send({ success: true, dashboardData: users });
  } catch (error) {
    console.log(
      "Error while Fetching the Data for the Admin Dashboard :",
      error
    );
  }
};

export const editUser = async (req, res) => {
  const { email, phone, username } = req.body;
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, phone, name: username },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = new User({
      name: username,
      email: email,
      phone: phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).send({ success: true });
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(208)
        .send({ success: false, message: "Credentials already exists" });
    }
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};
