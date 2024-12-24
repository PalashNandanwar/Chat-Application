// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */

// import React from "react";
// import { Link } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
// import { CgProfile } from "react-icons/cg";


// const NavBar = ({ user, setUser }) => {
//     const { isSignedIn, user: clerkUser } = useUser();


//     React.useEffect(() => {
//         if (isSignedIn) {
//             setUser(clerkUser);
//         } else {
//             setUser(null);
//         }
//     }, [isSignedIn, clerkUser, setUser]);

//     return (
//         <nav className="flex justify-between items-center bg-blue-500 p-4">
//             <h1 className="text-white text-lg font-bold">Chat Application</h1>
//             <div className="flex items-center gap-4">
//                 <Link to="/" className="text-white">
//                     Home
//                 </Link>
//                 {isSignedIn && (
//                     <>
//                         <Link to="/Single-chat" className="text-white">
//                             Private Chat
//                         </Link>
//                         <Link to="/Group-Chat" className="text-white">
//                             Group Chat
//                         </Link>
//                     </>
//                 )}
//                 {isSignedIn ? (
//                     <div>
//                         <Link to='/Profile'>
//                             <span className=" text-lg"><CgProfile /></span>
//                         </Link>
//                     </div>
//                 ) : (

//                     <div className=" flex gap-4">
//                         <Link to="/login" className="text-white">
//                             Login
//                         </Link>
//                         <Link to="/signUp" className="text-white">
//                             signup
//                         </Link>
//                     </div>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default NavBar;


/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { CgProfile } from "react-icons/cg";

const NavBar = ({ user, setUser }) => {
    const { isSignedIn, user: clerkUser } = useUser();

    React.useEffect(() => {
        if (isSignedIn) {
            setUser(clerkUser);
        } else {
            setUser(null);
        }
    }, [isSignedIn, clerkUser, setUser]);

    return (
        <nav className="flex justify-between items-center bg-blue-500 p-4">
            <h1 className="text-white text-lg font-bold">Chat Application</h1>
            <div className="flex items-center gap-4">
                <Link to="/" className="text-white">
                    Home
                </Link>
                {isSignedIn && (
                    <>
                        <Link to="/Single-chat" className="text-white">
                            Private Chat
                        </Link>
                        <Link to="/Group-Chat" className="text-white">
                            Group Chat
                        </Link>
                    </>
                )}
                {isSignedIn ? (
                    <div>
                        <Link to="/profile">
                            <span className="text-lg">
                                <CgProfile />
                            </span>
                        </Link>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <Link to="/login" className="text-white">
                            Login
                        </Link>
                        <Link to="/signup" className="text-white">
                            Signup
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
