/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { CgProfile } from "react-icons/cg";
import { FaBars, FaTimes } from "react-icons/fa"; // Add hamburger icon and close icon

const NavBar = ({ user, setUser }) => {
    const { isSignedIn, user: clerkUser } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // For toggling the mobile menu

    React.useEffect(() => {
        if (isSignedIn) {
            setUser(clerkUser);
        } else {
            setUser(null);
        }
    }, [isSignedIn, clerkUser, setUser]);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="flex justify-between items-center bg-blue-500 p-4">
            <h1 className="text-white text-lg font-bold">Chat Application</h1>

            {/* Hamburger icon for mobile */}
            <div className="block lg:hidden">
                <button onClick={handleMenuToggle} className="text-white">
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu Panel */}
            <div
                className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } fixed top-0 left-0 w-2/5 h-full bg-blue-600 z-50 transition-transform duration-300 ease-in-out`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={handleMenuToggle} className="text-white">
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* Navigation Links in Panel */}
                <div className="flex flex-col items-center">
                    <Link
                        to="/"
                        className="text-white py-2 px-4 hover:bg-blue-700 w-full text-center"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    {isSignedIn && (
                        <>
                            <Link
                                to="/Single-chat"
                                className="text-white py-2 px-4 hover:bg-blue-700 w-full text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Private Chat
                            </Link>
                            <Link
                                to="/Group-Chat"
                                className="text-white py-2 px-4 hover:bg-blue-700 w-full text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Group Chat
                            </Link>
                        </>
                    )}

                    {isSignedIn ? (
                        <div className="flex items-center gap-4">
                            <Link
                                to="/profile"
                                className="text-white py-2 px-4 hover:bg-blue-700 w-full text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="text-lg">
                                    <CgProfile />
                                </span>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 items-center">
                            <Link
                                to="/login"
                                className="text-white py-2 px-4 hover:bg-blue-700 w-full text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-white py-2 px-4 hover:bg-blue-700 w-full text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay when menu is open */}
            {isMenuOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
                    onClick={handleMenuToggle}
                ></div>
            )}

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-4">
                <Link
                    to="/"
                    className="text-white py-2 px-4 hover:bg-blue-600 rounded"
                >
                    Home
                </Link>
                {isSignedIn && (
                    <>
                        <Link
                            to="/Single-chat"
                            className="text-white py-2 px-4 hover:bg-blue-600 rounded"
                        >
                            Private Chat
                        </Link>
                        <Link
                            to="/Group-Chat"
                            className="text-white py-2 px-4 hover:bg-blue-600 rounded"
                        >
                            Group Chat
                        </Link>
                    </>
                )}

                {isSignedIn ? (
                    <div className="flex items-center gap-4">
                        <Link to="/profile" className="text-white">
                            <span className="text-lg">
                                <CgProfile />
                            </span>
                        </Link>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <Link to="/login" className="text-white py-2 px-4 hover:bg-blue-600 rounded">
                            Login
                        </Link>
                        <Link to="/signup" className="text-white py-2 px-4 hover:bg-blue-600 rounded">
                            Signup
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
