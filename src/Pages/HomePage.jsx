/* eslint-disable react/prop-types */
// import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { Button } from "@material-tailwind/react";
import privatechat from "../assets/private-chat.png";
import groupchat from "../assets/gropu-chat.png";
import chathistory from "../assets/chat-history.png";

const HomePage = ({ user, setUser }) => {
    return (
        <div className="dark:bg-[#3b3a3a]">
            <NavBar user={user} setUser={setUser} />
            <div className="bg-blue-100 text-center w-[100%] h-[100%] py-10">
                <h1 className="text-4xl font-bold text-gray-800">
                    Welcome to Chatting App
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    Connect with friends and groups seamlessly.
                </p>
            </div>
            <div className="bg-white py-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-16">
                    <div className="text-center border-2 px-[1.5rem] py-[2rem]">
                        <img
                            src={privatechat}
                            alt="Private Chat"
                            className="mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold">Private Chats</h3>
                        <p className="text-gray-600">
                            Connect with individuals and have meaningful
                            conversations privately.
                        </p>
                    </div>
                    <div className="text-center border-2 px-[1.5rem] py-[2rem]">
                        <img
                            src={groupchat}
                            alt="Group Chat"
                            className="mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold">
                            Group Conversations
                        </h3>
                        <p className="text-gray-600">
                            Join groups with unique IDs and participate in lively
                            discussions.
                        </p>
                    </div>
                    <div className="text-center border-2 px-[1.5rem] py-[2rem]">
                        <img
                            src={chathistory}
                            alt="Chat History"
                            className="mx-auto mb-4"
                        />
                        <h3 className="text-xl font-semibold">Chat History</h3>
                        <p className="text-gray-600">
                            Never lose track of your conversations; history is
                            available to all participants.
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 py-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    How It Works
                </h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4 md:px-16">
                    <div className="text-center md:text-left border-2 px-[2rem] py-[1.5rem]">
                        <h3 className="text-xl font-semibold mb-2">Step 1</h3>
                        <p className="text-gray-600">Sign up or log in to your account.</p>
                    </div>
                    <div className="text-center md:text-left border-2 px-[2rem] py-[1.5rem]">
                        <h3 className="text-xl font-semibold mb-2">Step 2</h3>
                        <p className="text-gray-600">
                            Choose to chat privately or join a group with a unique ID.
                        </p>
                    </div>
                    <div className="text-center md:text-left border-2 px-[2rem] py-[1.5rem]">
                        <h3 className="text-xl font-semibold mb-2">Step 3</h3>
                        <p className="text-gray-600">Start chatting and stay connected!</p>
                    </div>
                </div>
            </div>
            <div className="bg-blue-100 py-10 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Ready to Chat?
                </h2>
                <p className="text-gray-600 mb-6">
                    Sign in now to start connecting with your friends and groups.
                </p>
                {user ? (
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-lg font-medium">Welcome, {user}</span>
                    </div>
                ) : (
                    <Link to="/login">
                        <Button variant="outlined" className="px-4 py-1">
                            Get Started
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default HomePage;
