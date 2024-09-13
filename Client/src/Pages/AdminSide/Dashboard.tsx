import React from 'react';
import { Route, Link, Routes, useLocation, Location, useNavigate } from 'react-router-dom';
import AdminTable from '../../Components/AdminTable';
import EditUser from '../../Components/EditUser';
import AddUser from '../../Components/AddUser';
AddUser

AdminTable
EditUser

const AdminDashboard = () => {
    // const userCount = location.state
    const location = useLocation()
    const navigate = useNavigate()
    const userCount = location.state?.userCount
    console.log("User Count State:", location.state);
    function logoutHandler(event: any) {
        event.preventDefault();
        const res = confirm('Are you sure you want to logout?')
        if (res) {
            localStorage.removeItem("adminJWT");
            navigate("/admin");
            window.location.reload()
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
            <div className="flex">
                <aside className="bg-gray-900 shadow-lg w-full md:w-1/4 lg:w-1/5 p-8 rounded-tr-lg rounded-br-lg inline-block">
                    <h1 className="text-3xl font-extrabold text-white mb-10">Admin Dashboard</h1>
                    <nav className="space-y-6">
                        <Link to="/admin/dashboard" className="text-gray-300 hover:text-white text-lg font-semibold block">Home</Link>
                        <Link to={{ pathname: "/admin/users", state: { userCount } } as Location} className="text-gray-300 hover:text-white text-lg font-semibold block">Users</Link>
                        <button onClick={logoutHandler} className="text-gray-300 hover:text-white text-lg font-semibold block">Logout</button>
                    </nav>
                </aside>
                <div className="w-full flex justify-center items-start inline-block">
                    <div className="flex flex-col w-full max-w-4xl">
                        <section className="w-full max-w-4xl p-8">
                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out col-span-1">
                                <h3 className="text-2xl font-semibold text-gray-200 mb-3">MERN User Management -&nbsp;Admin</h3>
                            </div>
                            <h2 className="text-4xl font-extrabold text-white p-6">Welcome, Admin!</h2>
                        </section>
                        <div className="flex flex-col md:flex-row">
                            {/* Sidebar */}

                            {/* Main content */}
                            <main className="flex-1 p-8">
                                <Routes>
                                    <Route path="users" element={<AdminTable userCount={userCount} />} />
                                    {/* You can add more routes here to display other components */}
                                    <Route path="/admin" element={
                                        <h2 className="text-4xl font-extrabold text-white">Welcome, Admin!</h2>
                                    } />
                                    <Route path="edit" element={<EditUser />} />
                                    <Route path="add" element={<AddUser />} />
                                </Routes>
                                <header className="flex items-center justify-between mb-8">
                                    {/* <h2 className="text-4xl font-extrabold text-white">Welcome, Admin!</h2> */}
                                </header>

                            </main>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
