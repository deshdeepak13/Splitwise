// src/pages/Friend.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// --- Mock Data (replace with API call) ---
const mockFriendDetails = {
  '1': {
    id: '1', name: 'Arjun Sharma', avatar: 'https://i.pravatar.cc/150?u=arjun',
    balance: 550, totalSpend: 2500,
    expenses: [
      { id: 'e1', desc: 'Movie Tickets', amount: 800, paidBy: 'you' },
      { id: 'e2', desc: 'Dinner', amount: 1500, paidBy: 'you' },
      { id: 'e3', desc: 'Cab Fare', amount: 250, paidBy: 'Arjun Sharma' },
    ],
    chat: [
      { id: 'c1', sender: 'Arjun Sharma', text: 'Hey, did you get the tickets?' },
      { id: 'c2', sender: 'me', text: 'Yep, all booked! I paid for them.' },
      { id: 'c3', sender: 'Arjun Sharma', text: 'Great! I will pay for dinner then.' },
    ],
  },
  '2': {
     id: '2', name: 'Priya Patel', avatar: 'https://i.pravatar.cc/150?u=priya',
     balance: -200, totalSpend: 900,
     expenses: [
        { id: 'e4', desc: 'Lunch', amount: 900, paidBy: 'Priya Patel' },
     ],
     chat: [
        { id: 'c4', sender: 'me', text: 'Lunch was great today!' },
        { id: 'c5', sender: 'Priya Patel', text: 'Totally! My treat 😊' },
     ]
  }
};


// --- Main Friend Detail Component ---
const Friend = () => {
  const { friendId } = useParams();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // In a real app: axios.get(`/api/friends/${friendId}`).then(...)
    setLoading(true);
    const data = mockFriendDetails[friendId];
    setTimeout(() => { // Simulate network delay
      if (data) {
        setFriend(data);
      }
      setLoading(false);
    }, 500);

    // Socket.io integration would go here
  }, [friendId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !friend) return;
    const message = { id: Date.now(), sender: 'me', text: newMessage };
    // For demo, update state directly. In real app: socket.emit('send_message', ...);
    setFriend(prev => ({ ...prev, chat: [...prev.chat, message] }));
    setNewMessage('');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-slate-900 text-white">Loading...</div>;
  }

  if (!friend) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
        <p>Friend not found.</p>
        <Link to="/friends" className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans">
      
      {/* Left Section (Chat - 25%) */}
      <aside className="w-1/4 bg-slate-800 flex flex-col border-r border-slate-700">
        <div className="p-4 border-b border-slate-700 flex items-center gap-3 sticky top-0 bg-slate-800 z-10">
            <Link to="/friends" className="text-blue-400 hover:text-blue-300">&larr; Back</Link>
        </div>
        <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4">
          {friend.chat.map(msg => (
            <div key={msg.id} className={`p-3 rounded-lg max-w-[85%] ${
                msg.sender === 'me'
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
          </button>
        </form>
      </aside>

      {/* Middle Section (Expenses - 50%) */}
      <main className="w-1/2 flex flex-col">
        <header className="p-6 flex items-center gap-4 border-b border-slate-700">
          <img src={friend.avatar} alt={friend.name} className="w-16 h-16 rounded-full" />
          <h2 className="text-3xl font-bold">{friend.name}</h2>
          <div className="ml-auto flex items-center gap-3">
            <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">➕ Add Expense</button>
            <button className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg transition-colors">⚙️</button>
          </div>
        </header>
        <div className="flex-grow p-6 overflow-y-auto">
          {friend.expenses.map(exp => (
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

      {/* Right Section (Summary - 25%) */}
      <aside className="w-1/4 bg-slate-800 border-l border-slate-700 p-6">
        <h3 className="text-xl font-bold mb-6">Balance Summary</h3>
        <div className="text-2xl font-light mb-6">
          {friend.balance > 0 && <p><strong className="font-semibold text-slate-100">{friend.name}</strong> owes you <strong className="font-semibold text-green-400">₹{friend.balance}</strong></p>}
          {friend.balance < 0 && <p>You owe <strong className="font-semibold text-slate-100">{friend.name}</strong> <strong className="font-semibold text-red-400">₹{Math.abs(friend.balance)}</strong></p>}
          {friend.balance === 0 && <p className="text-slate-300">You are all settled up! 🎉</p>}
        </div>
        <hr className="border-t border-slate-700" />
        <div className="flex justify-between items-center my-4 text-slate-400">
          <span>Total shared spend:</span>
          <span className="font-bold text-slate-200">₹{friend.totalSpend}</span>
        </div>
        <button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 rounded-lg mt-6 transition-colors">
          Settle Up
        </button>
      </aside>

    </div>
  );
};

export default Friend;