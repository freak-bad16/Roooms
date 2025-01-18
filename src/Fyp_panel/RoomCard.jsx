import React from 'react';

function RoomCard({ room, userId,userName, roomNumber, setDetailedRoom }) {
    return (
        <div className="p-6 relative bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-[50vw]">
            <div className="absolute top-4 right-4 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
                {/* <p>Created by: {userId}</p> */}
                <p>Created by: {userName}</p>
                <p>Room Number: {room.roomNumber}</p>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{room.roomName}</h2>
            <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">{room.description}</p>
            <div className="flex items-start justify-between">
                <div className="mb-4">
                    <strong className="text-sm text-gray-700 dark:text-gray-300">Tech Stack:</strong>
                    <ul className="list-disc pl-5">
                        {(room.techStack || []).map((tech, index) => (
                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300">{tech}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <strong className="text-sm text-gray-700 dark:text-gray-300">Requirements:</strong>
                    <ul className="list-disc pl-5">
                        {(room.requirements || []).map((req, index) => (
                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300">{req}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-4 flex gap-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">Date Uploaded:</strong>
                <p className="text-sm text-gray-700 dark:text-gray-300">{room.uploadDate}</p>
            </div>
            <div className="mt-2 flex gap-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">Time Uploaded:</strong>
                <p className="text-sm text-gray-700 dark:text-gray-300">{room.uploadTime}</p>
            </div>
            <button
                onClick={() => setDetailedRoom(room)}
                className="py-3 px-10 bg-gray-600 text-white rounded-lg border-dotted border-2 border-gray-400 absolute bottom-4 right-4"
            >
                Details
            </button>
        </div>
    );
}

export default RoomCard;
