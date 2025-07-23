import React from "react";
import { Link } from "react-router-dom";

const FriendHeader = ({ friend, onAddExpenseClick }) => {
  // console.log("l")
  // console.log(friend)
  return (
    <div className="p-6 flex items-center gap-4 border-b border-slate-700 sticky top-0 bg-slate-800/80 backdrop-blur-sm z-10">
      <img
        src={friend.profilePic || null}
        alt={friend.name}
        className="w-14 h-14 rounded-full border-2 border-indigo-500/50"
      />
      <div>
        <h2 className="text-2xl font-bold">{friend.name}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              friend.balance.otherBalance > 0
                ? "bg-green-900/50 text-green-300"
                : friend.balance.otherBalance < 0
                ? "bg-red-900/50 text-red-300"
                : "bg-slate-700 text-slate-300"
            }`}
          >
            {friend.balance.otherBalance > 0
              ? "Owes you"
              : friend.balance.otherBalance < 0
              ? "You owe"
              : "Settled up"}
            {friend.balance.otherBalance !== 0 && ` ₹${Math.abs(friend.balance.otherBalance)}`}
          </span>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={onAddExpenseClick}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Expense
        </button>
        <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FriendHeader;