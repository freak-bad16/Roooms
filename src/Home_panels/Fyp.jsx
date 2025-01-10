import React, { useState, useRef, useEffect } from 'react';
import 'remixicon/fonts/remixicon.css';
import RoomCard from '../Fyp_panel/RoomCard';
import DetailedRoomCard from '../Fyp_panel/DetailedRoomCard';
import '../index.css';
import gsap from 'gsap';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

const Fyp = ({ createRoom, setCreateRoom, handlePanelSwitch }) => {
    const [detailedRoom, setDetailedRoom] = useState(false);
    const [rooms, setRooms] = useState([]);
    const detailedRoomRef = useRef(null);

    useEffect(() => {
        const roomsRef = ref(database, 'rooms');

        const unsubscribe = onValue(roomsRef, (snapshot) => {
            const roomData = snapshot.val();
            if (roomData) {
                const formattedRooms = Object.entries(roomData)
                    .map(([roomId, room]) => ({
                        roomId,
                        ...room,
                    }))
                    .sort((a, b) => b.timestamp - a.timestamp);
                setRooms(formattedRooms);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (detailedRoomRef.current) {
            if (detailedRoom) {
                gsap.to(detailedRoomRef.current, { display: 'block', opacity: 1, duration: 0.3 });
            } else {
                gsap.to(detailedRoomRef.current, { display: 'none', opacity: 0, duration: 0.3 });
            }
        }
    }, [detailedRoom]);

    return (
        <div className="p-4">
            <div className="flex items-center justify-center mt-3">
                <h3 className="text-2xl -mt-4 -mb-1 ml-1 font-bold text-gray-500">for you page</h3>
            </div>
            <div className="mt-4 h-[95vh] overflow-auto scrollbar-hide">
                {!detailedRoom && (
                    <div className="mt-4 mb-10 items-center justify-evenly flex flex-wrap gap-2">
                        {rooms.map((room) => (
                            <RoomCard
                                key={room.roomId}
                                room={room}
                                UserName={room.UserName}
                                roomNumber={room.roomId}
                                setDetailedRoom={() => setDetailedRoom(room)}
                            />
                        ))}
                    </div>
                )}
                <div ref={detailedRoomRef} className="transition-opacity duration-300">
                    {detailedRoom && <DetailedRoomCard room={detailedRoom} setDetailedRoom={setDetailedRoom} />}
                </div>
            </div>
            {!detailedRoom && (
                <button
                    className="py-3 px-10 bg-gray-600 text-white rounded-lg border-dotted border-2 border-gray-400 sticky bottom-10 right-10"
                    onClick={() => {
                        setCreateRoom(true);
                        handlePanelSwitch("yes");
                    }}
                >
                    <i className="ri-add-fill text-5xl font-thin"></i>
                </button>
            )}
        </div>
    );
};

export default Fyp;
