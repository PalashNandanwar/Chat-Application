// import React from 'react'
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import GroupChat from "../Components/Group/GroupChat";
import SingleChat from "../Components/Single/SingleChat";
import LoginPage from "../Pages/LoginPage";
import { useState } from "react";

const AppRoutes = () => {
    const [user, setUser] = useState(null);
    return (
        <Routes>
            <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
            <Route path="/Group-Chat" element={<GroupChat user={user} setUser={setUser} />} />
            <Route path="/Single-chat" element={<SingleChat user={user} setUser={setUser} />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
        </Routes>
    )
}

export default AppRoutes