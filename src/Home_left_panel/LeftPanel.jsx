import React from 'react';

const LeftPanel = ({ navLinks, handlePanelSwitch, isDarkMode, toggleDarkMode ,leftWidth = 20 }) => {
  return (
    <div className='border-r border-gray-300 p-4' style={{ width: `${leftWidth}%` }}>
      <div className='text-center mb-6'>
        <div className={`h-9 py-1 px-5 rounded-tr-3xl rounded-bl-3xl ${isDarkMode ? 'bg-white' : 'bg-black'} w-24 m-auto mb-8 mt-5`}>
          <h1 className={`${isDarkMode ? 'text-black' : 'text-white'} font-bold`}>ROOMS</h1>
        </div>
      </div>
      <div className='mb-4'>
        <ul>
          {navLinks.map((link, index) => (
            <button
              key={index}
              className='flex items-center justify-start'
              onClick={() => handlePanelSwitch(link.label)}
            >
              <i className={link.icon}></i>
              <h3 className={`block py-2 px-4 text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-900'}`}>{link.label}</h3>
            </button>
          ))}
        </ul>
      </div>
      <div className='absolute bottom-4 left-4'>
        <ul>
          <button onClick={() => handlePanelSwitch('settings')} className='flex items-center justify-start'>
            <i className='ri-settings-4-fill'></i>
            <h3 className={`block py-2 px-4 text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-900'}`}>Settings</h3>
          </button>
          <button onClick={() => handlePanelSwitch('feedback')} className='flex items-center justify-start'>
            <i className='ri-feedback-fill'></i>
            <h3 className={`block py-2 px-4 text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-900'}`}>Feedback</h3>
          </button>
          <div className='mt-6'>
            <button
              className={`text-lg font-semibold py-2 px-4 w-36 ${isDarkMode ? 'bg-gray-500' : 'bg-black'} ${isDarkMode ? 'text-black' : 'text-white'} rounded-lg`}
              onClick={toggleDarkMode}
            >
              <i className={isDarkMode ? 'ri-sun-fill' : 'ri-moon-cloudy-fill'}></i>
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default LeftPanel;
