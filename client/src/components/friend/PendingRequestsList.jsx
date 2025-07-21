import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUserCheck, FiUserX, FiClock } from "react-icons/fi";

const PendingRequestsList = ({ requests, searchTerm }) => {
  const filteredRequests = requests.filter(
    (request) =>
      request.requester.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.requester._id.includes(searchTerm)
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
                  Sent {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleRequestResponse(request._id, "accept")}
                className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-full transition-colors"
                title="Accept"
              >
                <FiUserCheck className="text-white" />
              </button>
              <button
                onClick={() => handleRequestResponse(request._id, "cancel")}
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
    </AnimatePresence>
  );
};

export default PendingRequestsList;
