import React, { useState, useRef, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import gsap from "gsap";
import { getDatabase, ref, onValue } from "firebase/database";
import EditMyRoomCard from "../Rooms_panel/EditRoomsCard";
import MyRoomCard from "../Rooms_panel/MyRoomCard";
import MyDetailedRoom from "../Rooms_panel/MyDetailedRoom";

function Rooms({ handlePanelSwitch }) {
  const [detailedRoom, setDetailedRoom] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [allRooms, setAllRooms] = useState([]);
  const detailedRoomRef = useRef(null);

  const database = getDatabase();

  // GSAP Animation
  useEffect(() => {
    if (detailedRoomRef.current) {
      if (detailedRoom) {
        gsap.to(detailedRoomRef.current, { display: "block", opacity: 1, duration: 0.1 });
      } else {
        gsap.to(detailedRoomRef.current, { display: "none", opacity: 0, duration: 0.5 });
      }
    }
  }, [detailedRoom]);

  // Fetch Rooms from Firebase
  useEffect(() => {
    const roomsRef = ref(database, "rooms");
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const roomsArray = Object.entries(data).map(([id, roomData]) => ({
          id,
          ...roomData,
        }));
        setAllRooms(roomsArray);
      }
    });
  }, []);

  const handleEditRoom = (room) => {
    setEditRoom(room);
  };

  const handleSaveRoom = () => {
    setEditRoom(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between text-2xl">
        <i
          onClick={() => handlePanelSwitch("fyp")}
          className="ri-arrow-left-long-line mb-1 cursor-pointer"></i>
        <h3 className="text-2xl -mt-4 -mb-1 ml-1 font-bold text-gray-500">Room Dashboard</h3>
        <i className="ri-arrow-left-long-line opacity-0"></i>
      </div>

      <div className="mt-4 h-[95vh] overflow-auto scrollbar-hide">
        {editRoom ? (
          <EditMyRoomCard room={editRoom} onSave={handleSaveRoom} />
        ) : (
          <>
            {!detailedRoom && (
              <div className="mt-4 mb-10 items-center justify-evenly flex flex-wrap gap-2">
                {allRooms.map((room) => (
                  <MyRoomCard
                    key={room.id}
                    room={room}
                    onEdit={() => handleEditRoom(room)}
                    setDetailedRoom={setDetailedRoom}
                  />
                ))}
              </div>
            )}

            <div ref={detailedRoomRef} className="transition-opacity duration-300">
              {detailedRoom && <MyDetailedRoom room={allRooms[0]} setDetailedRoom={setDetailedRoom} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Rooms;
