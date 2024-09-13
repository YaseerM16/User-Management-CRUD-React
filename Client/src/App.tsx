import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import React from "react";
import { useAppSelector } from "./ReduxStore/TypedHooks";
import { userI } from "./ReduxStore/UserSlice";
import Signup from "./Pages/UserSide/Signup";
import Login from "./Pages/UserSide/Login";
import Profile from "./Pages/UserSide/Profile";
import AdminLogin from "./Pages/AdminSide/Login";
import AdminDashboard from "./Pages/AdminSide/Dashboard";
import { adminI } from "./ReduxStore/AdminSlice";

// import AddUser from "./Components/AddUser";
// import EditUser from "./Components/EditUser";
// import AdminTable from "./Components/AdminTable";
useAppSelector
AdminLogin






function App() {
  const userState = useAppSelector(state => state.userState)
  const adminState = useAppSelector(state => state.adminState)
  let userLs: userI | null;
  let adminLs: adminI | null;
  try {
    userLs = JSON.parse(localStorage.getItem('user') as any)
  } catch (error) {
    userLs = null;
  }
  try {
    adminLs = JSON.parse(localStorage.getItem('adminJWT') as any)
  } catch (error) {
    adminLs = null;
  }
  const user = userState.email != "" || userLs
  const admin = adminState.adminJwt != "" || adminLs
  // console.log("User LocalStore from App :", user);
  // console.log("From App Localstorage :", userLs);
  console.log("From App State :", userState);


  return (
    <>
      <Routes>
        <Route path="/signup" element={user ? <Profile /> : <Signup />} />
        <Route path="/" element={user ? <Profile /> : <Login />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to={'/'} />} />

        {/* AdminSide */}
        <Route path="/admin" element={admin ? <AdminDashboard /> : <AdminLogin />} />
        <Route path="/admin/*" element={admin ? <AdminDashboard /> : <AdminLogin />} />
        {/* <Route path="/admin/add" element={<AddUser />} /> */}
        <Route path="/admin-dashboard/*" element={admin ? <AdminDashboard /> : <Navigate to={'/admin'} />} />

        {/* <Route path="/admin/users" element={<AdminTable />} /> */}
      </Routes>
    </>
  );
}

export default App;
