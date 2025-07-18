import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from "./utils/Navbar";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-900">
        {/* Sidebar Navigation */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Uncomment these when you implement the other pages */}
            {/* <Route path="/groups" element={<Groups />} /> */}
            {/* <Route path="/friends" element={<Friends />} /> */}
            {/* <Route path="/activity" element={<Activity />} /> */}
            {/* <Route path="/settings" element={<Settings />} /> */}
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;