import React, { useState } from "react";

const dummyGroups = [
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
  },
];

const GroupList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = dummyGroups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-white px-4 py-4">
      <h2 className="text-xl font-bold mb-4">Groups</h2>

      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#1e2a3a] text-white rounded-full px-4 py-2 w-full outline-none"
        />
        <button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold">
          + Create
        </button>
      </div>

      {/* Group List */}
      <div className="space-y-4">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="flex items-center space-x-4 hover:bg-[#2a3a4a] p-3 rounded-lg cursor-pointer transition duration-200"
          >
            <img
              src={group.img}
              alt={group.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{group.name}</span>
                {group.tag && (
                  <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">
                    {group.tag}
                  </span>
                )}
              </div>
              <div className={`${group.statusColor} text-sm`}>
                {group.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
