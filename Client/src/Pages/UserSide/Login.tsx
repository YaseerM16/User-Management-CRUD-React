import axios from 'axios';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAppDispatch } from '../../ReduxStore/TypedHooks';
import { onLoginDate, setUserDetails } from '../../ReduxStore/UserSlice';
onLoginDate

type loginData = {
    email: string;
    password: string;
}
const Login: React.FC = () => {
    const navigate = useNavigate()
    const dispatcher = useAppDispatch()

    const { handleSubmit, register, formState: { errors } } = useForm<loginData>()

    const onSubmit: SubmitHandler<loginData> = (data) => {
        axios.post('http://localhost:3000/login', data, { withCredentials: true }).then(response => {
            if (response.data) {
                Swal.fire({
                    title: 'Success!',
                    text: 'User Login successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    console.log("User by Login :)- ", response.data.user);
                    dispatcher(setUserDetails(response.data.user))
                    dispatcher(onLoginDate())
                    navigate('/profile');
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'User Login failed! Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry'
                }).then(() => {
                    navigate('/');
                });
            }
        }).catch(error => {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error submitting the data. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('There was an error submitting the data:', error);
        });
    }


    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                }
                            })}
                            placeholder="you@example.com"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500`}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                }
                            })}
                            placeholder="Password"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500`}
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        Login
                    </button>
                    <Link to="/signup">
                        <button
                            type="button"
                            className="w-full mt-4 py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            signup for new account
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login