import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { FiClock } from "react-icons/fi"; // Keep if still needed for NoContentMessage

// Import refactored components
import AddFriendModal from "../components/friends/AddFriendModal";
import PrioritySettlements from "../components/friends/PrioritySettlements";
import FriendsListTabs from "../components/friends/FriendsListTabs";
import FriendCard from "../components/friends/FriendCard"; // Existing component
import FriendRequestCard from "../components/friends/FriendRequestCard";
import NoContentMessage from "../components/shared/NoContentMessage"; // New reusable component

// Import helpers
import { getDaysSince } from "../utils/dateHelpers"; // Assuming this exists

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("friends");
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [newFriendIdentifier, setNewFriendIdentifier] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  const { token, user } = useSelector((state) => state.auth); // Get current user from auth state

  const fetchFriendsData = async () => {
    try {
      const friendsRes = await axios.get(
        "http://localhost:3000/api/friends/list",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFriends(friendsRes.data);
      console.log(friendsRes.data);

      const pendingRes = await axios.get(
        "http://localhost:3000/api/friends/pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPendingRequests(pendingRes.data);

      const sentRes = await axios.get(
        "http://localhost:3000/api/friends/sent",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSentRequests(sentRes.data);
    } catch (error) {
      console.error("Error fetching friends data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFriendsData();
    }
  }, [token, activeTab]); // Added activeTab to dependency array to re-fetch on tab change

  const handleRequestResponse = async (requestId, action) => {
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
      // Re-fetch all data to ensure consistent state across tabs after an action
      fetchFriendsData();
    } catch (error) {
      console.error("Error handling friend request:", error);
      alert(
        `Failed to ${action} request: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    }
  };

  const handleNewFriendIdentifierChange = (val) => {
    setNewFriendIdentifier(val);
    setSearchClicked(false); // Reset searchClicked when input changes
    if (!val.trim()) {
      setSearchResults([]); // Clear results if input is empty
    }
  };

  const handleSearchUsers = async () => {
    if (!newFriendIdentifier.trim()) {
      setSearchResults([]);
      setSearchClicked(true);
      return;
    }

    setIsSearching(true);
    try {
      const isEmail = newFriendIdentifier.includes("@");
      const queryParam = isEmail
        ? `email=${newFriendIdentifier}`
        : `id=${newFriendIdentifier}`;

      const res = await axios.get(
        `http://localhost:3000/api/users/search?${queryParam}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Filter out the current user from search results
      setSearchResults(res.data.data?.filter(u => u._id !== user.id) || []);
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
      alert("Friend request sent successfully!");
      setIsAddFriendModalOpen(false);
      setNewFriendIdentifier("");
      setSearchResults([]);
      setSearchClicked(false); // Reset search clicked state
      fetchFriendsData(); // Refresh all lists
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert(
        `Failed to send request: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    }
  };

  // Derived states for filtering
  const urgentDues = friends.filter(
    (friend) =>
      friend.balance > 0 &&
      (friend.urgent ||
        friend.balance > 1000 ||
        getDaysSince(friend.lastActivity) > 60)
  );

  console.log(friends)
  const filteredFriends = friends.filter(
    (friend) =>
      // friend.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // friend.friendId.includes(searchTerm) ||
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) // Added name search for friends list
  );

  const filteredPendingRequests = pendingRequests.filter(
    (request) =>
      request.requester.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.requester._id.includes(searchTerm) ||
      request.requester.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const filteredSentRequests = sentRequests.filter(
    (request) =>
      request.recipient.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.recipient._id.includes(searchTerm) ||
      request.recipient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-gray-300 font-sans flex flex-col md:flex-row h-screen overflow-hidden">
      <AddFriendModal
        isOpen={isAddFriendModalOpen}
        onClose={() => {
          setIsAddFriendModalOpen(false);
          setNewFriendIdentifier(""); // Clear input on close
          setSearchResults([]); // Clear search results on close
          setSearchClicked(false);
        }}
        newFriendIdentifier={newFriendIdentifier}
        onNewFriendIdentifierChange={handleNewFriendIdentifierChange}
        onSearchUsers={handleSearchUsers}
        isSearching={isSearching}
        searchResults={searchResults}
        searchClicked={searchClicked}
        onSendFriendRequest={handleSendFriendRequest}
        ownUserId={user?.id} // Pass current user's ID to filter self from results
      />

      <PrioritySettlements
        urgentDues={urgentDues}
        pendingRequestsCount={pendingRequests.length}
      />

      <main className="w-full md:w-[65%] lg:w-[70%] bg-gray-900 flex flex-col">
        <FriendsListTabs
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          activeTab={activeTab}
          onSetActiveTab={setActiveTab}
          onAddFriendClick={() => setIsAddFriendModalOpen(true)}
          friendsCount={friends.length}
          pendingRequestsCount={pendingRequests.length}
          sentRequestsCount={sentRequests.length}
        />

        <div className="flex-1 overflow-y-auto p-2">
          <AnimatePresence mode="wait">
            {activeTab === "friends" && (
              <>
                {filteredFriends.length > 0 ? (
                  filteredFriends.map((friend) => (
                    <FriendCard key={friend.friendshipId} friend={friend} />
                  ))
                ) : (
                  <NoContentMessage
                    title="No friends found"
                    message="Try a different search term or add new friends!"
                  />
                )}
              </>
            )}

            {activeTab === "pending" && (
              <>
                {filteredPendingRequests.length > 0 ? (
                  filteredPendingRequests.map((request) => (
                    <FriendRequestCard
                      key={request._id}
                      request={request}
                      type="pending"
                      onAccept={handleRequestResponse}
                      onReject={handleRequestResponse} // Reject also uses 'cancel' on backend
                    />
                  ))
                ) : (
                  <NoContentMessage
                    icon={FiClock}
                    title="No pending requests"
                    message="You're all caught up!"
                  />
                )}
              </>
            )}

            {activeTab === "sent" && (
              <>
                {filteredSentRequests.length > 0 ? (
                  filteredSentRequests.map((request) => (
                    <FriendRequestCard
                      key={request._id}
                      request={request}
                      type="sent"
                      onCancel={handleRequestResponse}
                    />
                  ))
                ) : (
                  <NoContentMessage
                    icon={FiClock}
                    title="No sent requests"
                    message="You haven't sent any friend requests."
                  />
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