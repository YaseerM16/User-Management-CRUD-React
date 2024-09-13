import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAppDispatch } from '../../ReduxStore/TypedHooks'
import { setUserDetails } from '../../ReduxStore/UserSlice'

type SignupData = {
  name: string;
  email: string;
  phone: number;
  password: string
}

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const dispatcher = useAppDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm<SignupData>()

  const onSubmit: SubmitHandler<SignupData> = (data) => {
    axios.post('http://localhost:3000/signup', data, { withCredentials: true }).then(response => {
      if (response.data) {
        Swal.fire({
          title: 'Success!',
          text: 'User registered successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          console.log("User Det :", response.data.user);

          dispatcher(setUserDetails(response.data.user))
          navigate('/');
        });
      }
      if (response.data.userExist) {
        Swal.fire({
          title: 'Warning!',
          text: 'Email already Exists! try Login',
          icon: 'warning',
          confirmButtonText: 'Login'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/');
          }
        })
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Your name"
              className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500`}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

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

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/, // adjust the pattern to match your desired phone number format
                  message: "Invalid phone number format",
                }
              })}
              placeholder="Phone number"
              className={`mt-1 block w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500`}
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Sign Up
          </button>
          <Link to="/">
            <button
              type="button"
              className="w-full mt-4 py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Already a User ? Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Signup