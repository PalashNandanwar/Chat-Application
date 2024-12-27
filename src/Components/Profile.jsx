/* eslint-disable no-unused-vars */

import { SignOutButton, UserProfile, useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import img1 from "../assets/avatar1.png"
import img2 from "../assets/avatar2.png"
import img3 from "../assets/avatar3.png"
import img4 from "../assets/avatar4.png"
import img5 from "../assets/avatar5.png"
import img6 from "../assets/avatar6.png"

// Predefined avatar options
const avatarOptions = [img1, img2, img3, img4, img5, img6];

const Profile = () => {
    const { user: clerkUser } = useUser();
    const [activeUser, setActiveUser] = useState(false);
    const { sessionId } = useAuth();
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const [showAvatarOptions, setShowAvatarOptions] = useState(false);
    console.log(clerkUser);

    useEffect(() => {
        setActiveUser(!!sessionId);
    }, [sessionId]);

    useEffect(() => {
        console.log("Active User:", activeUser);
    }, [activeUser]);

    // Log user details when user is logged in or signs in
    useEffect(() => {
        if (clerkUser) {
            const userDetails = {
                username: clerkUser.username,
                firstName: clerkUser.firstName,
                lastName: clerkUser.lastName,
                email: clerkUser.emailAddresses[0]?.emailAddress,
                profileImage: clerkUser.imageUrl,
                activeStatus: clerkUser.id ? true : false,
            };
            console.log("User Details: ", userDetails);
        }
    }, [clerkUser]); // This will run whenever clerkUser changes

    const handleAvatarSelection = (avatarUrl) => {
        setSelectedAvatar(avatarUrl);
        console.log(`Avatar selected: ${avatarUrl}`);
        // Add logic here to save the avatar to Clerk or your backend
    };

    const toggleAvatarOptions = () => {
        setShowAvatarOptions((prevState) => !prevState);
    };

    if (!clerkUser) {
        return <p>Loading...</p>; // Handle the case when the user data is not loaded yet
    }

    const userImage = clerkUser.hasImage ? clerkUser.imageUrl : selectedAvatar;

    return (
        <div className="flex mt-[2rem] justify-center items-center flex-col">
            <div className="flex flex-col items-center">
                {/* Display the profile image */}
                <img
                    src={userImage}
                    alt={`${clerkUser.firstName || "User"}'s profile`}
                    className="w-24 h-24 rounded-full mb-4 shadow-lg"
                />
                <h1 className="text-2xl font-semibold">
                    Welcome, {clerkUser.firstName || "User"}!
                </h1>
            </div>

            {/* Show button if user has no profile image */}
            {!clerkUser.hasImage && !selectedAvatar && (
                <div className="mt-4">
                    <button
                        onClick={toggleAvatarOptions}
                        className="text-white bg-blue-500 px-4 py-1 rounded hover:bg-blue-600"
                    >
                        Select Avatar
                    </button>

                    {/* Show avatar options if button is clicked */}
                    {showAvatarOptions && (
                        <div className="mt-2 flex gap-4">
                            {avatarOptions.map((avatar, index) => (
                                <img
                                    key={index}
                                    src={avatar}
                                    alt={`Avatar ${index + 1}`}
                                    className="w-16 h-16 rounded-full cursor-pointer border-2 border-transparent hover:border-blue-500"
                                    onClick={() => handleAvatarSelection(avatar)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Display user profile details */}
            <div className="text-center mt-4">
                <p className="text-lg">Name: {clerkUser.fullName}</p>
                <p className="text-lg">User Name: {clerkUser.username}</p>
                <p className="text-lg">Email: {clerkUser.emailAddresses[0].emailAddress}</p>
            </div>

            {/* Back Button */}
            <div className="absolute left-0 top-0 m-[2rem]">
                <Link to="/">
                    <button className="flex gap-[1rem] justify-center items-center border-2 px-[15px] py-[7px] rounded-lg">
                        <span>
                            <IoChevronBackSharp />
                        </span>
                    </button>
                </Link>
            </div>

            {/* Logout Button */}
            <div className="mt-[2rem]">
                <SignOutButton>
                    <button className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600">
                        Logout
                    </button>
                </SignOutButton>
            </div>
        </div>
    );
};

export default Profile;
