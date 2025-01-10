import React from 'react';

function DetailedRoomCard({ room = {}, setDetailedRoom }) {
    const { roomName = "Unknown Room", description = "No description provided." } = room;

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg relative">
            <i
                onClick={() => setDetailedRoom(false)}
                className="ri-close-large-fill absolute top-4 right-4 cursor-pointer"
            ></i>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{roomName}</h2>
            <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">{description}</p>
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
            <div className="mt-4 flex gap-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">Date Uploaded:</strong>
                <p className="text-sm text-gray-700 dark:text-gray-300">{room.uploadDate}</p>
            </div>
            <div className="mt-2 flex gap-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">Time Uploaded:</strong>
                <p className="text-sm text-gray-700 dark:text-gray-300">{room.uploadTime}</p>
            </div>
        </div>
    );
}

export default DetailedRoomCard;
