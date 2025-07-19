import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./utils/Navbar";
import Friends from "./pages/Friends";
import Friend from "./components/friend/Friend";
import Header from "./utils/Header";
import Settings from "./pages/Settings";
import Groups from "./pages/Groups";
import Group from "./components/Group";
import Activity from "./pages/Activity";
import AddExpense from "./components/AddExpense";
import GroupList from "./components/GroupList";
import CreateGroup from "./components/CreateGroup";
import AuthPage from "./pages/AuthPage";
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900">

        {/* Header */}
        <Header userName="Bhupendra Jogi" />

        {/* Main Content */}
        <div className="flex-grow overflow-y-auto p-4 pb-30">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/friend/:friendId" element={<Friend />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/group/:groupId" element={<Group />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/group/:groupId/add-expense" element={<AddExpense />} />
            <Route path="/" element={<GroupList />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/create-group" element={<CreateGroup />} />


          </Routes>
        </div>

        {/* Bottom Navbar */}
        <Navbar />
      </div>
    </Router>
  );
};

export default App;
