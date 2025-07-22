import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AddExpenseModal from "../shared/AddExpenseModal";
import FriendHeader from "./FriendHeader";
import ChatSection from "./ChatSection";
import TabsNavigation from "./TabsNavigation";
import ExpensesTab from "./ExpensesTab";
import ActivityTab from "./ActivityTab";
import MediaTab from "./MediaTab";
import BalanceSummary from "./BalanceSummary";
import AiInsights from "./AiInsights";

const Friend = () => {
  const { friendshipId } = useParams();
  const [friend, setFriend] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("expenses");
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  // const [balance, setBalance] = useState(balance);


  const { token, user } = useSelector((state) => state.auth);
  const decodedToken = jwtDecode(token);

  const fetchFriendAndExpenses = async () => {
    setLoading(true);
    try {
      const friendRes = await axios.get(
        `http://localhost:3000/api/friends/friend/${friendshipId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFriend(friendRes.data);
      // console.log(friendRes.data);

      const friendId = friendRes.data.friendId;
      const expensesRes = await axios.get(
        `http://localhost:3000/api/expenses/friend/${decodedToken.id}/${friendId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExpenses(expensesRes.data);
      // console.log("Ex:", expensesRes.data);
    } catch (err) {
      console.error(err);
      setFriend(null);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriendAndExpenses();
  }, [friendshipId, token, decodedToken.id]);

  const handleExpenseAdded = () => {
    setIsAddExpenseModalOpen(false); // Close the modal
    fetchFriendAndExpenses(); // Re-fetch all data to ensure consistency
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-slate-700 mb-4"></div>
          <div className="h-6 w-40 bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="text-center p-8 bg-slate-800/80 rounded-xl backdrop-blur-sm border border-slate-700">
          <h1 className="text-2xl font-bold mb-4">Friend not found</h1>
          <Link
            to="/friends"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors"
          >
            ← Back to Friends
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-200 font-sans overflow-hidden">
      {/* Left Section - Chat (25%) */}
      <ChatSection friend={friend} />

      {/* Middle Section - Main Content (50%) */}
      <div className="w-full md:w-1/2 flex flex-col border-r border-slate-700 overflow-y-auto scrollbar-hide">
        <FriendHeader
          friend={friend}
          onAddExpenseClick={() => setIsAddExpenseModalOpen(true)}
        />
        <TabsNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="flex-grow overflow-y-auto overflow-y-auto scrollbar-hide">
          {activeTab === "expenses" && (
            <ExpensesTab expenses={expenses} currentUserId={user.id} />
          )}
          {activeTab === "activity" && <ActivityTab />}
          {activeTab === "media" && <MediaTab />}
        </div>
      </div>

      {/* Right Section - Summary (25%) */}
      <div className="w-full md:w-1/4 bg-slate-800/70 p-6 overflow-y-auto">
        <BalanceSummary friend={friend} />
        <AiInsights friend={friend} />
      </div>

      {/* Add Expense Modal */}
      {isAddExpenseModalOpen && (
        <AddExpenseModal
          isOpen={isAddExpenseModalOpen}
          onClose={() => setIsAddExpenseModalOpen(false)}
          onExpenseAdded={handleExpenseAdded}
          friend={friend}
          currentUserId={decodedToken.id}
          token={token}
        />
      )}
    </div>
  );
};

export default Friend;