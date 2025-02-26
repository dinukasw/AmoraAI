/* eslint-disable no-undef */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginStart, adminLoginSuccess, adminLoginFailure } from "../redux/user/adminSlice";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminLogin() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(adminLoginStart());

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/admin-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("adminToken", data.token);
                dispatch(adminLoginSuccess(data.user));
                navigate("/lab/upload-certificate");
            } else {
                dispatch(adminLoginFailure(data.message));
            }
        } catch (error) {
            dispatch(adminLoginFailure(error.message));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen max-w-sm mx-auto p-3 pt-32">
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">Admin Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <input
                    required
                    type="email"
                    placeholder="Admin Email"
                    id="email"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                />
                <input
                    required
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Loading..." : "Log In"}
                </button>
            </form>
            <p className="text-red-700 mt-5">
                {error || ""}
            </p>
        </div>
    );
}