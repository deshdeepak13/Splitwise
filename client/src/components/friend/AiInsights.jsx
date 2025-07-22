import React from "react";

const AiInsights = ({ friend }) => {
  return (
    <div className="mt-8">
      <h4 className="font-bold mb-3 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-amber-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        AI Insights
      </h4>
      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
        <p className="text-sm text-slate-300 mb-2">
          💡 {friend.name} usually settles within{" "}
          {friend.balance > 0 ? "2 weeks" : "1 week"}
        </p>
        <p className="text-sm text-slate-300">
          💡 Consider adding a reminder for large amounts
        </p>
      </div>
    </div>
  );
};

export default AiInsights;