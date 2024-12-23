/* eslint-disable react/prop-types */
// import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

const NavBar = ({ user, setUser }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <nav className="flex flex-wrap items-center justify-between bg-gray-100 p-4 border-b border-gray-300">
            <h1 className="text-xl font-bold">Chatting App</h1>
            <div className="hidden md:flex gap-[2rem] items-center">
                <Link to="/">
                    <Button variant="outlined" className="px-4 py-1">
                        Home
                    </Button>
                </Link>
                <Link to="/Group-Chat">
                    <Button variant="outlined" className="px-4 py-1">
                        Join Group Chat
                    </Button>
                </Link>
                <Link to="/Single-chat">
                    <Button variant="outlined" className="px-4 py-1">
                        Start Chating with your friends
                    </Button>
                </Link>
                {user ? (
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-medium">Welcome, {user}</span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login">
                        <Button variant="outlined" className="px-4 py-1">
                            Login
                        </Button>
                    </Link>
                )}
            </div>
            <div className="md:hidden">
                <button
                    onClick={toggleMobileMenu}
                    className="text-black focus:outline-none text-2xl"
                >
                    <AiOutlineMenu />
                </button>
            </div>
            {isMobileMenuOpen && (
                <div className="w-full mt-4 flex flex-col gap-2 md:hidden">
                    <Link to="/">
                        <Button variant="outlined" className="px-4 py-1">
                            Home
                        </Button>
                    </Link>
                    <Link to="/Group-Chat">
                        <Button variant="outlined" className="px-4 py-1">
                            Join Group Chat
                        </Button>
                    </Link>
                    <Link to="/Single-chat">
                        <Button variant="outlined" className="px-4 py-1">
                            Start Chating with your friends
                        </Button>
                    </Link>
                    {user ? (
                        <div className="w-full flex justify-between items-center">
                            <span className="text-lg font-medium">Hi, {user}</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="outlined" className="w-full px-4 py-1">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavBar;
