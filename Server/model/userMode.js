import mongoose from "mongoose";

const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone Number is required"],
    match: [/^\d{10}$/, "Invalid phone number"],
  },
  profilePicture: {
    imageName: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
  },
});

const User = mongoose.model("User", userShema);

export default User;
