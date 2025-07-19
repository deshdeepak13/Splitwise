import React from 'react';

// Utility function to get initials from name
const getInitials = (name) => {
  const names = name.trim().split(' ');
  if (names.length === 1) return names[0][0].toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const Header = ({ userName = "John Doe" }) => {
  const initials = getInitials(userName);

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-gray-800 shadow-lg sticky top-0 z-50 border-b border-gray-700">
      
      {/* Left Section: Logo + App Name */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.png" 
          alt="App Logo"
          className="w-10 h-10 object-cover"
        />
        <h1 className="text-xl font-bold text-emerald-300">SplitPe</h1>
      </div>

      {/* Right Section: User Name + Avatar */}
      <div className="flex items-center gap-4">
        <span className="font-medium text-gray-300">{userName}</span>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
          {initials}
        </div>
      </div>
    </header>
  );
};

export default Header;