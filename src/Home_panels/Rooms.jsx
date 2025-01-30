import React, { useState, useRef, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import gsap from "gsap";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";
import EditMyRoomCard from "../Rooms_panel/EditRoomsCard";
import MyRoomCard from "../Rooms_panel/MyRoomCard";
import MyDetailedRoom from "../Rooms_panel/MyDetailedRoom";
import RoomRequest from "../Rooms_panel/RoomRequest";

function Rooms({ handlePanelSwitch }) {
  const [detailedRoom, setDetailedRoom] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [allRooms, setAllRooms] = useState([]);
  const [roomToggle, setRoomToggle] = useState(true);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [loading, setLoading] = useState(true);  // Added loading state

  const detailedRoomRef = useRef(null);

  const database = getDatabase();
  const db = getFirestore();  // Fixed Firestore initialization

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
  }, [database]);

  const handleEditRoom = (room) => {
    setEditRoom(room);
  };

  const handleSaveRoom = () => {
    setEditRoom(null);
  };

  // Fetch current user data
  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setCurrentUserData(docSnap.data());
          } else {
            console.error("No current user data found!");
          }
        } catch (error) {
          console.error("Error fetching current user data:", error);
        }
      }
      setLoading(false);  // Now it works because setLoading is defined
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between text-2xl">
        <i
          onClick={() => handlePanelSwitch("fyp")}
          className="ri-arrow-left-long-line mb-1 cursor-pointer"
        ></i>
        <h3 className="text-2xl -mt-4 -mb-1 ml-1 font-bold text-gray-500">Room Dashboard</h3>
        <i className="ri-arrow-left-long-line opacity-0"></i>
      </div>

      {/* Toggle Buttons */}
      <div className="w-full flex justify-evenly mt-6">
        <button className="px-5 py-3 rounded-full border-white border-2 border-dotted bg-gray-600 hover:border-dashed active:bg-gray-700 " onClick={() => setRoomToggle(true)}>My Rooms</button>
        <button className="px-5 py-3 rounded-full border-white border-2 border-dotted bg-gray-600 hover:border-dashed active:bg-gray-700 " onClick={() => setRoomToggle(false)}>Requests</button>
      </div>

      <div className="mt-4 h-[80vh] overflow-auto scrollbar-hide">
        {roomToggle ? (
          // When showing "My Rooms"
          editRoom ? (
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
                      currentUserData={currentUserData}
                    />
                  ))}
                </div>
              )}

              <div ref={detailedRoomRef} className="transition-opacity duration-300">
                {detailedRoom && (
                  <MyDetailedRoom room={allRooms[0]} setDetailedRoom={setDetailedRoom} />
                )}
              </div>
            </>
          )
        ) : (
          // When showing "Requests"
          <div>
            <RoomRequest />
          </div>
        )}
      </div>
    </div>
  );
}

export default Rooms;
