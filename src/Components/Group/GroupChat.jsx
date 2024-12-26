import { useState, useEffect} from "react";
import Navbar from "../NavBar";
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi'; 
import { AiOutlinePaperClip , AiOutlineArrowRight } from 'react-icons/ai'; 

const GroupChat = ({ user, setUser }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null); // Current group
  const [searchQuery, setSearchQuery] = useState(""); // Group search query
  const [showSettings, setShowSettings] = useState(false); // Dropdown state
  const [showAttachMenu, setShowAttachMenu] = useState(false); // Attach menu state
  const [messageInput, setMessageInput] = useState(""); // Message input
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [groupName, setGroupName] = useState(""); // For group name
  const [members, setMembers] = useState([]); // Array for selected members
  const [isGroupInfoModalOpen, setIsGroupInfoModalOpen] = useState(false); // Controls group info modal visibility
  const [groupInfo, setGroupInfo] = useState(null); // Holds the group info, such as the number of members

  // Fetch mock data
  useEffect(() => {
    fetch("/mockData.json")
      .then((response) => response.json())
      .then((data) => setGroups(data.groups))
      .catch((error) => console.error("Error fetching mock data:", error));
  }, []);

  // Effect to manage body overflow
  useEffect(() => {
    document.body.classList.add('overflow-hidden'); // Add class to body

    return () => {
      document.body.classList.remove('overflow-hidden'); // Clean up on unmount
    };
  }, []);

  // Filter groups by search query
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Main Navbar */}
      <Navbar user={user} setUser={setUser} />

      <div className="flex flex-1 h-full">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200 p-4 shadow-lg border-r border-gray-600 overflow-y-auto h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Groups</h2>
            <button
              onClick={() => setShowCreateGroupModal(true)}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            >
              + Create Group
            </button>
          </div>
          
          {showCreateGroupModal && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
         <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
           <h3 className="text-xl font-semibold mb-4">Create New Group</h3>
           <div className="mb-4">
             <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Group Name</label>
             <input
               type="text"
               id="groupName"
               value={groupName}
               onChange={(e) => setGroupName(e.target.value)}
               className="w-full p-2 border rounded-lg"
             />
           </div>
           <div className="mb-4">
             <label htmlFor="members" className="block text-sm font-medium text-gray-700">Add Members</label>
             {/* Add input or select for adding members */}
             <input
               type="text"
               id="members"
               value={members.join(", ")}
               onChange={(e) => setMembers(e.target.value.split(","))}
               className="w-full p-2 border rounded-lg"
               placeholder="Enter member names"
             />
           </div>
           <button
             className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 mt-4 w-full"
             onClick={() => {
               // Logic to create group goes here
               setShowCreateGroupModal(false);
             }}
           >
             Create Group
            </button>
             <button
                className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 mt-2 w-full"
                onClick={() => setShowCreateGroupModal(false)}
             >
             Cancel
           </button>
         </div>
        </div>
     )}

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg focus:ring-blue-500"
          />

          {/* Group List */}
          <ul>
            {filteredGroups.map((group) => (
              <li
                key={group.id}
                className="p-2 border-b hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                onClick={() => setSelectedGroup(group)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center mr-3">
                    G
                  </div>
                  <div>
                    <p className="font-semibold">{group.name}</p>
                    {group.unreadMessages > 0 && (
                      <p className="text-sm text-blue-500">
                        {group.unreadMessages} unread messages
                      </p>
                    )}
                  </div>
                </div>
                {group.unreadMessages > 0 && (
                  <div className="bg-blue-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
                    {group.unreadMessages}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col relative overflow-hidden p-2 ">
          {selectedGroup ? (
            <>
              {/* Group Navbar */}
              <div className="p-2 border-b bg-gray-200 flex items-center justify-between shadow-sm">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center mr-3">
                    G
                  </div>
                  <h2 className="font-semibold text-lg">{selectedGroup.name}</h2>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Search Icon */}
                  <button className="p-2">
                   <FaSearch size={20} />
                  </button>

                  {/* Settings Icon */}
                  <button onClick={() => setShowSettings(!showSettings)} className="p-2">
                   <FiSettings size={20} />
                  </button>
                </div>

                {/* Settings Dropdown */}
                {showSettings && (
                  <div className="absolute right-4 top-16 bg-white shadow-lg rounded-lg border p-2">
                    <ul>
                      <li className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                          setGroupInfo(selectedGroup); // Pass selected group info to the modal
                          setIsGroupInfoModalOpen(true); // Open Group Info modal
                        }}
                        >
                        Group Info
                      </li>
                      <li className="p-2 hover:bg-gray-100 cursor-pointer">
                        Select Messages
                      </li>
                      <li className="p-2 hover:bg-gray-100 cursor-pointer">
                        Add to Favorites
                      </li>
                      <li className="p-2 hover:bg-gray-100 cursor-pointer">
                        Clear Chat
                      </li>
                    </ul>
                  </div>
                )}
              </div>
               
               {/* Group Info Modal */}
                {isGroupInfoModalOpen && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                      <h2 className="text-xl font-semibold mb-4">Group Info</h2>
                      <div>
                        <p className="text-gray-600"><strong>Group Name:</strong> {groupInfo?.name}</p>
                        <p className="text-gray-600"><strong>Members:</strong> {groupInfo?.members.length}</p>
                        <p className="text-gray-600"><strong>Member Names:</strong></p>
                            <ul className="list-disc list-inside">
                              {groupInfo?.members.map((member, index) => (
                                <li key={index} className="text-gray-600">{member}</li>
                              ))}
                            </ul>
                        {/* Add more info about the group as needed */}
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button
                          onClick={() => setIsGroupInfoModalOpen(false)} // Close the modal
                          className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}



              {/* Messages */}
              <div className="flex-1 max-h-[calc(100vh-200px)] overflow-y-auto p-4 bg-gray-50">
                {selectedGroup.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shadow ${
                        msg.sender === "me"
                          ? "bg-blue-400 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-sm text-gray-500 ml-1">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 flex items-center border-t bg-white relative">
                {/* Attach Icon */}
                <button onClick={() => setShowAttachMenu(!showAttachMenu)} className="p-2">
                  <AiOutlinePaperClip size={20} />
                </button>
                {/* Attachment Dropdown */}
                {showAttachMenu && (
                  <div className="absolute bottom-14 left-4 bg-white shadow-lg rounded-lg border p-2">
                    <ul>
                      <li className="p-2 hover:bg-gray-100 cursor-pointer">
                        Document
                      </li>
                      <li className="p-2 hover:bg-gray-100 cursor-pointer">
                        Photo
                      </li>
                      <li className="p-2 hover:bg-gray-100 cursor-pointer">
                        Video
                      </li>
                      <li className="p-2 hover:bg-gray-100 cursor-pointer">
                        Contact
                      </li>
                    </ul>
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 p-2 border rounded-lg focus:ring-blue-500"
                />
                <button className="bg-blue-500 text-white p-2 rounded-lg ml-2">
                  <AiOutlineArrowRight size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-2xl font-semibold">Select a Group</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
GroupChat.propTypes = {
    user: PropTypes.object.isRequired,     // Assuming 'user' is an object
    setUser: PropTypes.func.isRequired,    // Assuming 'setUser' is a function
  };

export default GroupChat;
