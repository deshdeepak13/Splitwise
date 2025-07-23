import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import BalanceInfo from './BalanceInfo';
import { getDaysSince } from '../../utils/dateHelpers';

const FriendCard = ({ friend }) => (
  <div className="group relative">
    {/* Glow effect on hover */}
    <div className="absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 
                    blur-md -z-10 transition-opacity duration-500 ease-out" />
    
    <Link
      to={`/friend/${friend.friendshipId}`}
      className="block text-white no-underline p-5 rounded-xl cursor-pointer 
                 border border-gray-700/70 bg-gradient-to-br from-gray-800/50 to-gray-900/70
                 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-900/10 
                 hover:-translate-y-1.5 hover:bg-gray-800/60 backdrop-blur-sm
                 overflow-hidden"
    >
      {/* Animated background highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
                      from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 
                      transition-opacity duration-700" />
      
      <div className="flex items-center gap-4 relative">
        {/* Profile image with animated ring */}
        <div className="relative">
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-500/30 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" />
          <div className="p-0.5 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 
                         group-hover:from-blue-500/80 group-hover:to-blue-600/80 
                         transition-all duration-500 ease-out relative">
            <img 
              src={friend.profilePic} 
              alt={friend.name} 
              className="w-12 h-12 rounded-full object-cover border border-gray-700/50 
                         group-hover:border-blue-400/50 transition-colors duration-300"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-grow min-w-0">
          <p className="font-semibold text-gray-100 truncate tracking-tight">
            {friend.name}
          </p>
          <div className="mt-1">
            <BalanceInfo balance={friend.balance} />
          </div>
        </div>

        {/* Right side info */}
        <div className="flex items-center gap-3">
          <div className="text-right whitespace-nowrap">
            <span className={`text-xs px-2 py-1 rounded-full 
                            ${friend.balance !== 0 
                              ? 'bg-gray-700/60 text-gray-300 group-hover:bg-blue-900/30 group-hover:text-blue-100' 
                              : 'bg-emerald-900/30 text-emerald-300 group-hover:bg-emerald-900/40'
                            } transition-colors duration-300`}>
              {friend.balance !== 0 
                ? `Active ${getDaysSince(friend.lastActivity)}d ago` 
                : 'All settled!'}
            </span>
          </div>
          
          {/* Animated arrow */}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700/50 
                          group-hover:bg-blue-500/90 text-blue-300 group-hover:text-white
                          opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 
                          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            <FiArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default FriendCard;