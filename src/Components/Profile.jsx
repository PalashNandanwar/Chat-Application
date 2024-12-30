/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { SignOutButton, useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { data, Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import img1 from "../assets/avatar1.png";
import img2 from "../assets/avatar2.png";
import img3 from "../assets/avatar3.png";
import img4 from "../assets/avatar4.png";
import img5 from "../assets/avatar5.png";
import img6 from "../assets/avatar6.png";

// Predefined avatar options
const avatarOptions = [img1, img2, img3, img4, img5, img6];

// const Profile = () => {
//     const { user: clerkUser } = useUser();
//     const { sessionId } = useAuth();
//     const [activeUser, setActiveUser] = useState(false);
//     const [selectedAvatar, setSelectedAvatar] = useState("");
//     const [showAvatarOptions, setShowAvatarOptions] = useState(false);
//     const [userDetails, setUserDetails] = useState(null);
//     console.log(clerkUser);


//     // Load avatar from localStorage when component mounts
//     useEffect(() => {
//         const savedAvatar = localStorage.getItem("selectedAvatar");
//         if (savedAvatar) {
//             setSelectedAvatar(savedAvatar);
//         }
//     }, []);

//     useEffect(() => {
//         setActiveUser(!!sessionId);
//     }, [sessionId]);

//     // Register user to backend upon login
//     useEffect(() => {
//         const registerUser = async () => {
//             if (clerkUser) {
//                 const user = {
//                     username: clerkUser.username || "testuser",
//                     password: "password123",
//                     email: clerkUser.emailAddresses[0]?.emailAddress || "testuser@example.com",
//                     isOnline: true,
//                     // lastSeen: clerkUser.lastSignInAt
//                     // lastSeen: clerkUser.lastSignInAt
//                 };

//                 try {
//                     const response = await fetch("http://localhost:8081/chat/register", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify(user),
//                     });

//                     if (response.ok) {
//                         const data = await response.json();
//                         console.log("User registered successfully:", data);
//                     } else if (response.status === 400) {
//                         console.error("Bad Request: Missing required fields");
//                     } else if (response.status === 500) {
//                         console.error("Internal Server Error: Registration failed");
//                     }
//                 } catch (error) {
//                     console.error("Error:", error);
//                 }
//             }
//         };

//         registerUser();
//     }, [clerkUser]);

//     // Log user details and update userDetails object
//     useEffect(() => {
//         if (clerkUser) {
//             const userImage = clerkUser.hasImage
//                 ? clerkUser.imageUrl
//                 : selectedAvatar || avatarOptions[0];

//             const details = {
//                 username: clerkUser.username || "Guest",
//                 firstName: clerkUser.firstName || "User",
//                 lastName: clerkUser.lastName || "",
//                 email: clerkUser.emailAddresses[0]?.emailAddress || "Not provided",
//                 profileImage: userImage,
//                 activeStatus: !!clerkUser.id,
//             };

//             setUserDetails(details);
//             console.log("User Details:", details);
//         }
//     }, [clerkUser, selectedAvatar, avatarOptions]);

//     // Save selected avatar to localStorage
//     const handleAvatarSelection = (avatarUrl) => {
//         setSelectedAvatar(avatarUrl);
//         localStorage.setItem("selectedAvatar", avatarUrl);
//         console.log(`Avatar selected: ${avatarUrl}`);
//         setShowAvatarOptions(false); // Close modal after selection
//     };

//     const toggleAvatarOptions = () => {
//         setShowAvatarOptions((prevState) => !prevState);
//     };

//     if (!clerkUser) {
//         return <p>Loading...</p>; // Handle the case when the user data is not loaded yet
//     }

//     const userImage = userDetails?.profileImage || clerkUser.imageUrl;

//     return (
//         <div className="flex mt-[2rem] justify-center items-center flex-col">
//             <div className="flex flex-col items-center">
//                 <img
//                     src={userImage}
//                     alt={`${clerkUser.firstName || "User"}'s profile`}
//                     className="w-24 h-24 rounded-full mb-4 shadow-lg"
//                 />
//                 <h1 className="text-2xl font-semibold">
//                     Welcome, {userDetails?.firstName || "User"}!
//                 </h1>
//             </div>

//             <div className="mt-4">
//                 <button
//                     onClick={toggleAvatarOptions}
//                     className="text-white bg-blue-500 px-4 py-1 rounded hover:bg-blue-600"
//                 >
//                     {selectedAvatar ? "Change Avatar" : "Select Avatar"}
//                 </button>

//                 {showAvatarOptions && (
//                     <div className="mt-2 flex gap-4 flex-wrap">
//                         {avatarOptions.map((avatar, index) => (
//                             <img
//                                 key={index}
//                                 src={avatar}
//                                 alt={`Avatar ${index + 1}`}
//                                 className={`w-16 h-16 rounded-full cursor-pointer border-2 ${selectedAvatar === avatar ? "border-blue-500" : "border-transparent"
//                                     } hover:border-blue-500`}
//                                 onClick={() => handleAvatarSelection(avatar)}
//                             />
//                         ))}
//                     </div>
//                 )}
//             </div>

//             <div className="text-center mt-4">
//                 <p className="text-lg">
//                     Name: {userDetails?.firstName} {userDetails?.lastName}
//                 </p>
//                 <p className="text-lg">User Name: {userDetails?.username}</p>
//                 <p className="text-lg">Email: {userDetails?.email}</p>
//             </div>

//             <div className="absolute left-0 top-0 m-[2rem]">
//                 <Link to="/">
//                     <button className="flex gap-[1rem] justify-center items-center border-2 px-[15px] py-[7px] rounded-lg">
//                         <span>
//                             <IoChevronBackSharp />
//                         </span>
//                     </button>
//                 </Link>
//             </div>

//             <div className="mt-[2rem]">
//                 <SignOutButton>
//                     <button className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600">
//                         Logout
//                     </button>
//                 </SignOutButton>
//             </div>
//         </div>
//     );
// };

// export default Profile;


const Profile = () => {
    const { user: clerkUser } = useUser();
    const { sessionId } = useAuth();
    const [activeUser, setActiveUser] = useState(false);
    const [isOnline, setIsOnline] = useState(true); // Track online/offline status
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const [showAvatarOptions, setShowAvatarOptions] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    console.log(isOnline);


    // Load avatar from localStorage when component mounts
    useEffect(() => {
        const savedAvatar = localStorage.getItem("selectedAvatar");
        if (savedAvatar) {
            setSelectedAvatar(savedAvatar);
        }
    }, []);

    useEffect(() => {
        setActiveUser(!!sessionId);
    }, [sessionId]);

    // Trigger API for status toggle
    const toggleStatus = async () => {
        setIsOnline((prevStatus) => !prevStatus);

        const statusPayload = {
            username: clerkUser.username,
            email: clerkUser.emailAddresses[0]?.emailAddress,
            password: "12345678",
            isOnline: !isOnline
        };

        try {
            const response = await fetch("http://localhost:8081/chat/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(statusPayload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("User registered successfully:", data);
            } else {
                console.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Log user details and update userDetails object
    useEffect(() => {
        if (clerkUser) {
            const userImage = clerkUser.hasImage
                ? clerkUser.imageUrl
                : selectedAvatar || avatarOptions[0];

            const details = {
                username: clerkUser.username || "Guest",
                firstName: clerkUser.firstName || "User",
                lastName: clerkUser.lastName || "",
                email: clerkUser.emailAddresses[0]?.emailAddress || "Not provided",
                profileImage: userImage,
                activeStatus: !!clerkUser.id,
            };

            setUserDetails(details);
            // console.log("User Details:", details);
        }
    }, [clerkUser, selectedAvatar, avatarOptions]);

    const handleAvatarSelection = (avatarUrl) => {
        setSelectedAvatar(avatarUrl);
        localStorage.setItem("selectedAvatar", avatarUrl);
        setShowAvatarOptions(false);
    };

    const toggleAvatarOptions = () => {
        setShowAvatarOptions((prevState) => !prevState);
    };

    if (!clerkUser) {
        return <p>Loading...</p>;
    }

    const userImage = userDetails?.profileImage || clerkUser.imageUrl;

    return (
        <div className="flex mt-[2rem] justify-center items-center flex-col">
            <div className="flex flex-col items-center">
                <img
                    src={userImage}
                    alt={`${clerkUser.firstName || "User"}'s profile`}
                    className="w-24 h-24 rounded-full mb-4 shadow-lg"
                />
                <h1 className="text-2xl font-semibold">
                    Welcome, {userDetails?.firstName || "User"}!
                </h1>
            </div>

            <div className="mt-4">
                <button
                    onClick={toggleAvatarOptions}
                    className="text-white bg-blue-500 px-4 py-1 rounded hover:bg-blue-600"
                >
                    {selectedAvatar ? "Change Avatar" : "Select Avatar"}
                </button>

                {showAvatarOptions && (
                    <div className="mt-2 flex gap-4 flex-wrap">
                        {avatarOptions.map((avatar, index) => (
                            <img
                                key={index}
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                                className={`w-16 h-16 rounded-full cursor-pointer border-2 ${selectedAvatar === avatar ? "border-blue-500" : "border-transparent"
                                    } hover:border-blue-500`}
                                onClick={() => handleAvatarSelection(avatar)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="text-center mt-4">
                <p className="text-lg">
                    Name: {userDetails?.firstName} {userDetails?.lastName}
                </p>
                <p className="text-lg">User Name: {userDetails?.username}</p>
                <p className="text-lg">Email: {userDetails?.email}</p>
                <p className="text-lg">
                    Status: {isOnline ? "Online" : "Offline"}
                </p>
                <button
                    onClick={toggleStatus}
                    className={`mt-4 px-4 py-2 rounded ${isOnline ? "bg-green-500" : "bg-gray-500"} text-white`}
                >
                    {isOnline ? "Go Offline" : "Go Online"}
                </button>
            </div>

            <div className="absolute left-0 top-0 m-[2rem]">
                <Link to="/">
                    <button className="flex gap-[1rem] justify-center items-center border-2 px-[15px] py-[7px] rounded-lg">
                        <span>
                            <IoChevronBackSharp />
                        </span>
                    </button>
                </Link>
            </div>

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
