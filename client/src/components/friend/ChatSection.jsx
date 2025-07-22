import React, { useState } from "react";
import { Link } from "react-router-dom";

const ChatSection = ({ friend }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // No need for friend check here as it's passed as prop
    const message = {
      id: Date.now(),
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    // In a real application, you'd send this message to a backend.
    // For now, we'll just log it or update a local chat state if needed.
    // For this example, we assume `friend.chat` is a direct reflection of
    // what's fetched from the backend, so we won't directly update it here
    // as it's meant to be read-only in this component.
    // If you need to update chat in real-time, you'd lift the chat state
    // to FriendPage and pass a `onSendMessage` prop.
    console.log("Sending message:", message);
    setNewMessage("");
  };

  return (
    <div className="w-full md:w-1/4 bg-slate-800/70 border-r border-slate-700 flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-700 flex items-center gap-3 sticky top-0 bg-slate-800/80 backdrop-blur-sm z-10">
        <Link
          to="/friends"
          className="p-2 rounded-full hover:bg-slate-700 transition-colors text-blue-400 hover:text-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <div className="flex items-center gap-2">
          <img
            src={friend.profilePic}
            alt={friend.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{friend.name}</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto space-y-3">
        {friend?.chat?.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.sender === "me"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-slate-700 text-slate-200 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === "me" ? "text-indigo-200" : "text-slate-400"
                }`}
              >
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatSection;