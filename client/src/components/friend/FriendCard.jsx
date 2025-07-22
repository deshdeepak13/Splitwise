import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import BalanceInfo from './BalanceInfo'; // Import the BalanceInfo component
import { getDaysSince } from '../../utils/dateHelpers'; // Import helper function

const FriendCard = ({ friend }) => (
  <div className="group">
    <Link
      to={`/friend/${friend.friendshipId}`}
      className="block text-white no-underline p-4 rounded-xl cursor-pointer 
                   border border-gray-800 
                   transition-all duration-300 ease-in-out
                   hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/20 
                   hover:-translate-y-1 hover:bg-gray-800/40"
    >
      <div className="flex items-center gap-4">
        <div className="p-0.5 rounded-full bg-gray-700/80 group-hover:bg-blue-500 transition-colors duration-300">
          <img src={friend.profilePic} alt={friend.name} className="w-12 h-12 rounded-full object-cover" />
        </div>
        <div className="flex-grow">
          <p className="font-bold text-gray-100">{friend.name}</p>
          <p className="text-sm">
            <BalanceInfo balance={friend.balance} />
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-gray-500">
              {friend.balance !== 0 ? `Active ${getDaysSince(friend.lastActivity)}d ago` : 'All clear!'}
            </span>
          </div>
          <div className="text-blue-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 
                          transition-all duration-300 ease-in-out">
            <FiArrowRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default FriendCard;