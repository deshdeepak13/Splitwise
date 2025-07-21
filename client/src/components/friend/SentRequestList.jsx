import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUserX, FiClock } from "react-icons/fi";

const SentRequestsList = ({ requests, searchTerm }) => {
  const filteredRequests = requests.filter(
    (request) =>
      request.recipient.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.recipient._id.includes(searchTerm)
  );

  return (
    <AnimatePresence>
      {filteredRequests.length > 0 ? (
        filteredRequests.map((request) => (
          <motion.div
            key={request._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-gray-800/50 rounded-xl p-4 mb-3 flex items-center justify-between"
          >
            {/* Request item content */}
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
                  Sent {new Date(request.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-400">{request.status}</p>
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
          <p className="text-sm">You haven't sent any friend requests.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SentRequestsList;
