import React from 'react';
import { FiBell, FiSunrise } from 'react-icons/fi';
import BalanceInfo from './BalanceInfo'; // Import the BalanceInfo component
import { getDaysSince } from '../../utils/dateHelpers'; // Import helper function

const UrgentCard = ({ friend }) => {
  const daysSince = getDaysSince(friend.lastActivity);

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-rose-500/30 shadow-lg">
      <div className="flex items-start gap-4">
        <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full object-cover border-2 border-rose-500/50" />
        <div className="flex-grow">
          <h3 className="font-bold text-white">{friend.name}</h3>
          <p className="text-sm text-gray-400 mb-3">
            <BalanceInfo balance={friend.balance} /> • {daysSince} days ago
          </p>
          <div className="bg-yellow-500/10 p-2 rounded-md mb-3">
            <p className="text-xs text-yellow-300 flex items-start gap-2">
              <span className="mt-0.5"><FiSunrise /></span>
              <span>{friend.insights[0]}</span>
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
            <FiBell />
            Send Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrgentCard;