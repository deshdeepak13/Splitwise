import React, { useState } from 'react';

const Settings = () => {
  const [currency, setCurrency] = useState('INR');
  const [notifications, setNotifications] = useState({
    email: true,
    telegram: false,
    whatsapp: true,
  });
  const [botReminders, setBotReminders] = useState(true);

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      // Delete account logic here
      alert('Account deleted!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

      {/* Currency Preferences */}
      <div className="bg-gray-700/50 p-4 rounded-lg">
        <h2 className="font-semibold text-gray-300 mb-3">Currency Preferences</h2>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="p-2.5 bg-gray-700 border border-gray-600 rounded-lg w-full text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="INR" className="bg-gray-700">INR - ₹</option>
          <option value="USD" className="bg-gray-700">USD - $</option>
          <option value="EUR" className="bg-gray-700">EUR - €</option>
          <option value="GBP" className="bg-gray-700">GBP - £</option>
        </select>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-700/50 p-4 rounded-lg">
        <h2 className="font-semibold text-gray-300 mb-3">Notification Settings</h2>
        <div className="space-y-3">
          {['email', 'telegram', 'whatsapp'].map((platform) => (
            <label key={platform} className="flex items-center gap-3">
              <div className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[platform]}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      [platform]: !notifications[platform],
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </div>
              <span className="text-gray-200">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Bot Reminder Settings */}
      <div className="bg-gray-700/50 p-4 rounded-lg">
        <h2 className="font-semibold text-gray-300 mb-3">Bot Reminder Settings</h2>
        <label className="flex items-center gap-3">
          <div className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={botReminders}
              onChange={() => setBotReminders(!botReminders)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </div>
          <span className="text-gray-200">Enable Bot Reminders</span>
        </label>
      </div>

      {/* PWA Install Prompt */}
      <div className="bg-gray-700/50 p-4 rounded-lg">
        <h2 className="font-semibold text-gray-300 mb-3">PWA Install</h2>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2"
          onClick={() => alert('PWA install prompt logic here')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
          </svg>
          Install App
        </button>
      </div>

      {/* Data Export */}
      <div className="bg-gray-700/50 p-4 rounded-lg">
        <h2 className="font-semibold text-gray-300 mb-3">Export Data</h2>
        <div className="flex gap-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export CSV
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border-t border-gray-700 pt-4">
        <h2 className="font-semibold text-red-400 mb-3">Danger Zone</h2>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2"
          onClick={handleDeleteAccount}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;