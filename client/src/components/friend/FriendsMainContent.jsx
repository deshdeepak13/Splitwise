import React from "react";
import { FiUserPlus, FiSearch } from "react-icons/fi";
import FriendsList from "./FriendsList";
import PendingRequestsList from "./PendingRequestsList";
import SentRequestsList from "./SentRequestList";

const FriendsMainContent = ({
  friends,
  pendingRequests,
  sentRequests,
  searchTerm,
  setSearchTerm,
  activeTab,
  setActiveTab,
  setIsAddFriendModalOpen,
}) => {
  return (
    <main className="w-full md:w-[65%] lg:w-[70%] bg-gray-900 flex flex-col">
      <div className="p-4 border-b border-gray-700/50 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-4">
          <div className="relative flex-grow">
            <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder={`Search ${
                activeTab === "pending"
                  ? "pending requests"
                  : activeTab === "sent"
                  ? "sent requests"
                  : "friends"
              }...`}
              className="w-full bg-gray-800 rounded-full px-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500 border border-transparent focus:border-blue-500 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsAddFriendModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-5 rounded-full transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
          >
            <FiUserPlus />
            <span>Add Friend</span>
          </button>
        </div>

        <div className="flex mt-4 border-b border-gray-700/50">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "friends"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("friends")}
          >
            Friends ({friends.length})
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "pending"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending ({pendingRequests.length})
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "sent"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("sent")}
          >
            Sent ({sentRequests.length})
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {activeTab === "friends" && (
          <FriendsList friends={friends} searchTerm={searchTerm} />
        )}
        {activeTab === "pending" && (
          <PendingRequestsList 
            requests={pendingRequests} 
            searchTerm={searchTerm} 
          />
        )}
        {activeTab === "sent" && (
          <SentRequestsList 
            requests={sentRequests} 
            searchTerm={searchTerm} 
          />
        )}
      </div>
    </main>
  );
};

export default FriendsMainContent;