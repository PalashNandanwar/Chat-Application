/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import ChatWindow from './ChatWindow';
import img5 from "../../assets/profile1.png";

const GroupChat = ({ user, setUser, userData }) => {
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState([]);
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);


    // Fetch users for adding members
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/chat/users');
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError('Failed to fetch users');
                console.error(error);
            }
        };

        const fetchGroups = async () => {
            try {
                const response = await fetch('http://localhost:5000/grp');
                if (!response.ok) throw new Error('Failed to fetch groups');
                const data = await response.json();
                setGroups(data);
            } catch (error) {
                setError('Failed to fetch groups');
                console.error(error);
            }
        };

        fetchUsers();
        fetchGroups();
    }, []);


    const createGroup = async () => {
        if (!groupName || !members.length) {
            setError('Please enter group name and select members');
            return;
        }

        if (groups.some(group => group.name.toLowerCase() === groupName.toLowerCase())) {
            setError('Group name already exists. Please choose a different name.');
            return;
        }

        const groupPayload = {
            groupName,
            memberIds: members,
            admin: user._id
        };

        try {
            const response = await fetch('http://localhost:5000/chat/createGroup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(groupPayload),
            });

            if (!response.ok) throw new Error('Failed to create group');

            const data = await response.json();
            setGroups(prevGroups => [...prevGroups, data.group]);
            handleModalClose();
        } catch (error) {
            setError('Failed to create group');
            console.error(error);
        }
    };

    const handleModalClose = () => {
        setShowCreateGroupModal(false);
        setGroupName('');
        setMembers([]);
        setError(null);
    };

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <NavBar user={user} setUser={setUser} />
            <div className="flex flex-1">
                <div className="w-1/4 bg-gray-200 p-4 shadow-lg border-r border-gray-600 overflow-y-auto h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Groups</h2>
                        <button
                            onClick={() => setShowCreateGroupModal(true)}
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                        >
                            + Create Group
                        </button>
                    </div>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search groups..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 mb-4 border rounded-lg"
                    />

                    {/* Group List */}
                    <div className="flex flex-col gap-4 h-screen overflow-y-auto">
                        {filteredGroups.map(group => (
                            <div
                                key={group._id}
                                className={`p-4 rounded-md border cursor-pointer transition-all duration-200 border-gray-500 
                             ${selectedGroup?._id === group._id ? "border-blue-500 bg-blue-500" : "hover:bg-gray-100"}`}
                                onClick={() => setSelectedGroup(group)}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={img5} // Use selected pic or default
                                        alt="P"
                                        className="w-11 h-11 rounded-full mr-4"
                                    />
                                    <h3 className="font-semibold text-lg text-gray-900">{group.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="flex-1 flex flex-col ">
                    {selectedGroup ? (
                        <ChatWindow group={selectedGroup} />
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-center text-xl font-semibold text-gray-500">
                                Select a group to start chatting
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Group Modal */}
            {showCreateGroupModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Create New Group</h3>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <input
                            type="text"
                            placeholder="Group Name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full p-2 mb-4 border rounded-lg"
                        />
                        <div className="border rounded-lg p-2 max-h-40 overflow-y-auto mb-4">
                            {users.map(user => (
                                <div
                                    key={user._id}
                                    className={`p-2 cursor-pointer rounded-lg ${members.includes(user._id) ? 'bg-blue-300' : 'hover:bg-gray-200'}`}
                                    onClick={() => setMembers(members.includes(user._id) ? members.filter(id => id !== user._id) : [...members, user._id])}
                                >
                                    {user.name === userData.username ? "You" : user.name}
                                </div>
                            ))}
                        </div>

                        <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 w-full" onClick={createGroup}>Create Group</button>
                        <button className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 w-full mt-2" onClick={handleModalClose}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupChat;
