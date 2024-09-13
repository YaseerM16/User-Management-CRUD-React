import React from 'react'
import { useLocation } from 'react-router-dom'
useLocation


const UserCount = () => {
    const location = useLocation()
    console.log("User Count :", location.state.userCount);
    return (
        <><section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                <h3 className="text-2xl font-semibold text-gray-200 mb-3">Total Users</h3>
                <p className="text-4xl font-bold text-white">{location.state.userCount}</p>
            </div>
        </section></>
    )
}

export default UserCount