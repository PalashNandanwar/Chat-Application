/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import NavBar from "../NavBar";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SingleChat = ({ user, setUser, theme, userInfo, onUserInfoUpdate }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [contacts, setContacts] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sendMessage = () => {
        if (input.trim() === "") return;

        const newMessage = {
            text: input,
            sender: "me",
        };

        setMessages([...messages, newMessage]);
        setInput("");
    };

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch("http://localhost:5000/chat/users");
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        fetchContacts();
    }, []);

    const formatLastSeen = (lastSeen) => {
        return lastSeen
            ? new Date(lastSeen).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })
            : "Unknown";
    };

    return (
        <div className={`flex flex-col h-screen ${theme}`}> {/* Container */}
            <NavBar user={user} setUser={setUser} />
            <div className="flex h-full">
                {/* Left Sidebar */}
                <div className="w-1/4 bg-gray-100 p-4 border-r">
                    <input
                        type="text"
                        placeholder="Search for chat"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <ul>
                        {filteredContacts.map((contact, index) => (
                            <li
                                key={index}
                                className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded ${activeChat?.name === contact.name ? "bg-gray-300" : ""
                                    }`}
                                onClick={() => setActiveChat(contact)}
                            >
                                <img
                                    src={contact.profileImage}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <p className="font-medium">
                                        {contact.name === userInfo.username ? "You" : contact.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {contact.isActive ? "Online" : formatLastSeen(contact.lastSeen)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Chat Box */}
                <div className="flex flex-col flex-grow bg-white">
                    {activeChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex items-center p-4 border-b">
                                <img
                                    src={activeChat.profileImage}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <div>
                                    <p className="font-bold text-lg">
                                        {activeChat.name === userInfo.username ? "You" : activeChat.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {activeChat.isActive
                                            ? "Online"
                                            : `Last seen: ${formatLastSeen(activeChat.lastSeen)}`}
                                    </p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-grow overflow-y-auto p-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`p-2 rounded-lg mb-2 max-w-sm ${message.sender === "me"
                                            ? "ml-auto bg-blue-500 text-white"
                                            : "mr-auto bg-gray-200"
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t">
                                <div className="flex items-center">
                                    <textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="w-full h-20 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 resize-none"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className="ml-3 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        <i className="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Select a contact to start chatting
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleChat;
