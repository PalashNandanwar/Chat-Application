/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

const ChatWindow = ({ group }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch messages for the selected group
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:5000/chat/groups/${group._id}/messages`);
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                const data = await response.json();
                console.log("Messages fetched successfully:", data);
                setMessages(data);
            } catch (error) {
                setError('Failed to fetch messages');
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [group]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await fetch(`http://localhost:5000/chat/groups/${group._id}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newMessage }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const message = await response.json();
            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage("");
        } catch (error) {
            setError('Failed to send message');
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex flex-col h-[85vh] w-[75vw] bg-white shadow-lg">
            {/* Chat Header */}
            <div className="bg-blue-600 p-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">{group.name}</h2>
                    <p className="text-sm text-blue-200">Active now</p>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"} mb-4`}
                    >
                        <div
                            className={`max-w-[70%] p-4 rounded-xl shadow-md ${
                                message.sender === "me"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs mt-1 text-gray-400">
                                {new Date(message.time).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input Area */}
            <div className="p-4 border-t bg-white">
                <div className="flex items-center gap-3">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Type a message..."
                        rows="2"
                    />
                    <button 
                    onClick={sendMessage} 
                    className="ml-4 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600">
                    <AiOutlineSend />
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
}
export default ChatWindow;