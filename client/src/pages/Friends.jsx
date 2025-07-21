import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUserPlus,
  FiSearch,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiUserX,
  FiUserCheck,
  FiX,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import axios from "axios";

// Import components and helpers
import UrgentCard from "../components/friend/UrgentCard";
import FriendCard from "../components/friend/FriendCard";
import { getDaysSince } from "../utils/dateHelpers";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("friends");
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [newFriendIdentifier, setNewFriendIdentifier] = useState(""); // Changed from email to generic identifier
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const { token } = useSelector((state) => state.auth);
  

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        // Fetch friends list
        const friendsRes = await axios.get(
          "http://localhost:3000/api/friends/list",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFriends(friendsRes.data);

        // Fetch pending friend requests
        const pendingRes = await axios.get(
          "http://localhost:3000/api/friends/pending",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPendingRequests(pendingRes.data);

        // Fetch sent friend requests
        const sentRes = await axios.get(
          "http://localhost:3000/api/friends/sent",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSentRequests(sentRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFriendsData();
  }, [token, activeTab]);

  const handleRequestResponse = async (requestId, action) => {
    // const method = action === 'cancel'?'delete':'post';
    try {
      if (action === "cancel") {
        await axios.delete(
          `http://localhost:3000/api/friends/cancel/${requestId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `http://localhost:3000/api/friends/${action}/${requestId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      if (action === "accept") {
        const friendsRes = await axios.get(
          "http://localhost:3000/api/friends/list",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFriends(friendsRes.data);
      }

      setPendingRequests(
        pendingRequests.filter((req) => req._id !== requestId)
      );
    } catch (error) {
      console.error("Error handling friend request:", error);
    }
  };

  const handleNewFriendIdentifier = async (val) => {
    setNewFriendIdentifier(val);
    setSearchClicked(false);
  };

  const handleSearchUsers = async () => {
    if (!newFriendIdentifier.trim()) return;

    setIsSearching(true);

    try {
      // Determine if the input is likely an email or ID
      const isEmail = newFriendIdentifier.includes("@");
      const queryParam = isEmail
        ? `email=${newFriendIdentifier}`
        : `id=${newFriendIdentifier}`;

      const res = await axios.get(
        `http://localhost:3000/api/users/search?${queryParam}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSearchResults(res.data.data || []);
    } catch (error) {
      console.error("Error searching users:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
      setSearchClicked(true);
    }
  };

  const handleSendFriendRequest = async (userId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/friends/send",
        { recipientId: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh sent requests
      const sentRes = await axios.get(
        "http://localhost:3000/api/friends/sent",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSentRequests(sentRes.data);
      setIsAddFriendModalOpen(false);
      setNewFriendIdentifier("");
      setSearchResults([]);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleCancelRequest = async (id) => {
    // console.log("Attempting to cancel friend request with ID:", id); // More descriptive log

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/friends/cancel/${id}`,
        {
          // You might need to include headers for authentication,
          // e.g., if you're sending a JWT token
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Uncomment and replace with your actual token if needed
          },
        }
      );

      // Axios automatically parses JSON responses, so response.data contains the JSON object
      // console.log("Request cancelled successfully:", response.data.message);

      // TODO: Update your UI here to reflect the cancellation.
      // For example, if you have a state variable holding friend requests,
      // you'd filter out the request with 'id' from that state.
      // Example: setFriendRequests(prevRequests => prevRequests.filter(req => req._id !== id));
      const sentRes = await axios.get(
        "http://localhost:3000/api/friends/sent",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSentRequests(sentRes.data);
    } catch (error) {
      // Axios errors have a structured format
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response from server:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
        alert(
          `Failed to cancel request: ${
            error.response.data.message || "Unknown error"
          }`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from server:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
        alert(`An error occurred: ${error.message}`);
      }
      console.error("Full error object:", error);
    }
  };

  const urgentDues = friends.filter(
    (friend) =>
      friend.balance > 0 &&
      (friend.urgent ||
        friend.balance > 1000 ||
        getDaysSince(friend.lastActivity) > 60)
  );

  // Filter friends by ID or email (no more name search)
  const filteredFriends = friends.filter(
    (friend) =>
      friend.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend._id.includes(searchTerm)
  );

  // Filter requests by sender/receiver email or ID
  const filteredPendingRequests = pendingRequests.filter(
    (request) =>
      request.requester.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.requester._id.includes(searchTerm)
  );

  // console.log(sentRequests);
  const filteredSentRequests = sentRequests.filter(
    (request) =>
      request.recipient.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.recipient._id.includes(searchTerm)
  );
  return (
    <div className="bg-gray-900 text-gray-300 font-sans flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Add Friend Modal */}
      <AnimatePresence>
        {isAddFriendModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsAddFriendModalOpen(false)}
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
                  <button
                    onClick={() => setIsAddFriendModalOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
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
                      onChange={(e) =>
                        handleNewFriendIdentifier(e.target.value)
                      }
                    />
                    <button
                      onClick={handleSearchUsers}
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
                    {searchResults.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                            {user.profilePic ? (
                              <img
                                src={user.profilePic}
                                alt={user.name}
                                className="w-full h-full rounded-full"
                              />
                            ) : (
                              <span className="text-lg">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {user.email}
                            </p>
                            <p className="text-xs text-gray-400">
                              ID: {user._id}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSendFriendRequest(user._id)}
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
        )}
      </AnimatePresence>

      {/* Left Panel: Priority Dues */}

      <aside className="w-full md:w-[35%] lg:w-[30%] bg-gray-800/30 flex flex-col border-r border-gray-700/50">
        <div className="p-6 border-b border-gray-700/50">
          <h1 className="text-2xl font-bold text-white mb-1">
            Priority Settlements
          </h1>
          <p className="text-gray-400 text-sm">
            Actionable insights on your dues
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {urgentDues.length > 0 ? (
              urgentDues.map((friend) => (
                <UrgentCard key={friend.id} friend={friend} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-700/30 p-6 rounded-xl text-center"
              >
                <FiCheckCircle className="mx-auto text-4xl text-emerald-500 mb-3" />
                <p className="text-gray-300 font-medium">All clear!</p>
                <p className="text-gray-400 text-sm">
                  No urgent dues right now.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Insights Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-3">AI Insights</h2>
            <div className="bg-gray-700/30 p-4 rounded-xl space-y-3 text-sm">
              <p className="flex items-center gap-3">
                <FiTrendingUp className="text-blue-400" /> You have{" "}
                <strong>{urgentDues.length}</strong> high-priority settlements
                to follow up on.
              </p>
              {urgentDues.length > 0 && urgentDues[0] && (
                <p className="flex items-center gap-3">
                  <FiTrendingUp className="text-yellow-400" /> Your highest
                  pending amount is <strong>₹{urgentDues[0].balance}</strong>{" "}
                  from <strong>{urgentDues[0].name}</strong>.
                </p>
              )}
              {pendingRequests.length > 0 && (
                <p className="flex items-center gap-3">
                  <FiClock className="text-purple-400" /> You have{" "}
                  <strong>{pendingRequests.length}</strong> pending friend
                  requests.
                </p>
              )}
              <p className="flex items-center gap-3">
                <FiCheckCircle className="text-emerald-400" /> All other dues
                are within normal limits.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Panel: Friends List */}
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

          {/* Tabs */}
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
          <AnimatePresence>
            {activeTab === "friends" && (
              <>
                {filteredFriends.length > 0 ? (
                  filteredFriends.map((friend) => (
                    <FriendCard key={friend.friendshipId} friend={friend} />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-20 text-gray-500"
                  >
                    <p className="font-medium">No friends found</p>
                    <p className="text-sm">Try a different search term.</p>
                  </motion.div>
                )}
              </>
            )}
            {/* {console.log(filteredPendingRequests)} */}
            {activeTab === "pending" && (
              <>
                {filteredPendingRequests.length > 0 ? (
                  filteredPendingRequests.map((request) => (
                    <motion.div
                      key={request._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-gray-800/50 rounded-xl p-4 mb-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                          {request.requester.avatar ? (
                            <img
                              src={request.requester.avatar}
                              alt={request.requester.name}
                              className="w-full h-full rounded-full"
                            />
                          ) : (
                            <span className="text-lg">
                              {request.requester.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">
                            {request.requester.name}
                          </h3>
                          <p className="text-xs text-gray-400">
                            Sent{" "}
                            {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleRequestResponse(request._id, "accept")
                          }
                          className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-full transition-colors"
                          title="Accept"
                        >
                          <FiUserCheck className="text-white" />
                        </button>
                        <button
                          onClick={() =>
                            handleRequestResponse(request._id, "cancel")
                          }
                          className="p-2 bg-red-600 hover:bg-red-500 rounded-full transition-colors"
                          title="Reject"
                        >
                          <FiUserX className="text-white" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-20 text-gray-500"
                  >
                    <FiClock className="mx-auto text-3xl mb-3" />
                    <p className="font-medium">No pending requests</p>
                    <p className="text-sm">You're all caught up!</p>
                  </motion.div>
                )}
              </>
            )}

            {activeTab === "sent" && (
              <>
                {filteredSentRequests.length > 0 ? (
                  filteredSentRequests.map((request) => (
                    <motion.div
                      key={request._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-gray-800/50 rounded-xl p-4 mb-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                          {request.recipient.avatar ? (
                            <img
                              src={request.recipient.avatar}
                              alt={request.recipient.name}
                              className="w-full h-full rounded-full"
                            />
                          ) : (
                            <span className="text-lg">
                              {request.recipient.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">
                            {request.recipient.name}
                          </h3>
                          <p className="text-xs text-gray-400">
                            Sent{" "}
                            {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-400">
                            {request.status}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          // Add cancel request functionality
                          handleCancelRequest(request._id);
                        }}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors text-gray-300"
                        title="Cancel Request"
                      >
                        <FiUserX />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-20 text-gray-500"
                  >
                    <FiClock className="mx-auto text-3xl mb-3" />
                    <p className="font-medium">No sent requests</p>
                    <p className="text-sm">
                      You haven't sent any friend requests.
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Friends;
