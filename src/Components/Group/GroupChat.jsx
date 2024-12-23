/* eslint-disable react/prop-types */
// import React from 'react'

import NavBar from "../NavBar"

const GroupChat = ({ user, setUser }) => {
    return (
        <>
            <NavBar user={user} setUser={setUser} />
            <div>GroupChat</div>
        </>
    )
}

export default GroupChat