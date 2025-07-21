import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FriendCard from "./FriendCard";

const FriendsList = ({ friends, searchTerm }) => {
  const filteredFriends = friends.filter(
    (friend) =>
      friend.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend._id.includes(searchTerm)
  );

  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
};

export default FriendsList;