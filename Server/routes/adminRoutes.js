import express from "express";
// import { adminLogin } from "../controller/AdminController";
import {
  addUser,
  adminLogin,
  dashBoardData,
  deleteUser,
  editUser,
} from "../controller/AdminController.js";

const adminRoutes = express.Router();

adminRoutes.post("/adminLogin", adminLogin);
adminRoutes.post("/admin/getdashboarddata", dashBoardData);
adminRoutes.put("/admin/edit/:id", editUser);
adminRoutes.post("/admin/add", addUser);
adminRoutes.delete("/admin/delete/:id", deleteUser);

export default adminRoutes;
