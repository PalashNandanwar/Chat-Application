// import React from "react";
import { SignUp } from "@clerk/clerk-react";

export default function Sign() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    Create an Account
                </h1>
                <SignUp
                    path="/signup"
                    routing="path"
                    signInUrl="/login"
                    redirectUrl="/" // Redirect after signup
                />
            </div>
        </div>
    );
}