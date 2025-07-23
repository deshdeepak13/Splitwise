import React from "react";
import { motion } from "framer-motion";
import { FiUserCheck, FiUserX } from "react-icons/fi";

const FriendRequestCard = ({
  request,
  type, // 'pending' or 'sent'
  onAccept,
  onReject,
  onCancel,
}) => {
  const user = type === "pending" ? request.requester : request.recipient;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-gray-800/50 rounded-xl p-4 mb-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
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
          <h3 className="font-medium text-white">{user.name}</h3>
          <p className="text-xs text-gray-400">
            {type === "pending" ? "Sent" : "Received"}{" "}
            {new Date(request.createdAt).toLocaleDateString()}
          </p>
          {type === "sent" && (
            <p className="text-xs text-gray-400">Status: {request.status}</p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        {type === "pending" && (
          <>
            <button
              onClick={() => onAccept(request._id)}
              className="p-2 bg-emerald-600 hover:bg-emerald-500 rounded-full transition-colors"
              title="Accept"
            >
              <FiUserCheck className="text-white" />
            </button>
            <button
              onClick={() => onReject(request._id)}
              className="p-2 bg-red-600 hover:bg-red-500 rounded-full transition-colors"
              title="Reject"
            >
              <FiUserX className="text-white" />
            </button>
          </>
        )}
        {type === "sent" && (
          <button
            onClick={() => onCancel(request._id)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors text-gray-300"
            title="Cancel Request"
          >
            <FiUserX />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default FriendRequestCard;