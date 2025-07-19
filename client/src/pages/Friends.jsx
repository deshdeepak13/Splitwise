import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUserPlus, FiSearch, FiBell, FiSunrise, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import { FiArrowRight } from 'react-icons/fi';

// --- HELPER FUNCTIONS ---

// Creates a date string 'days' ago from the current date for realistic data
const getDateAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

// Calculates days since a given date string
const getDaysSince = (dateString) => {
  if (!dateString) return 0;
  const today = new Date();
  const lastDate = new Date(dateString);
  const diffTime = Math.abs(today - lastDate);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

// --- MOCK DATA (with realistic dates) ---
const mockFriends = [
  { 
    id: '1', name: 'Arjun Sharma', avatar: 'https://i.pravatar.cc/150?u=arjun', balance: 550, 
    lastActivity: getDateAgo(15), insights: ['Frequent traveler with you', 'Usually settles within 2 weeks']
  },
  { 
    id: '2', name: 'Priya Patel', avatar: 'https://i.pravatar.cc/150?u=priya', balance: -200, 
    lastActivity: getDateAgo(30), insights: ['Recently changed jobs', 'Prefers UPI payments']
  },
  { 
    id: '3', name: 'Rohan Mehta', avatar: 'https://i.pravatar.cc/150?u=rohan', balance: 0, 
    lastActivity: getDateAgo(40), insights: ['Always settles immediately', 'Likes to split evenly']
  },
  { 
    id: '4', name: 'Sneha Verma', avatar: 'https://i.pravatar.cc/150?u=sneha', balance: 1250, 
    lastActivity: getDateAgo(100), insights: ['Large amount pending for a while', 'Might need a friendly reminder'], urgent: true
  },
  { 
    id: '5', name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?u=vikram', balance: -80, 
    lastActivity: getDateAgo(33), insights: ['Small amount', 'No rush needed']
  },
];


// --- REFINED UI COMPONENTS ---

const BalanceInfo = ({ balance }) => {
  if (balance > 0) {
    return <span className="text-emerald-400">Owes you ₹{balance}</span>;
  }
  if (balance < 0) {
    return <span className="text-rose-400">You owe ₹{Math.abs(balance)}</span>;
  }
  return <span className="text-gray-500">Settled up</span>;
};

const UrgentCard = ({ friend }) => {
  const daysSince = getDaysSince(friend.lastActivity);
  
  return (
    <div
          // layout
          // initial={{ opacity: 0, y: -20 }}
          // animate={{ opacity: 1, y: 0 }}
          // exit={{ opacity: 0, y: -20 }}
      className="bg-gray-800/50 rounded-xl p-4 border border-rose-500/30 shadow-lg"
    >
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


// The beautiful FriendCard with microinteractions
const FriendCard = ({ friend }) => (
  // The 'group' class allows us to style children based on the parent's hover state
  <div className="group">
    <Link
      to={`/friend/${friend.id}`}
      className="block text-white no-underline p-4 rounded-xl cursor-pointer 
                 border border-gray-800 
                 transition-all duration-300 ease-in-out
                 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/20 
                 hover:-translate-y-1 hover:bg-gray-800/40"
    >
      <div className="flex items-center gap-4">
        {/* Avatar with a hover-activated highlight ring */}
        <div className="p-0.5 rounded-full bg-gray-700/80 group-hover:bg-blue-500 transition-colors duration-300">
          <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full object-cover" />
        </div>

        {/* Name and Balance Info */}
        <div className="flex-grow">
          <p className="font-bold text-gray-100">{friend.name}</p>
          <p className="text-sm">
            <BalanceInfo balance={friend.balance} />
          </p>
        </div>

        {/* Right side with last activity and a hover-activated arrow icon */}
        <div className="flex items-center gap-4">
          <div className="text-right">
             <span className="text-xs text-gray-500">
                {friend.balance !== 0 ? `Active ${getDaysSince(friend.lastActivity)}d ago` : 'All clear!'}
             </span>
          </div>
          {/* This icon smoothly fades and slides in on hover */}
          <div className="text-blue-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 
                          transition-all duration-300 ease-in-out">
            <FiArrowRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  </div>
);

// export default FriendCard;

// --- MAIN COMPONENT & LAYOUT ---

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real app, you would fetch this data
    setFriends(mockFriends);
  }, []);

  // Smarter filtering for urgent dues (people who owe you a significant amount or for a long time)
  const urgentDues = friends.filter(friend => 
    friend.balance > 0 && (friend.urgent || friend.balance > 1000 || getDaysSince(friend.lastActivity) > 60)
  );
  
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-gray-300 font-sans flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Panel: Priority Dues */}
      <aside className="w-full md:w-[35%] lg:w-[30%] bg-gray-800/30 flex flex-col border-r border-gray-700/50">
        <div className="p-6 border-b border-gray-700/50">
          <h1 className="text-2xl font-bold text-white mb-1">Priority Settlements</h1>
          <p className="text-gray-400 text-sm">Actionable insights on your dues</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {urgentDues.length > 0 ? (
              urgentDues.map(friend => <UrgentCard key={friend.id} friend={friend} />)
            ) : (
              <div 
              // initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="bg-gray-700/30 p-6 rounded-xl text-center">
                <FiCheckCircle className="mx-auto text-4xl text-emerald-500 mb-3" />
                <p className="text-gray-300 font-medium">All clear!</p>
                <p className="text-gray-400 text-sm">No urgent dues right now.</p>
              </div>
            )}
          </AnimatePresence>

          {/* AI Insights Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-3">AI Insights</h2>
            <div className="bg-gray-700/30 p-4 rounded-xl space-y-3 text-sm">
                <p className="flex items-center gap-3"><FiTrendingUp className="text-blue-400"/> You have <strong>{urgentDues.length}</strong> high-priority settlements to follow up on.</p>
                {urgentDues.length > 0 && urgentDues[0] && (
                    <p className="flex items-center gap-3"><FiSunrise className="text-yellow-400"/> Your highest pending amount is <strong>₹{urgentDues[0].balance}</strong> from <strong>{urgentDues[0].name}</strong>.</p>
                )}
                <p className="flex items-center gap-3"><FiCheckCircle className="text-emerald-400"/> All other dues are within normal limits.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Panel: Friends List */}
      <main className="w-full md:w-[65%] lg:w-[70%] bg-gray-900 flex flex-col">
        <div className="p-4 border-b border-gray-700/50 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <div className="relative flex-grow">
                <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500"/>
                <input
                  type="text"
                  placeholder="Search friends..."
                  className="w-full bg-gray-800 rounded-full px-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500 border border-transparent focus:border-blue-500 transition-all"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-5 rounded-full transition-all duration-200 transform hover:scale-105 whitespace-nowrap">
                <FiUserPlus/>
                <span>Add Friend</span>
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
            <AnimatePresence>
              {filteredFriends.length > 0 ? (
                filteredFriends.map(friend => <FriendCard key={friend.id} friend={friend} />)
              ) : (
                <div 
                // initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                className="text-center mt-20 text-gray-500">
                  <p className="font-medium">No friends found</p>
                  <p className="text-sm">Try a different search term.</p>
                </div>
              )}
            </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Friends;