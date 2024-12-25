/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { Button } from "@material-tailwind/react";
import privatechat from "../assets/private-chat.png";
import groupchat from "../assets/gropu-chat.png";
import chathistory from "../assets/chat-history.png";

const HomePage = ({ user, setUser }) => {
    // Check if the user is logged in (user is not null)
    const isSignedIn = user !== null;

    useEffect(() => {
        if (!isSignedIn) {
            // Reset the user state on logout (if needed)
            setUser(false); // This can be handled from the logout process
        }
    }, [isSignedIn, setUser]);

    return (
        <div className="dark:bg-[#3b3a3a]">
            {/* Navigation Bar */}
            <NavBar user={user} setUser={setUser} />

            {/* Welcome Section */}
            <div className="bg-blue-100 text-center w-full h-auto py-10">
                <h1 className="text-4xl font-bold text-gray-800">Welcome to Chatting App</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Connect with friends and groups seamlessly.
                </p>
            </div>

            {/* Features Section */}
            <div className="bg-white py-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-16">
                    {[
                        { img: privatechat, title: "Private Chats", description: "Connect with individuals and have meaningful conversations privately." },
                        { img: groupchat, title: "Group Conversations", description: "Join groups with unique IDs and participate in lively discussions." },
                        { img: chathistory, title: "Chat History", description: "Never lose track of your conversations; history is available to all participants." }
                    ].map(({ img, title, description }, idx) => (
                        <div key={idx} className="text-center border-2 px-6 py-8 rounded-lg shadow-md">
                            <img src={img} alt={title} className="mx-auto mb-4" />
                            <h3 className="text-xl font-semibold">{title}</h3>
                            <p className="text-gray-600">{description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-gray-50 py-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-16">
                    {[
                        "Sign up or log in to your account.",
                        "Choose to chat privately or join a group with a unique ID.",
                        "Start chatting and stay connected!"
                    ].map((step, idx) => (
                        <div key={idx} className="text-center border-2 px-6 py-8 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Step {idx + 1}</h3>
                            <p className="text-gray-600">{step}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-blue-100 py-10 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Chat?</h2>
                <p className="text-gray-600 mb-6">
                    {isSignedIn
                        ? "Go to Single Chat to connect with others now!"
                        : "Sign in to start connecting with your friends and groups."}
                </p>
                <div className="flex items-center justify-center">
                    {isSignedIn ? (
                        <Link to="/single-chat">
                            <Button variant="outlined" className="px-4 py-1">
                                Go to Single Chat
                            </Button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <Button variant="outlined" className="px-4 py-1">
                                Get Started
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;