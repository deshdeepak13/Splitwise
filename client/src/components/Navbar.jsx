import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
  ClockIcon,
  CogIcon 
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Groups", path: "/groups", icon: UserGroupIcon },
    { name: "Friends", path: "/friends", icon: UsersIcon },
    { name: "Dashboard", path: "/", icon: HomeIcon },
    { name: "Activity", path: "/activity", icon: ClockIcon },
    { name: "Settings", path: "/settings", icon: CogIcon },
  ];

  return (
    <nav className="fixed bottom-4 left-0 right-0 px-4 z-50">
      <div className="bg-gray-800/95 backdrop-blur-lg rounded-full shadow-2xl border border-gray-700 flex justify-around items-center p-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center"
            >
              <div className={`
                flex flex-col items-center p-2 rounded-full 
                transition-all duration-300 ease-in-out
                ${isActive ? 
                  "bg-indigo-600/90 text-white scale-110" : 
                  "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span className={`text-xs mt-1 ${isActive ? "font-medium" : "font-normal"}`}>
                  {item.name}
                </span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;