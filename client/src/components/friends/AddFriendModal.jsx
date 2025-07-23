import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiUserPlus } from "react-icons/fi";

const AddFriendModal = ({
  isOpen,
  onClose,
  newFriendIdentifier,
  onNewFriendIdentifierChange,
  onSearchUsers,
  isSearching,
  searchResults,
  searchClicked,
  onSendFriendRequest,
  ownUserId, // New prop to exclude self from search results
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gray-800 rounded-xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Add Friend</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <FiX size={24} />
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search by email or user ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter friend's email or ID"
                className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newFriendIdentifier}
                onChange={(e) => onNewFriendIdentifierChange(e.target.value)}
              />
              <button
                onClick={onSearchUsers}
                disabled={isSearching || !newFriendIdentifier.trim()}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300">
                Search Results
              </h3>
              {searchResults
                .filter((user) => user._id !== ownUserId) // Filter out current user
                .map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                        {user.profilePic ? (
                          <img
                            src={user.profilePic}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-lg text-white">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                        <p className="text-xs text-gray-400">ID: {user._id}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onSendFriendRequest(user._id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Add
                    </button>
                  </div>
                ))}
            </div>
          )}

          {searchResults.length === 0 &&
            newFriendIdentifier &&
            !isSearching &&
            searchClicked && (
              <div className="text-center py-4 text-gray-400">
                No users found with that email or ID
              </div>
            )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddFriendModal;