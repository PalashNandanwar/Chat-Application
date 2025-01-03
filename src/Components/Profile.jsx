/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
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

const Profile = ({ onUserInfoUpdate }) => {
    const { user: clerkUser } = useUser();
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const [userDetails, setUserDetails] = useState({});
    const [userData, setUserData] = useState({})
    const [showAvatarOptions, setShowAvatarOptions] = useState(false); // Define state
    const [userId, setUserId] = useState();
    const [userImage, setUserImage] = useState();
    const [user_Data, setUser_Data] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (user_Data.username) {
            setName(user_Data.username);
        }
        if (user_Data.email) {
            setEmail(user_Data.email);
        }
        if (userImage) {
            setImage(userImage);
        }

        const handleSave = () => {
            const userData = { name, email, userId, image };
            onUserInfoUpdate({
                username: name,
                email: email,
                userId: userId,
                image: image
            });
            // Pass updated data to AppRoutes
            console.log("Profile Updated:", userData);
        };

        handleSave()
    }, [user_Data]);


    console.log("name :- " + name + " email :- " + email + " userId :- " + userId);

    console.log("name :- " + user_Data.username)
    console.log("email :- " + user_Data.email)
    console.log("userData" + userData)

    useEffect(() => {
        if (clerkUser) {
            const userImages = clerkUser.hasImage
                ? clerkUser.imageUrl
                : selectedAvatar || avatarOptions[0];
            setUserImage(userImages);

            const details = {
                username: clerkUser.username || "Guest",
                firstName: clerkUser.firstName || "User",
                lastName: clerkUser.lastName || "",
                email: clerkUser.emailAddresses[0]?.emailAddress || "Not provided",
                profileImage: userImages,
                activeStatus: !!clerkUser.id,
            };

            setUserDetails(details);
            console.log("User Details Updated:", details);

            // Prepare the user data and immediately save it to state
            const user_Data = {
                name: clerkUser.username || "Guest",
                email: clerkUser.emailAddresses[0]?.emailAddress,
                password: "12345678",
                isActive: !!clerkUser.id,
                lastSeen: new Date(),
            };

            setUserData(user_Data); // Update state

            // Call backend sync here instead of using another useEffect
            storeUserData(user_Data);
        }
    }, [clerkUser, selectedAvatar]);

    // Function to handle data storage
    const storeUserData = async (user_Data) => {
        try {
            const response = await fetch("http://localhost:5000/chat/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user_Data),
            });

            if (!response.ok && response.status !== 400) {
                throw new Error("Failed to save user data");
            }

            const data = await response.json();
            console.log("User Data Synced:", data);
            setUser_Data(
                {
                    username: data.user.name,
                    email: data.user.email,
                    isActive: data.user.isActive,
                    lastSeen: new Date(data.user.lastSeen),
                    userId: data.user._id,
                }
            )

            // onUserInfoUpdate(data.username, data?.user._id);
            setUserId(data.user._id); // Save the user ID after backend response
        } catch (error) {
            console.error("Error saving user data:", error.message);
        }
    };

    // Load avatar from localStorage
    useEffect(() => {
        const savedAvatar = localStorage.getItem("selectedAvatar");
        if (savedAvatar) {
            setSelectedAvatar(savedAvatar);
        }
    }, []);

    const toggleAvatarOptions = () => {
        setShowAvatarOptions((prevState) => !prevState);
    };

    const handleAvatarSelection = (avatarUrl) => {
        setSelectedAvatar(avatarUrl);
        localStorage.setItem("selectedAvatar", avatarUrl);
    };

    const handleRegister = async () => {
        if (!clerkUser) {
            console.error("User is not logged in.");
            return;
        }

        try {
            const registrationData = {
                name: clerkUser.username || "Guest",
                email: clerkUser.emailAddresses[0]?.emailAddress,
                profileImage: userImage,
                isActive: true, // User is active when registered
                lastSeen: new Date()
            };

            const response = await fetch("http://localhost:5000/chat/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registrationData),
            });

            if (!response.ok) {
                throw new Error("Failed to register user");
            }

            const data = await response.json();
            console.log("User registered successfully:", data);
            setUserId(data.user._id); // Update the user ID after registration

        } catch (error) {
            console.error("Error during registration:", error.message);
        }
    };

    if (!clerkUser || !userDetails) {
        return <p>Loading...</p>;
    }

    const handleLogout = async () => {
        if (!userId) {
            console.error("User ID is missing.");
            return;
        }

        const lastSeen = new Date(); // Get the current timestamp

        try {
            const response = await fetch(
                `http://localhost:5000/chat/users/${userId}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        isActive: false,
                        lastSeen: lastSeen, // Update the lastSeen field
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update user status on logout");
            }

            console.log("User status updated to inactive and lastSeen updated:", lastSeen);

            // You can perform any additional logout actions here, e.g., signing out from Clerk
        } catch (error) {
            console.error("Error during logout:", error.message);
        }
    };

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
                    Name: {userDetails.firstName} {userDetails.lastName}
                </p>
                <p className="text-lg">User Name: {userDetails.username}</p>
                <p className="text-lg">Email: {userDetails.email}</p>
                <p className="text-lg">
                    Status: Online
                </p>
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
                <button
                    onClick={handleRegister}
                    className="text-white bg-green-500 px-4 py-1 rounded hover:bg-green-600">
                    Register
                </button>
            </div>

            <div className="mt-[2rem]">
                <SignOutButton>
                    <button
                        onClick={handleLogout}
                        className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600">
                        Logout
                    </button>
                </SignOutButton>
            </div>
        </div>
    );
};

export default Profile;
