import React from 'react';
import 'remixicon/fonts/remixicon.css';
import '../index.css';

function Settings({ handlePanelSwitch }) {
  return (
    <div className="chat-container flex flex-col p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg h-full">
      {/* Header with Back Button and Title */}
      <div className="flex items-center justify-between text-2xl mb-4">
        <i
          onClick={() => {
            handlePanelSwitch("fyp"); // Switch to FYP panel
          }}
          className="ri-arrow-left-long-line mb-1 cursor-pointer text-gray-600 dark:text-gray-300"
        ></i>
        <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-300">
          Settings
        </h3>
        <i className="ri-arrow-left-long-line opacity-0"></i>
      </div>

      {/* Features Section */}
      <div className="flex justify-center items-center flex-grow text-xl text-gray-600 dark:text-gray-300">
        <div className="text-center">
          {/* Developer working message */}
          <p className="mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            Developer is working hard on this website!
          </p>
          <p className="mb-8 text-lg text-gray-500 dark:text-gray-200">
            Features available so far:
          </p>

          {/* Numbered Features List */}
          <ol className="list-decimal list-inside text-left mb-6">
            <li className="mb-2 text-lg">You can create and log in to your account with proper authentication.</li>
            <li className="mb-2 text-lg">You can edit your profile and add a description, about info, and more.</li>
            <li className="mb-2 text-lg">You can chat with other users.</li>
            <li className="mb-2 text-lg">You can create a room that will be visible to other users (only public rooms available now).</li>
            <li className="mb-2 text-lg">You can view full details of any room by clicking the "Details" option.</li>
            <li className="mb-2 text-lg">You can edit and delete rooms (anyone can perform these actions currently).</li>
            <li className="mb-2 text-lg">You can view your own created rooms under the "My Room" section.</li>
            <li className="mb-2 text-lg">We also have a feedback page where you can give feedback and help us improve!</li>
          </ol>

          {/* Exciting Future Updates */}
          <p className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">
            Currently working on: <br />
            - Collaboration options for real-time teamwork <br />
            - Notifications for updates and messages <br />
            - Updating the UI to make it more exciting and user-friendly
          </p>

          <p className="text-lg text-gray-500 dark:text-gray-200 italic">
            Stay tuned for the next update! We're making everything as amazing as possible. 😊
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-200 italic">
          Will be available for public use with MVP by February!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
