import React, { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../ReduxStore/TypedHooks';
import { logout, setUserProfile, userI } from '../../ReduxStore/UserSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

let imagVal = ""

let userLs: userI | null;
try {
    userLs = JSON.parse(localStorage.getItem('user') as any)
} catch (error) {
    userLs = null;
}

console.log("User by Local Storage in App :", userLs);


const Profile: React.FC = () => {
    const navigate = useNavigate()
    const dispatcher = useAppDispatch()
    const userState = useAppSelector(state => state.userState)
    const [image, setImage] = useState(null)
    const date = userState.Date

    const user = userLs ?? userState

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) {
            Swal.fire({
                title: 'Warning!',
                text: 'No Image has been provided select one !',
                icon: 'warning',
                confirmButtonText: 'ok'
            })
        } else {
            const file = files[0]; // Get the first file (or the selected file)
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', user.userId)
            axios.post('http://localhost:3000/uploadImage', formData, { withCredentials: true }).then(response => {
                if (response.data) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'User registered successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // createObj
                        imagVal = response.data.imageUrl
                        setImage(response.data.imageUrl)
                        dispatcher(setUserProfile(response.data.imgDet))
                        console.log("res from /uploadImg :", response.data.imgDet);
                    });
                }
            })
        }
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatcher(logout())
                navigate("/");
                window.location.reload()
            }
        });
    };

    return (
        <div className="flex h-screen bg-gray-50 justify-center">
            {/* Left Side: Profile Card */}
            <div className="w-1/3 flex justify-center items-center p-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-6 shadow-2xl w-full max-w-sm transform hover:scale-105 transition-all duration-300">
                    <div className="text-center">
                        {/* Profile Picture */}
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            <img
                                src={user?.profilePicture?.imageUrl}
                                alt="Profile"
                                className="w-24 h-24 rounded-full shadow-lg border-4 border-white"
                            />
                            <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer shadow-md">
                                <FontAwesomeIcon icon={faCamera} className="text-gray-700 text-sm" />
                            </label>
                            <input
                                type="file"
                                id="profilePicture"
                                className="hidden"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>

                        {/* User Name */}
                        <h2 className="text-2xl font-extrabold text-white mb-2">{user?.name}</h2>
                    </div>

                    {/* User Details */}
                    <div className="space-y-4 text-white">
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
                            <div>
                                <p className="font-bold text-sm">Name:</p>
                                <p className="text-sm">{user?.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faEnvelope} className="text-white text-lg" />
                            <div>
                                <p className="font-bold text-sm">Email:</p>
                                <p className="text-sm">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faPhone} className="text-white text-lg" />
                            <div>
                                <p className="font-bold text-sm">Phone:</p>
                                <p className="text-sm">{user?.phone}</p>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full bg-white text-blue-500 font-bold py-2 px-3 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 transition duration-300 transform hover:scale-105 mt-4"
                        >
                            Log Out
                            <FontAwesomeIcon icon={faUser} className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Side: Welcome Message with Card Design */}
            <div className="flex justify-center items-center p-5">
                <div className="relative mx-auto mb-4 bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm transform hover:scale-105 transition-all duration-300">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Profile</h1>
                        <h3>Date: {date}</h3>
                        <h5 className="text-gray-600">Here you can view your personal information and update your settings.</h5>
                    </div>
                </div>
            </div>
        </div>
    );




};

export default Profile;
