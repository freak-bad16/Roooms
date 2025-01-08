import React, { useState, useRef, useEffect } from 'react';
import 'remixicon/fonts/remixicon.css';
import RoomCard from '../Fyp_panel/RoomCard'; // Importing RoomCard component
import DetailedRoomCard from '../Fyp_panel/DetailedRoomCard'; // Importing DetailedRoomCard component
import '../index.css';
import gsap from 'gsap'; // Importing GSAP for animations
import CreateRoom from '../Fyp_panel/CreateRoom'; // Importing CreateRoom component

const Fyp = ({ createRoom, setCreateRoom, handlePanelSwitch }) => {
    const [detailedRoom, setDetailedRoom] = useState(false); // State for tracking if a detailed room view is active
    const detailedRoomRef = useRef(null); // Reference for the detailed room view for animations

    // useEffect to trigger animation when detailedRoom state changes
    useEffect(() => {
        if (detailedRoomRef.current) {
            // GSAP animation for transitioning between detailed and non-detailed room views
            if (detailedRoom) {
                gsap.to(detailedRoomRef.current, { display: 'block', opacity: 1, duration: 0.3 });
            } else {
                gsap.to(detailedRoomRef.current, { display: 'none', opacity: 0, duration: 0.3 });
            }
        }
    }, [detailedRoom]); // Dependency array ensures the effect runs only when detailedRoom state changes

    // Example room object for rendering room cards
    const exampleRooms = [
        {
            roomName: "Web Development Room",
            description: "A place for developers to collaborate and discuss web development topics.",
            techStack: ["React", "Node.js", "Express", "MongoDB"],
            requirements: ["Basic understanding of JavaScript", "Knowledge of web development frameworks"],
            uploadDate: "2025-01-02",
            uploadTime: "12:30 PM",
        },
        // Additional room objects...
    ];

    // Debugging the createRoom state when it changes
    useEffect(() => {
        console.log("createRoom state changed:", createRoom);
    }, [createRoom]);

    return (
        <div className="p-4">
            <div className='flex items-center justify-center mt-3'>
                <h3 className="text-2xl -mt-4 -mb-1 ml-1 font-bold text-gray-500 ">for you page</h3>
            </div>
            <div className="mt-4 h-[95vh] overflow-auto scrollbar-hide">
                {/* Show room cards unless a detailed room is being displayed */}
                {!detailedRoom && (
                    <div className="mt-4 mb-10 items-center justify-evenly flex flex-wrap gap-2">
                        {exampleRooms.map((room, index) => (
                            <RoomCard key={index} room={room} setDetailedRoom={setDetailedRoom} />
                        ))}
                    </div>
                )}

                {/* Show DetailedRoomCard component when detailedRoom is true */}
                <div ref={detailedRoomRef} className="transition-opacity duration-300">
                    {detailedRoom && <DetailedRoomCard setDetailedRoom={setDetailedRoom} />}
                </div>
            </div>

            {/* Button to trigger room creation */}
            {!detailedRoom && (
                <button
                    className="py-3 px-10 bg-gray-600 text-white rounded-lg border-dotted border-2 border-gray-400 sticky bottom-10 right-10"
                    onClick={() => {
                        console.log("Before setting createRoom:", createRoom);
                        setCreateRoom(true); // Activate room creation
                        handlePanelSwitch("yes"); // Switch to the room creation panel
                    }}
                >
                    <i className="ri-add-fill text-5xl font-thin"></i>
                </button>
            )}
        </div>
    );
};

export default Fyp;
