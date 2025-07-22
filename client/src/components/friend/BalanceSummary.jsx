import React from "react";

const BalanceSummary = ({ friend }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700/50 mb-6 ">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-indigo-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path
            fillRule="evenodd"
            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
            clipRule="evenodd"
          />
        </svg>
        Balance Summary
      </h3>

      <div className="text-center mb-4">
        <p className="text-sm text-slate-400">Current Balance</p>
        <p
          className={`text-3xl font-bold ${
            friend.balance.otherBalance > 0
              ? "text-green-400"
              : friend.balance.otherBalance < 0
              ? "text-red-400"
              : "text-slate-300"
          }`}
        >
          {friend.balance.otherBalance > 0 ? "+ " : ""}
           ₹{friend.balance.otherBalance}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Total shared</span>
          <span className="font-medium">₹{friend.totalSpend}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Expenses together</span>
          <span className="font-medium">{friend.expenses?.length}</span>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 rounded-lg transition-all transform hover:scale-[1.02] mt-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        Settle Up
      </button>
    </div>
  );
};

export default BalanceSummary;