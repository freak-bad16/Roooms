import React from "react";
import '../index.css';

function Notifications({ isDarkMode }) {
  const notifications = [
    "You have a new message!",
    "Your order has been shipped!",
    "Reminder: Meeting at 3 PM tomorrow.",
    "Your password was changed successfully.",
    "New comment on your post.",
    "You have a new friend request.",
    "Your subscription is about to expire.",
    "Weekly report is ready to view.",
    "System update scheduled for tonight.",
    "Congratulations on reaching level 5!",
  ];

  return (
    <div className={`h-full w-full mx-auto rounded-lg shadow-md overflow-y-auto p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`border border-blue-500 rounded-lg p-3 mb-3 ${isDarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          {notification}
        </div>
      ))}
    </div>
  );
}

export default Notifications;
