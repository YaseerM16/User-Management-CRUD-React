
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { BACKEND_URL } from "../Utils/constants";
import axios from "axios";
import Swal from 'sweetalert2';
import React from "react";
const BACKEND_URL = 'http://localhost:3000'


function AddUser() {
    type Inputs = {
        username: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
    };

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<Inputs>();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/admin/add`, data);
            console.log("Response From");

            if (response.data.success) {

                (Swal as any).fire({
                    title: 'New User Added Successfully!',
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
                    title: response.data.message, // Display the error message
                    position: 'top-center', // Set the position to top-center
                    icon: 'error', // Error icon to indicate the nature of the message
                    showConfirmButton: false, // Hide the confirm button (OK)
                    timer: 5000, // Auto-close after 5 seconds (5000 ms)
                    toast: true, // Show as a toast notification
                    timerProgressBar: true, // Display a progress bar during the timer
                    showCloseButton: true, // Show a close button
                    background: '#fff', // Use light theme (white background)
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black">
            <div className="max-w-lg w-full bg-gray-900 p-6 rounded-lg shadow-lg shadow-black flex flex-col">
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-4xl font-extrabold text-white mb-6">Add New User</h1>

                    <label htmlFor="username" className="flex flex-col my-3 w-full">
                        <span className="text-white text-lg">Username:</span>
                        <input
                            className="border-2 border-gray-700 bg-gray-800 p-3 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...register("username", {
                                required: "Username is required",
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message: "Use valid characters only. (A to Z, a to z)",
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
                                minLength: { value: 10, message: "Enter exactly 10 digits" },
                                maxLength: { value: 10, message: "Enter exactly 10 digits" },
                            })}
                            type="text"
                            placeholder="Enter phone number"
                        />
                        <p className="text-red-500 mt-1">{errors.phone?.message}</p>
                    </label>

                    <label htmlFor="password" className="flex flex-col my-3 w-full">
                        <span className="text-white text-lg">Password:</span>
                        <input
                            type="password"
                            className="border-2 border-gray-700 bg-gray-800 p-3 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...register("password", {
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                                    message: "Password must contain 8+ characters, one uppercase, one lowercase, one number, and one special character",
                                },
                            })}
                            placeholder="Enter password"
                        />
                        <p className="text-red-500 mt-1">{errors.password?.message}</p>
                    </label>

                    <label htmlFor="confirmPassword" className="flex flex-col my-3 w-full">
                        <span className="text-white text-lg">Confirm Password:</span>
                        <input
                            type="password"
                            className="border-2 border-gray-700 bg-gray-800 p-3 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...register("confirmPassword", {
                                validate: (value) => {
                                    const { password } = getValues();
                                    return password === value || "Passwords must match!";
                                },
                            })}
                            placeholder="Confirm password"
                        />
                        <p className="text-red-500 mt-1">{errors.confirmPassword?.message}</p>
                    </label>

                    <button
                        type="submit"
                        className="bg-purple-600 text-white p-3 rounded-md mt-6 w-full font-bold hover:bg-purple-500 transition duration-300 ease-in-out"
                    >
                        Add User
                    </button>
                </form>
            </div>
        </div>
    );


}

export default AddUser;
