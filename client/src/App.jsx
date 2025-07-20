import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

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
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const { token } = useSelector((state) => state.auth); // 🔐 check login status

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900">
        {/* Show Header and Navbar only if logged in */}
        {token && <Header />}
        <div className="flex-grow overflow-y-auto p-4 pb-30">
          <Routes>
            {/* Public route */}
            <Route path="/auth" element={<AuthPage />} />

            {/* Private routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/friends"
              element={
                <PrivateRoute>
                  <Friends />
                </PrivateRoute>
              }
            />
            <Route
              path="/friend/:friendId"
              element={
                <PrivateRoute>
                  <Friend />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/groups"
              element={
                <PrivateRoute>
                  <Groups />
                </PrivateRoute>
              }
            />
            <Route
              path="/group/:groupId"
              element={
                <PrivateRoute>
                  <Group />
                </PrivateRoute>
              }
            />
            <Route
              path="/activity"
              element={
                <PrivateRoute>
                  <Activity />
                </PrivateRoute>
              }
            />
            <Route
              path="/group/:groupId/add-expense"
              element={
                <PrivateRoute>
                  <AddExpense />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-group"
              element={
                <PrivateRoute>
                  <CreateGroup />
                </PrivateRoute>
              }
            />
            <Route
              path="/grouplist"
              element={
                <PrivateRoute>
                  <GroupList />
                </PrivateRoute>
              }
            />

            {/* Fallback: redirect to / if path not found */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        {token && <Navbar />}
      </div>
    </Router>
  );
};

export default App;
