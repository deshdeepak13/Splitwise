import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrendingUp, FiCheckCircle, FiClock } from "react-icons/fi";
import UrgentCard from "./UrgentCard";
import { getDaysSince } from "../../utils/dateHelpers";

const FriendsSidebar = ({ urgentDues, pendingRequests }) => {
  return (
    <aside className="w-full md:w-[35%] lg:w-[30%] bg-gray-800/30 flex flex-col border-r border-gray-700/50">
      <div className="p-6 border-b border-gray-700/50">
        <h1 className="text-2xl font-bold text-white mb-1">Priority Settlements</h1>
        <p className="text-gray-400 text-sm">Actionable insights on your dues</p>
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
              <p className="text-gray-400 text-sm">No urgent dues right now.</p>
            </motion.div>
          )}
        </AnimatePresence>

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
  );
};

export default FriendsSidebar;