import React, { useState, useEffect } from 'react';

const sampleActivities = [
  {
    id: 1,
    date: '2025-07-18',
    title: 'Paid ₹500 to Krishna for groceries',
    type: 'expense',
    group: 'Flatmates',
    category: 'Groceries',
    read: false,
  },
  {
    id: 2,
    date: '2025-07-18',
    title: 'Settlement with Deshdeepak: You gave ₹200',
    type: 'settlement',
    group: 'Trip Goa',
    category: 'Travel',
    read: true,
  },
  {
    id: 3,
    date: '2025-07-17',
    title: 'AI Alert: You overspent on Food last week',
    type: 'AI alert',
    group: null,
    category: 'Food',
    read: false,
  },
];

const Activity = () => {
  const [activities, setActivities] = useState(sampleActivities);
  const [filters, setFilters] = useState({
    group: '',
    type: '',
    category: '',
    unreadOnly: false,
    search: '',
  });

  const handleToggleRead = (id) => {
    setActivities((prev) =>
      prev.map((act) => (act.id === id ? { ...act, read: !act.read } : act))
    );
  };

  const filteredActivities = activities.filter((act) => {
    const matchesGroup = filters.group ? act.group === filters.group : true;
    const matchesType = filters.type ? act.type === filters.type : true;
    const matchesCategory = filters.category ? act.category === filters.category : true;
    const matchesUnread = filters.unreadOnly ? !act.read : true;
    const matchesSearch = filters.search
      ? act.title.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    return matchesGroup && matchesType && matchesCategory && matchesUnread && matchesSearch;
  });

  // Group by date
  const grouped = filteredActivities.reduce((acc, act) => {
    acc[act.date] = acc[act.date] ? [...acc[act.date], act] : [act];
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <h1 className="text-3xl font-bold mb-4">📌 Activity</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search activity..."
          className="p-2 rounded bg-gray-800 border border-gray-700"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <select
          className="p-2 rounded bg-gray-800 border border-gray-700"
          onChange={(e) => setFilters({ ...filters, group: e.target.value })}
        >
          <option value="">All Groups</option>
          <option value="Flatmates">Flatmates</option>
          <option value="Trip Goa">Trip Goa</option>
        </select>

        <select
          className="p-2 rounded bg-gray-800 border border-gray-700"
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="expense">Expense</option>
          <option value="settlement">Settlement</option>
          <option value="AI alert">AI Alert</option>
        </select>

        <select
          className="p-2 rounded bg-gray-800 border border-gray-700"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="Groceries">Groceries</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
        </select>

        <label className="flex items-center gap-2 text-sm col-span-1 md:col-span-1">
          <input
            type="checkbox"
            checked={filters.unreadOnly}
            onChange={(e) => setFilters({ ...filters, unreadOnly: e.target.checked })}
          />
          Show Unread Only
        </label>
      </div>

      {/* Activity Feed */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([date, acts]) => (
          <div key={date}>
            <h2 className="text-lg font-semibold text-gray-400 mb-2">{date}</h2>
            <div className="space-y-2">
              {acts.map((act) => (
                <div
                  key={act.id}
                  className={`p-4 rounded-lg border ${
                    act.read ? 'border-gray-700 bg-gray-900' : 'border-purple-600 bg-gray-800'
                  } transition-all duration-300`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-md font-medium">{act.title}</p>
                      <p className="text-sm text-gray-500">
                        {act.group ? `Group: ${act.group} • ` : ''}
                        Type: {act.type} • Category: {act.category}
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggleRead(act.id)}
                      className="text-xs bg-purple-700 px-2 py-1 rounded hover:bg-purple-600"
                    >
                      {act.read ? 'Mark as Unread' : 'Mark as Read'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
