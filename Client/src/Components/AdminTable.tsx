import axios from "axios";
import { useEffect, useState } from "react";
// import { BACKEND_URL } from "../Utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
// import { Bounce, ToastContainer, toast } from "react-toastify";
import React from "react";
import Swal from "sweetalert2";


const BACKEND_URL = 'http://localhost:3000'

type DataType = {
    _id: string;
    name: string;
    email: string;
    phone: string;
};

function AdminTable({ userCount }) {
    const navigate = useNavigate();
    const location = useLocation()
    console.log("Prop from Admin Table :", userCount);

    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log("came hereee");
        const fetchData = async () => {
            try {
                const adminJWT = localStorage.getItem("adminJWT");
                const response = await axios.post(
                    `${BACKEND_URL}/admin/getdashboarddata`,
                    JSON.stringify({ adminJWT }),
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                // console.log(response);
                if (response.data.success) {
                    setData(response.data.dashboardData.sort((a: any, b: any) => a.username > b.username ? 1 : -1));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function deleteHandler(userId: string) {
        const res = confirm("Do you want to delete ?");
        if (res) {
            console.log("User ID By DeleteUser :", userId);

            async function deleteUser(userId: string) {
                try {
                    const response = await axios.delete(
                        `${BACKEND_URL}/admin/delete/${userId}`
                    );

                    if (response.data.success) {

                        Swal.fire({
                            title: 'Deleted User Added Successfully',
                            icon: 'success',
                            position: 'top',
                            showConfirmButton: false,
                            timer: 3000,
                            toast: true,
                            background: '#333',
                            color: '#fff',
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer);
                                toast.addEventListener('mouseleave', Swal.resumeTimer);
                            }
                        });

                        setTimeout(() => window.location.reload(), 3000)
                    }

                } catch (error) {
                    console.log(error);
                }
            }
            deleteUser(userId);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <button
                className="p-2 m-2 bg-lime-400 text-black rounded-lg hover:bg-lime-300 transition duration-300 ease-in-out"
                onClick={() => navigate("/admin/add")}
            >
                Add User
            </button>
            <div className="overflow-x-auto w-full mx-6">
                {loading ? (
                    <p className="text-white">Loading...</p>
                ) : data && data.length > 0 ? (
                    <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th className="p-4 text-left">S.No</th>
                                <th className="p-4 text-left">Username</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Phone number</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, i) => (
                                <tr key={user._id} className="border-b border-gray-600 hover:bg-gray-700 transition duration-200 ease-in-out">
                                    <td className="p-4">{i + 1}</td>
                                    <td className="p-4">{user.name}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.phone}</td>
                                    <td className="p-4 flex space-x-2">
                                        <button
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition duration-300 ease-in-out"
                                            onClick={() => {
                                                navigate(`/admin/edit`, { state: user });
                                            }}
                                        >
                                            📝 Edit
                                        </button>
                                        <button
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition duration-300 ease-in-out"
                                            onClick={() => deleteHandler(user._id)}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-white">No data available</p>
                )}
            </div>
        </div>
    );
}

export default AdminTable;