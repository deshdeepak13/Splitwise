// src/pages/Friends.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation

// --- Mock Data (replace with your API call) ---
const mockFriends = [
  { id: '1', name: 'Arjun Sharma', avatar: 'https://i.pravatar.cc/150?u=arjun', balance: 550 },
  { id: '2', name: 'Priya Patel', avatar: 'https://i.pravatar.cc/150?u=priya', balance: -200 },
  { id: '3', name: 'Rohan Mehta', avatar: 'https://i.pravatar.cc/150?u=rohan', balance: 0 },
  { id: '4', name: 'Sneha Verma', avatar: 'https://i.pravatar.cc/150?u=sneha', balance: 1250 },
  { id: '5', name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?u=vikram', balance: -80 },
];

// --- Helper Component to format balance with Tailwind classes ---
const BalanceInfo = ({ balance }) => {
  if (balance > 0) {
    return <span className="text-green-400">owes you ₹{balance}</span>;
  }
  if (balance < 0) {
    return <span className="text-red-400">you owe ₹{Math.abs(balance)}</span>;
  }
  return <span className="text-gray-400">Settled up</span>;
};

// --- Friend Card Component ---
const FriendCard = ({ friend }) => (
  <Link to={`/friend/${friend.id}`} className="block text-white no-underline">
    <div className="flex items-center p-4 hover:bg-slate-700 cursor-pointer transition-colors duration-200 border-b border-slate-700">
      <img 
        src={friend.avatar} 
        alt={friend.name} 
        className="w-12 h-12 rounded-full mr-4 object-cover" 
      />
      <div className="flex-grow">
        <p className="font-bold text-slate-100">{friend.name}</p>
        <p className="text-sm">
          <BalanceInfo balance={friend.balance} />
        </p>
      </div>
    </div>
  </Link>
);

// --- Main Friends Page Component ---
const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch friends from your API on component mount
  useEffect(() => {
    // In a real app: axios.get('/api/friends').then(res => setFriends(res.data));
    setFriends(mockFriends);
  }, []);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-900 text-slate-200 font-sans flex h-screen">
      
      {/* Left Section (30%) - Friends List */}
      <aside className="w-[30%] bg-slate-800 flex flex-col border-r border-slate-700">
        <div className="p-4 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h1 className="text-2xl font-bold mb-4">Friends</h1>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-200 placeholder-slate-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 whitespace-nowrap">
              + Add
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredFriends.length > 0 ? (
            filteredFriends.map(friend => <FriendCard key={friend.id} friend={friend} />)
          ) : (
            <p className="text-center mt-10 text-slate-400">No friends found.</p>
          )}
        </div>
      </aside>

      {/* Right Section (70%) - Welcome Placeholder */}
      <main className="w-[70%] bg-slate-900 flex items-center justify-center">
        <div className="text-center text-slate-500">
           <div className="text-6xl mb-4">💸</div>
          <h2 className="text-3xl font-bold text-slate-400 mb-2">Split expenses with friends</h2>
          <p>Select a friend from the list to view your shared expenses, balances, and chat history.</p>
        </div>
      </main>
      
    </div>
  );
};

export default Friends;