/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // Assuming you are using Clerk for authentication

const UserList = ({ users, setUsers }) => {
    const { user, isLoaded } = useUser(); // Get the current logged-in user

    useEffect(() => {
        if (user && isLoaded) {
            // If the user is logged in, add their status to the list or update the status
            const newUser = {
                id: user.id,
                username: user.username,
                status: "Active",
            };

            // Update the users list with the new user's status
            setUsers((prevUsers) => {
                // Check if the user is already in the list
                const existingUserIndex = prevUsers.findIndex(
                    (existingUser) => existingUser.id === newUser.id
                );

                if (existingUserIndex !== -1) {
                    // Update status if the user is already in the list
                    const updatedUsers = [...prevUsers];
                    updatedUsers[existingUserIndex] = newUser;
                    return updatedUsers;
                } else {
                    // Add new user to the list
                    return [...prevUsers, newUser];
                }
            });

            // Clean up the status when the user logs out
            return () => {
                setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
            };
        }
    }, [user, isLoaded, setUsers]);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <span>{user.username}</span> - <span>{user.status}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
