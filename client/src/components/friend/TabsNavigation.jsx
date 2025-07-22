import React from "react";

const TabsNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-slate-700">
      <button
        onClick={() => setActiveTab("expenses")}
        className={`flex-1 py-3 font-medium text-sm ${
          activeTab === "expenses"
            ? "text-indigo-400 border-b-2 border-indigo-400"
            : "text-slate-400 hover:text-slate-300"
        }`}
      >
        Expenses
      </button>
      <button
        onClick={() => setActiveTab("activity")}
        className={`flex-1 py-3 font-medium text-sm ${
          activeTab === "activity"
            ? "text-indigo-400 border-b-2 border-indigo-400"
            : "text-slate-400 hover:text-slate-300"
        }`}
      >
        Activity
      </button>
      <button
        onClick={() => setActiveTab("media")}
        className={`flex-1 py-3 font-medium text-sm ${
          activeTab === "media"
            ? "text-indigo-400 border-b-2 border-indigo-400"
            : "text-slate-400 hover:text-slate-300"
        }`}
      >
        Media
      </button>
    </div>
  );
};

export default TabsNavigation;