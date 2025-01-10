import React, { useState, useRef, useEffect } from 'react';
import 'remixicon/fonts/remixicon.css';
import DetailedRoomCard from '../Fyp_panel/DetailedRoomCard';
import gsap from 'gsap';
import { getDatabase, ref, onValue } from 'firebase/database';

function Rooms({ handlePanelSwitch }) {
  const [showJoinedRooms, setShowJoinedRooms] = useState(false);
  const [detailedRoom, setDetailedRoom] = useState(false);
  const [myRooms, setMyRooms] = useState([]);
  const [joinedRooms, setJoinedRooms] = useState([]);
  const detailedRoomRef = useRef(null);

  const database = getDatabase();

  // useEffect to handle GSAP animation
  useEffect(() => {
    if (detailedRoomRef.current) {
      if (detailedRoom) {
        gsap.to(detailedRoomRef.current, { display: 'block', opacity: 1, duration: 0.1 });
      } else {
        gsap.to(detailedRoomRef.current, { display: 'none', opacity: 0, duration: 0.5 });
      }
    }
  }, [detailedRoom]);

  // Fetch data from Firebase
  useEffect(() => {
    const roomsRef = ref(database, 'rooms');

    // Fetch all rooms
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const roomsArray = Object.entries(data).map(([id, roomData]) => ({
          id,
          ...roomData,
        }));

        // Example logic to split between "My Rooms" and "Joined Rooms"
        // Replace the condition with your actual logic
        setMyRooms(roomsArray.filter((room) => room.owner === 'currentUserId')); // Replace with real user ID logic
        setJoinedRooms(roomsArray.filter((room) => room.members && room.members.includes('currentUserId'))); // Replace with real user ID logic
      }
    });
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between text-2xl">
        <i
          onClick={() => {
            handlePanelSwitch('fyp');
          }}
          className="ri-arrow-left-long-line mb-1"></i>
        <h3 className="text-2xl -mt-4 -mb-1 ml-1 font-bold text-gray-500">Room Dashboard</h3>
        <i className="ri-arrow-left-long-line opacity-0"></i>
      </div>
      <div className="mt-4">
        {/* Tabs for toggling between "My Rooms" and "Joined Rooms" */}
        <div className="flex justify-evenly items-center mb-6 border-b-2 border-dotted p-4">
          <button
            className={`py-2 px-4 rounded-lg ${!showJoinedRooms ? 'bg-blue-500 text-white' : 'bg-gray-300'} border-r-2 border-dotted pr-4`}
            onClick={() => setShowJoinedRooms(false)}>
            My Rooms
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${showJoinedRooms ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setShowJoinedRooms(true)}>
            Joined Rooms
          </button>
        </div>

        {/* Conditionally render room data */}
        <div className="mt-4 h-[95vh] overflow-auto scrollbar-hide">
          {!detailedRoom && (
            <div className="mt-4 mb-10 items-center justify-evenly flex flex-wrap gap-2 ">
              {showJoinedRooms
                ? joinedRooms.map((room) => (
                    <RoomCard key={room.id} room={room} setDetailedRoom={setDetailedRoom} />
                  ))
                : myRooms.map((room) => (
                    <RoomCard key={room.id} room={room} setDetailedRoom={setDetailedRoom} />
                  ))}
            </div>
          )}

          {/* Detailed Room View */}
          <div ref={detailedRoomRef} className="transition-opacity duration-300">
            {detailedRoom && <DetailedRoomCard setDetailedRoom={setDetailedRoom} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
