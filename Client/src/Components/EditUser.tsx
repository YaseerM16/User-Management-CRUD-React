import { useForm, SubmitHandler } from "react-hook-form";
// import AdminNavbar from "./AdminNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { BACKEND_URL } from "../Utils/constants";
import axios from "axios";
// import { Bounce, ToastContainer, toast } from "react-toastify";
import React from "react";
import Swal from "sweetalert2";

const BACKEND_URL = 'http://localhost:3000'

function EditUser() {
    type Inputs = {
        username: string;
        email: string;
        phone: string;
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Inputs>();

    const location = useLocation();

    const { name, email, phone, _id } = location.state || {};
    console.log("THis i s Det :)", _id);
    const navigate = useNavigate();

    useEffect(() => {
        setValue("username", name);
        setValue("email", email);
        setValue("phone", phone);
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.put(`${BACKEND_URL}/admin/edit/${_id}`, data);
            if (response.data.success) {
                (Swal as any).fire({
                    title: 'User Edited Successfully!',
                    position: 'top-center', // Sets the position of the alert
                    icon: 'success', // You can use 'success', 'error', 'warning', etc.
                    showConfirmButton: false, // Hides the default OK button
                    timer: 5000, // Auto closes after 5000ms (5 seconds)
                    toast: true, // Makes the alert look like a toast
                    timerProgressBar: true, // Shows a progress bar
                    showCloseButton: true, // Allows the user to manually close the alert
                    background: '#fff', // Light theme, you can adjust colors
                    customClass: {
                        popup: 'draggable-toast', // You can add custom class for styling (optional)
                    },
                });

                setTimeout(() => navigate(`/admin/users`), 3000);
            } else {
                (Swal as any).fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message,
                    toast: true,
                    position: 'top',
                    timer: 5000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    background: '#fff',
                    color: '#000',
                    customClass: {
                        popup: 'swal2-toast', // Apply any custom styling if needed
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex justify-center items-center">
            <div className="max-w-lg w-full bg-gray-900 p-8 rounded-lg shadow-lg shadow-black">
                <form
                    className="flex flex-col"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="text-4xl font-extrabold text-white mb-6">Edit User</h1>

                    <label htmlFor="username" className="flex flex-col my-3 w-full">
                        <span className="text-white text-lg">Username:</span>
                        <input
                            className="border-2 border-gray-700 bg-gray-800 p-3 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...register("username", {
                                required: "Username is required",
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message: "Please use valid characters only. [Alphabets A to Z, a to z]",
                                },
                                minLength: {
                                    value: 5,
                                    message: "Enter at least 5 characters",
                                },
                            })}
                            placeholder="Enter username"
                        />
                        <p className="text-red-500 mt-1">{errors.username?.message}</p>
                    </label>

                    <label htmlFor="email" className="flex flex-col my-3 w-full">
                        <span className="text-white text-lg">Email:</span>
                        <input
                            className="border-2 border-gray-700 bg-gray-800 p-3 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Please enter a valid email address",
                                },
                                minLength: {
                                    value: 11,
                                    message: "Enter at least 11 characters",
                                },
                            })}
                            placeholder="Enter email"
                        />
                        <p className="text-red-500 mt-1">{errors.email?.message}</p>
                    </label>

                    <label htmlFor="phone" className="flex flex-col my-3 w-full">
                        <span className="text-white text-lg">Phone Number:</span>
                        <input
                            className="border-2 border-gray-700 bg-gray-800 p-3 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: "Please enter a valid phone number",
                                },
                                minLength: { value: 10, message: "Enter 10 digits" },
                                maxLength: { value: 10, message: "Enter 10 digits" },
                            })}
                            type="text"
                            placeholder="Enter phone number"
                        />
                        <p className="text-red-500 mt-1">{errors.phone?.message}</p>
                    </label>

                    <button
                        className="mt-6 p-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition duration-300 ease-in-out"
                        type="submit"
                    >
                        Edit User
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditUser;