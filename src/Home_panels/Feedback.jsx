import React from 'react';
import 'remixicon/fonts/remixicon.css';
import '../index.css';

function Feedback({ handlePanelSwitch }) {
  return (
    <div className="chat-container flex flex-col p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg h-full">
      {/* Header with Back Button and Title */}
      <div className="flex items-center justify-between text-2xl">
        <i
          onClick={() => {
            handlePanelSwitch("fyp"); // Switch to FYP panel
          }}
          className="ri-arrow-left-long-line mb-1 cursor-pointer"
        ></i>
        <h3 className="text-2xl -mt-4 -mb-1 ml-1 font-bold text-gray-500">
          Feedback 
        </h3>
        <i className="ri-arrow-left-long-line opacity-0"></i>
      </div>
      
      {/* Centered Message */}
      <div className="flex justify-center items-center flex-grow text-xl text-gray-600 dark:text-gray-300">
        <p>Developer is working on this panel</p>
      </div>
    </div>
  );
}

export default Feedback;
