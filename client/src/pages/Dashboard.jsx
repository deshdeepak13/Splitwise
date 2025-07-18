import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const dummySpendingData = [
  { name: "Food", value: 400 },
  { name: "Travel", value: 300 },
  { name: "Rent", value: 500 },
  { name: "Others", value: 200 },
];

const COLORS = ["#818cf8", "#4ade80", "#facc15", "#f87171"];

const dummyActivities = [
  { text: "You added ₹500 to Goa Trip", time: "2 hrs ago" },
  { text: "Rahul settled ₹200 with you", time: "5 hrs ago" },
  { text: "You owe ₹1000 in Flatmates", time: "Yesterday" },
  { text: "AI suggested rent split", time: "2 days ago" },
  { text: "New reminder set", time: "3 days ago" },
];

const goal = {
  title: "Goa Trip",
  current: 7000,
  target: 10000,
};

const Dashboard = () => {
  const totalOwed = 1800;
  const totalYouOwe = 1200;
  const net = totalOwed - totalYouOwe;

  const reminders = [
    "Settle ₹400 in Roommates group",
    "Pay rent by 5th",
    "Split party bill with Ankit",
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Balance Summary Card */}
          <div className="bg-gradient-to-r from-indigo-700 to-purple-800 rounded-2xl shadow-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Balance Summary</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                <p className="text-sm text-gray-300">You're owed</p>
                <p className="text-2xl font-bold text-green-400">₹{totalOwed}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                <p className="text-sm text-gray-300">You owe</p>
                <p className="text-2xl font-bold text-red-400">₹{totalYouOwe}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                <p className="text-sm text-gray-300">Net Balance</p>
                <p className={`text-2xl font-bold ${net >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ₹{Math.abs(net)} {net >= 0 ? '' : '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            </div>
            <ul className="divide-y divide-gray-700">
              {dummyActivities.map((act, idx) => (
                <li key={idx} className="p-4 hover:bg-gray-750 transition-colors">
                  <div className="flex justify-between">
                    <p className="text-gray-200">{act.text}</p>
                    <span className="text-xs text-gray-400">{act.time}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 text-center border-t border-gray-700">
              <button className="text-indigo-400 text-sm font-medium hover:text-indigo-300">
                View All Activity
              </button>
            </div>
          </div>

          {/* Goal Tracker */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">
              Goal: {goal.title}
            </h2>
            <div className="mb-2 flex justify-between text-sm text-gray-400">
              <span>₹{goal.current} saved</span>
              <span>₹{goal.target} target</span>
            </div>
            <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                style={{ width: `${(goal.current / goal.target) * 100}%` }}
              ></div>
            </div>
            <p className="text-right mt-1 text-sm text-gray-400">
              {Math.round(goal.current / goal.target) * 100}% completed
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Spending Chart */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">
              Monthly Spending
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dummySpendingData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    label={({ name, percent }) => (
                      <text 
                        fill="white" 
                        fontSize={12}
                        x={0}
                        y={0}
                        textAnchor="middle"
                        dominantBaseline="central"
                      >
                        {`${name} ${(percent * 100).toFixed(0)}%`}
                      </text>
                    )}
                  >
                    {dummySpendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, 'Amount']}
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      borderRadius: '8px',
                      border: '1px solid #374151',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      color: 'white'
                    }}
                    itemStyle={{ color: 'white' }}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    wrapperStyle={{
                      color: 'white',
                      paddingLeft: '20px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-700">
            <div className="flex items-start mb-3">
              <div className="bg-indigo-900 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">AI Insight</h2>
                <p className="text-sm text-gray-300 mt-1">
                  You spent <span className="font-bold text-indigo-400">30% more on Food</span> this month than last month. Consider cutting down on dining out.
                </p>
              </div>
            </div>
            <button className="mt-3 text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center">
              Get personalized tips
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Reminders */}
          <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Reminders</h2>
            </div>
            <ul className="divide-y divide-gray-700">
              {reminders.map((r, idx) => (
                <li key={idx} className="p-4 hover:bg-gray-750 transition-colors">
                  <div className="flex items-start">
                    <div className="bg-red-900/50 p-1 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-200">{r}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 text-center border-t border-gray-700">
              <button className="text-indigo-400 text-sm font-medium hover:text-indigo-300 flex items-center justify-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Reminder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;