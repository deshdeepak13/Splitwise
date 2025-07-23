import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
  ClockIcon,
  CogIcon,
  PlusIcon, // For the main speed dial button
  XMarkIcon // For closing the speed dial
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const location = useLocation();
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const navItems = [
    { name: "Groups", path: "/groups", icon: UserGroupIcon },
    { name: "Friends", path: "/friends", icon: UsersIcon },
    { name: "Dashboard", path: "/", icon: HomeIcon },
    { name: "Activity", path: "/activity", icon: ClockIcon },
    { name: "Settings", path: "/settings", icon: CogIcon },
  ];

  useEffect(() => {
    const isOnNavItemPath = navItems.some(item => item.path === location.pathname);
    if (isOnNavItemPath !== !isNavbarCollapsed) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsNavbarCollapsed(!isOnNavItemPath);
        setIsAnimating(false);
      }, 300); // Match this duration with your CSS transition
      return () => clearTimeout(timer);
    }
  }, [location.pathname, navItems]);

  const toggleSpeedDial = () => {
    setIsSpeedDialOpen(!isSpeedDialOpen);
  };

  // Main navbar (expanded state)
  if (!isNavbarCollapsed && !isAnimating) {
    return (
      <nav className="fixed bottom-4 left-0 right-0 px-4 z-40">
        <div className="bg-gray-800/95 backdrop-blur-lg rounded-full shadow-2xl border border-gray-700 flex justify-around items-center p-1.5 transition-all duration-300 ease-in-out">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center flex-1"
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
  }

  // Speed dial (collapsed state)
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Speed Dial Menu Items - appear around the main button */}
      {isSpeedDialOpen && (
        <div className="absolute bottom-16 right-0 mb-4 flex flex-col items-center space-y-3">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <div 
                key={item.path}
                className="transition-all duration-300 ease-in-out"
                style={{
                  transform: isSpeedDialOpen ? 'translateY(0)' : `translateY(${20 * (navItems.length - index)}px)`,
                  opacity: isSpeedDialOpen ? 1 : 0,
                }}
              >
                <NavLink
                  to={item.path}
                  className={`flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-200 ease-in-out
                    ${isActive ? "bg-indigo-600/90 text-white" : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"}
                  `}
                  onClick={() => setIsSpeedDialOpen(false)}
                >
                  <Icon className="w-6 h-6" />
                  <span className="sr-only">{item.name}</span>
                </NavLink>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Speed Dial Button */}
      <button
        onClick={toggleSpeedDial}
        className={`bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-00 ease-in-out 
          ${isSpeedDialOpen ? 'rotate-90 bg-red-600 hover:bg-red-700' : ''}
        `}
        aria-label={isSpeedDialOpen ? "Close menu" : "Open menu"}
      >
        {isSpeedDialOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <PlusIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default Navbar;