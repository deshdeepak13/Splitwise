import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
jshchldsksnjnkl
const dummySpendingData = [
  { name: "Food", value: 400 },
  { name: "Travel", value: 300 },
  { name: "Rent", value: 500 },
  { name: "Others", value: 200 },
];

const COLORS = ["#6366f1", "#22c55e", "#facc15", "#f87171"];

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-6">
        {/* Balance Summary */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-2">Total Balance Summary</h2>
          <div className="flex justify-between text-sm">
            <div className="text-green-600">You are owed: ₹{totalOwed}</div>
            <div className="text-red-600">You owe: ₹{totalYouOwe}</div>
            <div className="font-bold">Net: ₹{net}</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <ul className="text-sm space-y-2">
            {dummyActivities.map((act, idx) => (
              <li key={idx} className="border-b pb-1">
                <span className="block">{act.text}</span>
                <span className="text-xs text-gray-400">{act.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Goal Tracker */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-2">
            Goal: {goal.title}
          </h2>
          <div className="w-full bg-gray-200 h-4 rounded-full">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${(goal.current / goal.target) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs mt-1">
            ₹{goal.current} of ₹{goal.target} saved
          </p>
        </div>

        {/* AI Insights */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-2">AI Insight</h2>
          <p className="text-sm text-gray-700">
            You spent <strong>30% more on Food</strong> this month than last
            month. Consider cutting down on dining out.
          </p>
        </div>

        {/* Reminders */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-2">Upcoming Reminders</h2>
          <ul className="text-sm list-disc ml-5 text-gray-700">
            {reminders.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Spending Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dummySpendingData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {dummySpendingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
