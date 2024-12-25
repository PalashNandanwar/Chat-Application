// import React from "react";
import { SignOutButton, UserProfile, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";


const Profile = () => {
    const { user: clerkUser } = useUser();  // Get the user details from Clerk

    if (!clerkUser) {
        return <p>Loading...</p>;  // Handle the case when the user data is not loaded yet
    }

    return (
        // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
        //     <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">

        //         <div className="flex justify-between items-center">
        //             <span className="text-xl font-semibold text-gray-800">
        //                 Welcome, {clerkUser.firstName || "User"}
        //             </span>
        // <SignOutButton>
        //     <button className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600">
        //         Logout
        //     </button>
        // </SignOutButton>
        //         </div>
        //         <h2 className="text-2xl font-semibold text-gray-800 mt-4">Profile</h2>
        //         <div className="mt-4">
        //             <p className="text-lg">Name: {clerkUser.firstName} {clerkUser.lastName}</p>
        //             <p className="text-lg">Email: {clerkUser.emailAddresses[0]?.email || "Not available"}</p>
        //         </div>


        //     </div>
        // </div>

        <div className="flex mt-[2rem] justify-center items-center flex-col">
            <UserProfile />
            <div className=" absolute left-0 top-0 m-[2rem]">
                <Link to='/'>
                    <div >
                        <button className="flex gap-[1rem] justify-center items-center border-2 px-[15px] py-[7px] rounded-lg"><span><IoChevronBackSharp /></span></button>
                    </div>
                </Link>
            </div>

            <div className=" mt-[2rem]">
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