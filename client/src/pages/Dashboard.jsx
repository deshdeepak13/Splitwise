import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const dummySpendingData = [
  { name: "Food", value: 400, icon: "🍔" },
  { name: "Travel", value: 300, icon: "✈️" },
  { name: "Rent", value: 500, icon: "🏠" },
  { name: "Others", value: 200, icon: "🛍️" },
];

const COLORS = ["#818cf8", "#4ade80", "#facc15", "#f87171"];

const dummyActivities = [
  { text: "You added ₹500 to Goa Trip", time: "2 hrs ago", icon: "💰" },
  { text: "Rahul settled ₹200 with you", time: "5 hrs ago", icon: "✅" },
  { text: "You owe ₹1000 in Flatmates", time: "Yesterday", icon: "⚠️" },
  { text: "AI suggested rent split", time: "2 days ago", icon: "🤖" },
  { text: "New reminder set", time: "3 days ago", icon: "⏰" },
];

const goal = {
  title: "Goa Trip",
  current: 7000,
  target: 10000,
  emoji: "🏝️"
};

const Dashboard = () => {
  const totalOwed = 1800;
  const totalYouOwe = 1200;
  const net = totalOwed - totalYouOwe;

  const reminders = [
    { text: "Settle ₹400 in Roommates group", due: "Today" },
    { text: "Pay rent by 5th", due: "3 days left" },
    { text: "Split party bill with Ankit", due: "Overdue" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 p-4 md:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Balance Summary Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-600/90 to-purple-700/90 rounded-3xl shadow-2xl p-6 text-white backdrop-blur-sm border border-indigo-500/20"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-white/10 p-2 rounded-lg">
                💰
              </span>
              Balance Summary
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "You're owed", value: totalOwed, color: "text-green-400", emoji: "↑" },
                { label: "You owe", value: totalYouOwe, color: "text-red-400", emoji: "↓" },
                { label: "Net Balance", value: Math.abs(net), color: net >= 0 ? "text-green-400" : "text-red-400", emoji: net >= 0 ? "👍" : "👎" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                >
                  <p className="text-sm text-gray-300 flex items-center gap-1">
                    {item.emoji} {item.label}
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${item.color}`}>
                    ₹{item.value} {index === 2 && (net >= 0 ? '' : '-')}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800/80 rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm"
          >
            <div className="p-6 border-b border-gray-700/50">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="bg-indigo-600/20 p-2 rounded-lg">
                  📝
                </span>
                Recent Activity
              </h2>
            </div>
            <ul className="divide-y divide-gray-700/50">
              {dummyActivities.map((act, idx) => (
                <motion.li 
                  key={idx}
                  whileHover={{ x: 5 }}
                  className="p-4 hover:bg-gray-700/30 transition-colors flex items-start gap-3"
                >
                  <span className="text-xl mt-0.5">{act.icon}</span>
                  <div className="flex-1">
                    <p className="text-gray-200">{act.text}</p>
                    <span className="text-xs text-gray-400">{act.time}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="p-4 text-center border-t border-gray-700/50">
              <button className="text-indigo-400 text-sm font-medium hover:text-indigo-300 flex items-center justify-center w-full gap-1">
                View All Activity
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Goal Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/80 rounded-3xl shadow-2xl p-6 border border-gray-700/50 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-blue-600/20 p-2 rounded-lg">
                {goal.emoji}
              </span>
              Goal: {goal.title}
            </h2>
            <div className="mb-3 flex justify-between text-sm text-gray-400">
              <span>₹{goal.current} saved</span>
              <span>₹{goal.target} target</span>
            </div>
            <div className="w-full bg-gray-700/50 h-3 rounded-full overflow-hidden mb-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bg-gradient-to-r from-blue-400 to-indigo-500 h-full rounded-full"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {Math.round((goal.current / goal.target) * 100)}% completed
              </span>
              <button className="text-xs bg-blue-600/50 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition-colors">
                Contribute
              </button>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Spending Chart */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}
  className="bg-gray-800/80 rounded-3xl shadow-2xl p-6 border border-gray-700/50 backdrop-blur-sm"
>
  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
    <span className="bg-green-600/20 p-2 rounded-lg">
      📊
    </span>
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
          label={({ name, percent, index }) => (
            <text 
              fill="white" 
              fontSize={12}
              x={0}
              y={0}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {`${dummySpendingData[index].icon} ${(percent * 100).toFixed(0)}%`}
            </text>
          )}
        >
          {dummySpendingData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]} 
            />
          ))}
        </Pie>
        <Tooltip 
          content={({ active, payload }) => {
            if (!active || !payload || !payload.length) return null;
            
            const data = payload[0].payload;
            const index = dummySpendingData.findIndex(item => item.name === data.name);
            const icon = index >= 0 ? dummySpendingData[index].icon : '';
            
            return (
              <div className="bg-gray-800/90 backdrop-blur-sm p-3 rounded-lg border border-gray-700 shadow-lg">
                <p className="font-medium text-white">
                  {icon} {data.name}
                </p>
                <p className="text-gray-300">
                  Amount: <span className="text-white">₹{data.value}</span>
                </p>
                <p className="text-gray-300">
                  Percentage: <span className="text-white">
                    {((data.value / dummySpendingData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0)}%
                  </span>
                </p>
              </div>
            );
          }}
        />
        <Legend 
          layout="vertical" 
          verticalAlign="middle" 
          align="right"
          wrapperStyle={{
            color: 'white',
            paddingLeft: '20px'
          }}
          formatter={(value, entry, index) => (
            <span className="text-gray-300">
              {dummySpendingData[index].icon} {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
</motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-3xl shadow-2xl p-6 border border-indigo-500/20 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <div className="bg-indigo-600/20 p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">AI Insight</h2>
                <p className="text-sm text-gray-300">
                  You spent <span className="font-bold text-indigo-300">30% more on Food</span> this month than last month. Consider cutting down on dining out.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 text-sm font-medium bg-indigo-600/50 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  Get personalized tips
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Reminders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-800/80 rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm"
          >
            <div className="p-6 border-b border-gray-700/50">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="bg-red-600/20 p-2 rounded-lg">
                  ⏰
                </span>
                Reminders
              </h2>
            </div>
            <ul className="divide-y divide-gray-700/50">
              {reminders.map((r, idx) => (
                <motion.li 
                  key={idx}
                  whileHover={{ x: 5 }}
                  className="p-4 hover:bg-gray-700/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded-full ${
                      r.due === "Overdue" ? "bg-red-600/20" : 
                      r.due === "Today" ? "bg-amber-600/20" : "bg-blue-600/20"
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${
                        r.due === "Overdue" ? "text-red-400" : 
                        r.due === "Today" ? "text-amber-400" : "text-blue-400"
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-200">{r.text}</p>
                      <span className={`text-xs ${
                        r.due === "Overdue" ? "text-red-400" : 
                        r.due === "Today" ? "text-amber-400" : "text-blue-400"
                      }`}>
                        {r.due}
                      </span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="p-4 text-center border-t border-gray-700/50">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-indigo-400 text-sm font-medium hover:text-indigo-300 flex items-center justify-center w-full gap-2 bg-indigo-600/10 hover:bg-indigo-600/20 py-2 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Reminder
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;