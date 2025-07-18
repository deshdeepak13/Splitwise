import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Groups", path: "/groups" },
    { name: "Friends", path: "/friends" },
    { name: "Activity", path: "/activity" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t flex justify-around py-2 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive || location.pathname === item.path
                ? "text-indigo-600 font-semibold"
                : "text-gray-500"
            }`
          }
        >
          <span>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
