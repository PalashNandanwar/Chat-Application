/* eslint-disable react/prop-types */
// import React from 'react'

import NavBar from "../NavBar"

const SingleChat = ({ user, setUser }) => {
    return (
        <>
            <NavBar user={user} setUser={setUser} />
            <div>SingleChat</div>
        </>
    )
}

export default SingleChat