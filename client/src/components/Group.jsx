// src/pages/Group.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// --- Mock Data (replace with API call) ---
const mockGroupDetails = {
  g1: {
    id: 'g1',
    name: 'Goa Trip',
    avatar: 'https://i.pravatar.cc/150?u=group1',
    balance: 1200,
    totalSpend: 5800,
    members: ['You', 'Arjun', 'Priya', 'Ravi'],
    expenses: [
      { id: 'e1', desc: 'Hotel', amount: 3200, paidBy: 'You' },
      { id: 'e2', desc: 'Scooter Rent', amount: 800, paidBy: 'Arjun' },
      { id: 'e3', desc: 'Dinner', amount: 1800, paidBy: 'Priya' },
    ],
    chat: [
      { id: 'c1', sender: 'You', text: 'Booked the hotel!' },
      { id: 'c2', sender: 'Ravi', text: 'Thanks! Will transfer my share soon.' },
    ],
  },
};

const Group = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    const data = mockGroupDetails[groupId];
    setTimeout(() => {
      if (data) setGroup(data);
      setLoading(false);
    }, 500);
  }, [groupId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !group) return;
    const message = { id: Date.now(), sender: 'You', text: newMessage };
    setGroup(prev => ({ ...prev, chat: [...prev.chat, message] }));
    setNewMessage('');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-slate-900 text-white">Loading...</div>;
  }

  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
        <p>Group not found.</p>
        <Link to="/groups" className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans">

      {/* Left Section (Chat) */}
      <aside className="w-1/4 bg-slate-800 flex flex-col border-r border-slate-700">
        <div className="p-4 border-b border-slate-700 flex items-center gap-3 sticky top-0 bg-slate-800 z-10">
          <Link to="/groups" className="text-blue-400 hover:text-blue-300">&larr; Back</Link>
        </div>
        <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4">
          {group.chat.map(msg => (
            <div key={msg.id} className={`p-3 rounded-lg max-w-[85%] ${
              msg.sender === 'You'
                ? 'bg-blue-600 text-white self-end rounded-br-none'
                : 'bg-slate-600 text-slate-200 self-start rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-700 flex items-center gap-2 sticky bottom-0 bg-slate-800">
          <input 
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-slate-700 rounded-full py-2 px-4 focus:outline-none text-slate-200"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 rounded-full p-2 text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.52 60.52 0 0018.445-8.986.75.75 0 000-1.218A60.52 60.52 0 003.478 2.405z" /></svg>
          </button>
        </form>
      </aside>

      {/* Center Section (Expenses) */}
      <main className="w-1/2 flex flex-col">
        <header className="p-6 flex items-center gap-4 border-b border-slate-700">
          <img src={group.avatar} alt={group.name} className="w-16 h-16 rounded-full" />
          <h2 className="text-3xl font-bold">{group.name}</h2>
          <div className="ml-auto flex items-center gap-3">
            <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">➕ Add Expense</button>
            <button className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg transition-colors">⚙️</button>
          </div>
        </header>
        <div className="flex-grow p-6 overflow-y-auto">
          {group.expenses.map(exp => (
            <div key={exp.id} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center mb-3">
              <span className="font-semibold">{exp.desc}</span>
              <div className="text-right">
                <span className="text-lg font-bold">₹{exp.amount}</span>
                <span className="text-sm text-slate-400 block">Paid by {exp.paidBy}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Section (Summary) */}
      <aside className="w-1/4 bg-slate-800 border-l border-slate-700 p-6">
        <h3 className="text-xl font-bold mb-6">Group Balance</h3>
        <div className="text-2xl font-light mb-6">
          {group.balance > 0 && <p><strong className="text-slate-100">Group</strong> owes you <strong className="text-green-400">₹{group.balance}</strong></p>}
          {group.balance < 0 && <p>You owe <strong className="text-slate-100">Group</strong> <strong className="text-red-400">₹{Math.abs(group.balance)}</strong></p>}
          {group.balance === 0 && <p className="text-slate-300">Group is all settled up 🎉</p>}
        </div>
        <hr className="border-t border-slate-700" />
        <div className="mt-4 text-slate-400">
          <p className="mb-2">Members:</p>
          <ul className="list-disc ml-6 text-slate-300">
            {group.members.map((member, idx) => <li key={idx}>{member}</li>)}
          </ul>
        </div>
        <div className="flex justify-between items-center my-4 text-slate-400">
          <span>Total spend:</span>
          <span className="font-bold text-slate-200">₹{group.totalSpend}</span>
        </div>
        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 rounded-lg mt-6 transition-colors">
          Settle Up
        </button>
      </aside>
    </div>
  );
};

export default Group;
