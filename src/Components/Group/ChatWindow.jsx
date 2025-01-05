/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { AiOutlineSend, AiOutlineInfoCircle } from 'react-icons/ai';
import img5 from "../../assets/profile1.png";

const ChatWindow = ({ group, userData }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState(null);
    const [showGroupInfo, setShowGroupInfo] = useState(false);

    useEffect(() => {
        // Fetch messages when the group changes
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:5000/chat/groups/${group._id}/messages`);
                if (!response.ok) throw new Error('Failed to fetch messages');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                setError('Error fetching messages');
                console.error(error);
            }
        };

        if (group._id) {
            fetchMessages();
        }
    }, [group._id]); // Only re-run if group._id changes

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await fetch(`http://localhost:5000/chat/groups/${group._id}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: userData.userId, // Use userData.userId for the sender
                    content: newMessage, // Message content
                    attachments: [], // Add attachments if necessary
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            const { data: message } = await response.json();
            setMessages((prevMessages) => [...prevMessages, message]); // Append new message
            setNewMessage(""); // Clear the input
        } catch (error) {
            setError(error.message || 'Error sending message');
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-white shadow-lg">
            {/* Chat Header */}
            <div className="bg-blue-600 p-3 flex items-center justify-between">
                <div className="flex items-center">
                    <img src={img5} alt="Group Profile" className="w-10 h-10 rounded-full mr-3" />
                    <h2 className="text-sm sm:text-base font-semibold text-white truncate">{group.name}</h2>
                </div>
                <button
                    onClick={() => setShowGroupInfo(true)} // Open group info modal
                    className="text-white p-2 rounded-full hover:bg-blue-700"
                >
                    <AiOutlineInfoCircle size={20} />
                </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-2 bg-gray-50">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.senderId._id === userData.userId ? "justify-end" : "justify-start"} mb-3`}
                    >
                        <div
                            className={`max-w-[75%] p-2 rounded-lg shadow-md ${message.senderId._id === userData.userId
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                                }`}
                        >
                            <p className="text-xs font-medium">
                                {message.senderId.name === userData.username ? "You" : message.senderId.name}
                            </p>
                            <p className="text-sm">{message.content}</p>
                            <p className="text-[10px] mt-1 text-gray-400">
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input */}
            <div className="p-2 bg-white border-t flex items-center gap-2">
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                    placeholder="Type a message..."
                    rows="1"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
                >
                    <AiOutlineSend size={20} />
                </button>
            </div>

            {/* Group Info Modal */}
            {showGroupInfo && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-80 sm:w-96">
                        <h3 className="text-xl font-semibold mb-4">Group Info</h3>
                        {console.log(group)
                        }
                        <p className="text-lg font-medium">Group Name: {group.name}</p>
                        <p className="text-base text-gray-600 mb-4">Members: {group.members.length}</p>

                        <button
                            onClick={() => setShowGroupInfo(false)} // Close modal
                            className="mt-4 bg-blue-600 text-white p-2 rounded-full w-full hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );


};

export default ChatWindow;
