/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import NavBar from "../NavBar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./SingleChat.css";

const SingleChat = ({ user, setUser, theme }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [contacts] = useState([
        {
            name: "Jane Marry",
            lastMessage: "okay, call me",
            status: "online",
            profileImage: "https://via.placeholder.com/40",
        },
        {
            name: "Rahul Deshpande",
            lastMessage: "I sent it last night",
            status: "offline",
            profileImage: "https://via.placeholder.com/40",
        },
        {
            name: "Sandy Mandy",
            lastMessage: "see you tomorrow",
            status: "online",
            profileImage: "https://via.placeholder.com/40",
        },
    ]);
    const [activeChat, setActiveChat] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showProfileDialog, setShowProfileDialog] = useState(false);

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("");
    };

    const toggleProfileDialog = () => {
        setShowProfileDialog(!showProfileDialog);
    };

    const sendMessage = () => {
        if (input.trim() === "" && !selectedImage) return;

        const newMessage = {
            text: input,
            sender: "me",
            image: selectedImage,
        };

        setMessages([...messages, newMessage]);
        setInput("");
        setSelectedImage(null);
    };

    const addEmoji = (emoji) => {
        setInput((prev) => prev + emoji);
        setShowEmojiPicker(false);
    };

    useEffect(() => {
        setIsTyping(input.length > 0);
    }, [input]);

    return (
        <div className={`single-chat-container ${theme}`}>
            <NavBar user={user} setUser={setUser} />
            <div className="chat-wrapper">
                <div className="contacts-sidebar">
                    <div className="search-bar">
                        <input type="text" placeholder="Search for chat" className="find-user-input" />
                        <span className="search-icon">🔍</span>
                    </div>
                    <ul>
                        {contacts.map((contact, index) => (
                            <li
                                key={index}
                                className={`contact ${activeChat?.name === contact.name ? "active" : ""}`}
                                onClick={() => setActiveChat(contact)}
                            >
                                <img
                                    src={contact.profileImage || `https://via.placeholder.com/40?text=${getInitials(contact.name)}`}
                                    alt={`${contact.name}'s profile`}
                                    className="contact-avatar"
                                    onClick={toggleProfileDialog}
                                />
                                <div className="contact-info" onClick={toggleProfileDialog}>
                                    <span className="contact-name">{contact.name}</span>
                                    <span className="last-message">{contact.lastMessage}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="chat-box-wrapper">
                    {activeChat && (
                        <div className="chat-header">
                            <div className="chat-header-info">
                                <img
                                    className="header-profile-image"
                                    src={activeChat.profileImage}
                                    alt={`${activeChat.name}'s profile`}
                                    onClick={toggleProfileDialog}
                                />
                                <div className="name-status-wrapper">
                                    <h4 onClick={toggleProfileDialog}>{activeChat.name}</h4>
                                    <div className="status">
                                        <span
                                            className={`status-dot ${activeChat.status === "online" ? "online" : "offline"
                                                }`}
                                        ></span>
                                        {activeChat.status.charAt(0).toUpperCase() + activeChat.status.slice(1)}
                                    </div>
                                </div>
                            </div>
                            <div className="chat-header-actions">
                                <button className="icon-button">
                                    <i className="fas fa-phone"></i>
                                </button>
                                <button className="icon-button">
                                    <i className="fas fa-video"></i>
                                </button>
                                <button className="icon-button">
                                    <i className="fas fa-ellipsis-h"></i>
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="chat-box">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.sender === "me" ? "sent" : "received"}`}
                            >
                                {msg.text && <p>{msg.text}</p>}
                                {msg.image && <img src={msg.image} alt="attachment" />}
                                <div className="message-status">
                                    {msg.status === "read" ? "✔✔ Read" : msg.status === "delivered" ? "✔ Delivered" : "✔ Sent"}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
                        {showEmojiPicker && (
                            <div className="emoji-picker">
                                {["😀", "😂", "😍", "😎", "😢", "😡"].map((emoji, index) => (
                                    <button key={index} onClick={() => addEmoji(emoji)}>
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        )}
                        <label htmlFor="file-upload" className="file-upload-button">
                            🖼️
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedImage(URL.createObjectURL(e.target.files[0]))}
                            style={{ display: "none" }}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
                {showProfileDialog && (
                    <div className="profile-dialog">
                        <div className="dialog-content">
                            <img
                                className="dialog-profile-image"
                                src={activeChat?.profileImage}
                                alt={`${activeChat?.name}'s profile`}
                            />
                            <i className="fas fa-pencil-alt edit-icon"></i>
                            <h3>{activeChat?.name}</h3>
                            <div className="dialog-buttons">
                                <button className="dialog-button">📹 Video Call</button>
                                <button className="dialog-button">📞 Audio Call</button>
                            </div>
                            <p className="status-description">{activeChat?.status === "online" ? "Available" : "Busy, do not call"}</p>
                            <button className="dialog-button">Add to Favourites</button>
                            <div className="report-block">
                                <button className="dialog-button danger">Report</button>
                                <button className="dialog-button danger">Block</button>
                            </div>
                            <button className="close-dialog" onClick={toggleProfileDialog}> ✖ </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleChat;
