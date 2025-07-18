import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
// import Groups from './pages/Groups';
// import Friends from './pages/Friends';
// import Activity from './pages/Activity';
// import Settings from './pages/Settings';
// import Profile from './pages/Profile';
import Navbar from  "./utils/Navbar";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar Navigation */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Routes>
            {/* <Route path="/" element={<Navigate to="/" />} /> */}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
