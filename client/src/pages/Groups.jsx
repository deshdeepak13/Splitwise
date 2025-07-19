// src/pages/Groups.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock Group Data (replace with API call)
const mockGroups = [
  {
    id: 'g1',
    name: 'Goa Trip',
    tag: 'Secret',
    balance: 1200,
    avatar: 'https://i.pravatar.cc/150?u=group1'
  },
  {
    id: 'g2',
    name: 'Flatmates',
    tag: 'Multi-Currency',
    balance: -500,
    avatar: 'https://i.pravatar.cc/150?u=group2'
  },
  {
    id: 'g3',
    name: 'College Buddies',
    tag: null,
    balance: 0,
    avatar: 'https://i.pravatar.cc/150?u=group3'
  }
];

// Tag badge
const Tag = ({ tag }) => {
  if (!tag) return null;
  return (
    <span className="text-xs bg-slate-600 text-white px-2 py-1 rounded-full ml-2">
      {tag}
    </span>
  );
};

// Balance display
const Balance = ({ balance }) => {
  if (balance > 0) {
    return <span className="text-green-400">Group owes you ₹{balance}</span>;
  }
  if (balance < 0) {
    return <span className="text-red-400">You owe ₹{Math.abs(balance)}</span>;
  }
  return <span className="text-gray-400">Settled up</span>;
};

// Group Card
const GroupCard = ({ group }) => (
  <Link to={`/group/${group.id}`} className="block text-white no-underline">
    <div className="flex items-center p-4 hover:bg-slate-700 cursor-pointer transition-colors duration-200 border-b border-slate-700">
      <img
        src={group.avatar}
        alt={group.name}
        className="w-12 h-12 rounded-full mr-4 object-cover"
      />
      <div className="flex-grow">
        <p className="font-bold text-slate-100 flex items-center">
          {group.name}
          <Tag tag={group.tag} />
        </p>
        <p className="text-sm"><Balance balance={group.balance} /></p>
      </div>
    </div>
  </Link>
);

// Main Groups Component
const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Replace with API call later
    setGroups(mockGroups);
  }, []);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-900 text-slate-200 font-sans flex h-screen">

      {/* Left: Group List */}
      <aside className="w-[30%] bg-slate-800 flex flex-col border-r border-slate-700">
        <div className="p-4 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
          <h1 className="text-2xl font-bold mb-4">Groups</h1>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search groups..."
              className="w-full bg-slate-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-200 placeholder-slate-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 whitespace-nowrap">
              + Create
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredGroups.length > 0 ? (
            filteredGroups.map(group => <GroupCard key={group.id} group={group} />)
          ) : (
            <p className="text-center mt-10 text-slate-400">No groups found.</p>
          )}
        </div>
      </aside>

      {/* Right: Placeholder */}
      <main className="w-[70%] bg-slate-900 flex items-center justify-center">
        <div className="text-center text-slate-500">
          <div className="text-6xl mb-4">👥</div>
          <h2 className="text-3xl font-bold text-slate-400 mb-2">Manage group expenses</h2>
          <p>Select a group to view balances, expenses, chat, and suggestions.</p>
        </div>
      </main>
    </div>
  );
};

export default Groups;
