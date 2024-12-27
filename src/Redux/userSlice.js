import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, // Stores logged-in user details
    userActive: [], // Stores the list of active users
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // Store logged-in user data
        },
        logoutUser: (state) => {
            state.user = null; // Remove user on logout
        },
        setActiveUsers: (state, action) => {
            state.userActive = action.payload; // Update active users list
        },
        addActiveUser: (state, action) => {
            state.userActive.push(action.payload); // Add a user to active users
        },
        removeActiveUser: (state, action) => {
            state.userActive = state.userActive.filter(user => user.username !== action.payload.username); // Remove user from active users
        },
    },
});

export const { setUser, logoutUser, setActiveUsers, addActiveUser, removeActiveUser } = userSlice.actions;

export default userSlice.reducer;
