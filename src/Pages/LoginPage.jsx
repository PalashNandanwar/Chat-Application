/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { SignIn, useAuth } from "@clerk/clerk-react";

const LoginPage = ({ setUser }) => {
    const { isLoaded, user } = useAuth();

    // Once the user is authenticated, set the user state to true
    useEffect(() => {
        if (isLoaded && user) {
            setUser(true); // User is logged in
        }
    }, [isLoaded, user, setUser]);

    return (
        <div className="flex items-center justify-center h-screen">
            <SignIn />
        </div>
    );
};

export default LoginPage;