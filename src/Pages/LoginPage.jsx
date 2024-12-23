/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = () => {
        if (username.trim()) {
            setUser(username.trim());
            navigate("/");
        } else {
            alert("Please enter a valid username!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
                onClick={handleLogin}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Login
            </button>
        </div>
    );
};

export default LoginPage;
