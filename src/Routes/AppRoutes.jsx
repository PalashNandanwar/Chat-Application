import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import GroupChat from "../Components/Group/GroupChat";
import SingleChat from "../Components/Single/SingleChat";
import LoginPage from "../Pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import { useState } from "react";
import Profile from "../Components/Profile";
import SignUp from "../Pages/SignUp";
import { RedirectToSignIn } from "@clerk/clerk-react";

const AppRoutes = () => {
    const [user, setUser] = useState(null); // user will determine the login status

    const [userInfo, setUserInfo] = useState({ username: '', avatar: '' });

    const handleUserInfoUpdate = (username, avatar) => {
        setUserInfo({ username, avatar });
        console.log("Updated Info:", { username, avatar });
    };

    return (
        <Routes>
            <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
            <Route
                path="/Group-Chat"
                element={
                    <PrivateRoute>
                        <GroupChat
                            userInfo={userInfo}
                            onUserInfoUpdate={handleUserInfoUpdate}
                            user={user}
                            setUser={setUser} />
                    </PrivateRoute>
                }
            />
            <Route
                path="/Single-chat"
                element={
                    <PrivateRoute>
                        <SingleChat
                            userInfo={userInfo}
                            onUserInfoUpdate={handleUserInfoUpdate}
                            user={user}
                            setUser={setUser} />
                    </PrivateRoute>
                }
            />

            <Route
                path="/Profile"
                element={
                    <PrivateRoute>
                        <Profile
                            onUserInfoUpdate={handleUserInfoUpdate} />
                    </PrivateRoute>
                }
            />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route
                path="*"
                element={<RedirectToSignIn />}
            />
        </Routes>
    );
};

export default AppRoutes;