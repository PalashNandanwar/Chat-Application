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

    const [userData, setUserData] = useState({}); // State to store user data

    const handleUserInfoUpdate = (updatedUserData) => {
        setUserData(updatedUserData); // Update global user state
    };

    return (
        <Routes>
            <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
            <Route
                path="/Group-Chat"
                element={
                    <PrivateRoute>
                        <GroupChat
                            userData={userData}
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
                            userData={userData}
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