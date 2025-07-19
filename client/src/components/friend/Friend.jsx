import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock Data
const mockFriendDetails = {
  '1': {
    id: '1', 
    name: 'Arjun Sharma', 
    avatar: 'https://i.pravatar.cc/150?u=arjun',
    balance: 550, 
    totalSpend: 2500,
    expenses: [
      { id: 'e1', desc: 'Movie Tickets', amount: 800, paidBy: 'you', date: '2023-06-15' },
      { id: 'e2', desc: 'Dinner at Olive', amount: 1500, paidBy: 'you', date: '2023-06-10' },
      { id: 'e3', desc: 'Cab Fare', amount: 250, paidBy: 'Arjun Sharma', date: '2023-06-05' },
    ],
    chat: [
      { id: 'c1', sender: 'Arjun Sharma', text: 'Hey, did you get the tickets?', time: '10:30 AM' },
      { id: 'c2', sender: 'me', text: 'Yep, all booked! I paid ₹800 for them.', time: '10:32 AM' },
      { id: 'c3', sender: 'Arjun Sharma', text: 'Great! I will pay for dinner then.', time: '10:35 AM' },
    ],
  },
  '2': {
    id: '2', 
    name: 'Priya Patel', 
    avatar: 'https://i.pravatar.cc/150?u=priya',
    balance: -200, 
    totalSpend: 900,
    expenses: [
      { id: 'e4', desc: 'Lunch at Cafe', amount: 900, paidBy: 'Priya Patel', date: '2023-06-18' },
    ],
    chat: [
      { id: 'c4', sender: 'me', text: 'Lunch was great today!', time: '1:15 PM' },
      { id: 'c5', sender: 'Priya Patel', text: 'Totally! My treat 😊', time: '1:16 PM' },
    ]
  }
};

const Friend = () => {
  const { friendId } = useParams();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('expenses');

  useEffect(() => {
    setLoading(true);
    const data = mockFriendDetails[friendId];
    setTimeout(() => {
      if (data) setFriend(data);
      setLoading(false);
    }, 500);
  }, [friendId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !friend) return;
    const message = { 
      id: Date.now(), 
      sender: 'me', 
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setFriend(prev => ({ ...prev, chat: [...prev.chat, message] }));
    setNewMessage('');
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
      <div className="w-full md:w-1/4 bg-slate-800/70 border-r border-slate-700 flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-700 flex items-center gap-3 sticky top-0 bg-slate-800/80 backdrop-blur-sm z-10">
          <Link 
            to="/friends" 
            className="p-2 rounded-full hover:bg-slate-700 transition-colors text-blue-400 hover:text-blue-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <div className="flex items-center gap-2">
            <img src={friend.avatar} alt={friend.name} className="w-8 h-8 rounded-full" />
            <span className="font-medium">{friend.name}</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow p-4 overflow-y-auto space-y-3">
          {friend.chat.map(msg => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.sender === 'me'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-slate-700 text-slate-200 rounded-bl-none'
              }`}>
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form 
          onSubmit={handleSendMessage} 
          className="p-3 border-t border-slate-700 sticky bottom-0 bg-slate-800/80 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <input 
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow bg-slate-700/80 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-200 placeholder-slate-400"
            />
            <button 
              type="submit" 
              className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white transition-colors"
              disabled={!newMessage.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Middle Section - Main Content (50%) */}
      <div className="w-full md:w-1/2 flex flex-col border-r border-slate-700">
        {/* Profile Header */}
        <div className="p-6 flex items-center gap-4 border-b border-slate-700 sticky top-0 bg-slate-800/80 backdrop-blur-sm z-10">
          <img 
            src={friend.avatar} 
            alt={friend.name} 
            className="w-14 h-14 rounded-full border-2 border-indigo-500/50"
          />
          <div>
            <h2 className="text-2xl font-bold">{friend.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 text-xs rounded-full ${
                friend.balance > 0 ? 'bg-green-900/50 text-green-300' : 
                friend.balance < 0 ? 'bg-red-900/50 text-red-300' : 
                'bg-slate-700 text-slate-300'
              }`}>
                {friend.balance > 0 ? 'Owes you' : friend.balance < 0 ? 'You owe' : 'Settled up'} 
                {friend.balance !== 0 && ` ₹${Math.abs(friend.balance)}`}
              </span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Expense
            </button>
            <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('expenses')}
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'expenses' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-slate-300'}`}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'activity' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-slate-300'}`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'media' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-slate-300'}`}
          >
            Media
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-grow overflow-y-auto">
          {activeTab === 'expenses' && (
            <div className="p-4 space-y-3">
              {friend.expenses.map(exp => (
                <div 
                  key={exp.id} 
                  className="bg-slate-800/50 hover:bg-slate-800 p-4 rounded-xl border border-slate-700/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{exp.desc}</h3>
                      <p className="text-sm text-slate-400 mt-1">{new Date(exp.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-bold ${
                        exp.paidBy === 'you' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        ₹{exp.amount}
                      </span>
                      <p className="text-xs text-slate-500 mt-1">
                        Paid by {exp.paidBy === 'you' ? 'you' : friend.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'activity' && (
            <div className="p-4 text-center text-slate-400">
              <p>Activity history will appear here</p>
            </div>
          )}
          {activeTab === 'media' && (
            <div className="p-4 text-center text-slate-400">
              <p>Shared media will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Summary (25%) */}
      <div className="w-full md:w-1/4 bg-slate-800/70 p-6 overflow-y-auto">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          Balance Summary
        </h3>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700/50 mb-6">
          <div className="text-center mb-4">
            <p className="text-sm text-slate-400">Current Balance</p>
            <p className={`text-3xl font-bold ${
              friend.balance > 0 ? 'text-green-400' : 
              friend.balance < 0 ? 'text-red-400' : 
              'text-slate-300'
            }`}>
              {friend.balance > 0 ? '+' : ''}{friend.balance} ₹
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total shared</span>
              <span className="font-medium">₹{friend.totalSpend}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Expenses together</span>
              <span className="font-medium">{friend.expenses.length}</span>
            </div>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 rounded-lg transition-all transform hover:scale-[1.02]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Settle Up
        </button>

        <div className="mt-8">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            AI Insights
          </h4>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <p className="text-sm text-slate-300 mb-2">
              💡 {friend.name} usually settles within {friend.balance > 0 ? '2 weeks' : '1 week'}
            </p>
            <p className="text-sm text-slate-300">
              💡 Consider adding a reminder for large amounts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friend;