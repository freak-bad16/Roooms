import React, { useState, useEffect, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import LeftPanel from '../Home_left_panel/LeftPanel';
import Fyp from '../Home_panels/Fyp';
import Rooms from '../Home_panels/Rooms';
import Chat from '../Home_panels/Chat';
import Search from '../Home_panels/Search';
import Settings from '../Home_panels/Settings';
import Feedback from '../Home_panels/Feedback';
import gsap from 'gsap';
import CreateRoom from '../Fyp_panel/CreateRoom';
import RightPanel from '../Home_right_panel/RightPanel'; // Import RightPanel component

function Home() {
    const [leftWidth, setLeftWidth] = useState(14);
    const [rightWidth, setRightWidth] = useState(16);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isDragging, setIsDragging] = useState(null);
    const [createRoom, setCreateRoom] = useState(false);
    const [activePanel, setActivePanel] = useState('fyp'); 

    const CreateRoomRef = useRef(null);

    const handleMouseDown = (e, section) => {
        e.preventDefault();
        const startX = e.clientX;
        setIsDragging(section);

        const handleMouseMove = (e) => {
            const diff = e.clientX - startX;
            if (section === 'left') {
                const newWidth = Math.max(11, Math.min(18, leftWidth + (diff / window.innerWidth) * 100));
                setLeftWidth(newWidth);
            } else if (section === 'right') {
                const newWidth = Math.max(15, Math.min(60, rightWidth - (diff / window.innerWidth) * 100));
                setRightWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            setIsDragging(null);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const navLinks = [
        { icon: 'ri-home-9-fill', label: 'fyp' },
        { icon: 'ri-macbook-fill', label: 'Rooms' },
        { icon: 'ri-group-3-fill', label: 'Testing' },
        { icon: 'ri-message-3-fill', label: 'Chat' },
        { icon: 'ri-search-2-fill', label: 'Search' },
    ];

    const handlePanelSwitch = (panel) => {
        setActivePanel(panel.toLowerCase());
    };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} overflow-hidden`}>
            <LeftPanel 
                navLinks={navLinks} 
                handlePanelSwitch={handlePanelSwitch} 
                isDarkMode={isDarkMode} 
                toggleDarkMode={toggleDarkMode} 
                leftWidth={leftWidth} 
            />

            <div className='cursor-ew-resize bg-gray-300 w-1' onMouseDown={(e) => handleMouseDown(e, 'left')}></div>

            <div className='p-2' style={{ width: `calc(100% - ${leftWidth}% - ${rightWidth}% - 4px)` }}>
                {activePanel === 'fyp' && <Fyp createRoom={createRoom} setCreateRoom={setCreateRoom} handlePanelSwitch={handlePanelSwitch} />}
                {activePanel === 'rooms' && <Rooms handlePanelSwitch={handlePanelSwitch} />}
                {activePanel === 'chat' && <Chat handlePanelSwitch={handlePanelSwitch} isDarkMode={isDarkMode} />}
                {activePanel === 'search' && <Search handlePanelSwitch={handlePanelSwitch} />}
                {activePanel === 'settings' && <Settings handlePanelSwitch={handlePanelSwitch} />}
                {activePanel === 'feedback' && <Feedback handlePanelSwitch={handlePanelSwitch} />}
                {createRoom && activePanel === 'yes' && <CreateRoom setCreateRoom={setCreateRoom} handlePanelSwitch={handlePanelSwitch} />}
            </div>

            <div className='cursor-ew-resize bg-gray-300 w-1' onMouseDown={(e) => handleMouseDown(e, 'right')}></div>

            {/* Right Panel Component */}
            <RightPanel rightWidth={rightWidth} isDarkMode={isDarkMode} />
        </div>
    );
}

export default Home;
