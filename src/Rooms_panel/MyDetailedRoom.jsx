import React from 'react';

function MyDetailedRoom({ room = {}, setDetailedRoom }) {
    const {
        roomName = "Unknown Room",
        description = "No description provided.",
        techStack = [],
        requirements = [],
        features = [],
        tags = [],
        privacy = "Not specified",
        uploadDate = "Not available",
        uploadTime = "Not available",
        userId = "Unknown User ID",
        userName = "Unknown User",
        roomNumber = "Unknown Room ID",
    } = room;

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg relative mb-10">
            <i
                onClick={() => setDetailedRoom(false)}
                className="ri-close-large-fill absolute top-4 right-4 cursor-pointer"
            ></i>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{roomName}</h2>
            <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">{description}</p>

            {/* User Info */}
            <div className="mb-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">User ID:</strong>
                <p className="text-sm text-gray-700 dark:text-gray-300">{userId}</p>
            </div>
            <div className="mb-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">User Name:</strong>
                <p className="text-sm text-gray-700 dark:text-gray-300">{userName}</p>
            </div>
            <div className="mb-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">Room Number:</strong>
                <p className="text-sm text-gray-700 dark:text-gray-300">{roomNumber}</p>
            </div>

            {/* Tech Stack */}
            {techStack.length > 0 && (
                <div className="mb-4">
                    <strong className="text-sm text-gray-700 dark:text-gray-300">Tech Stack:</strong>
                    <ul className="list-disc pl-5">
                        {techStack.map((tech, index) => (
                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300">{tech}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Requirements */}
            {requirements.length > 0 && (
                <div className="mb-4">
                    <strong className="text-sm text-gray-700 dark:text-gray-300">Requirements:</strong>
                    <ul className="list-disc pl-5">
                        {requirements.map((req, index) => (
                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300">{req}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Features */}
            {features.length > 0 && (
                <div className="mb-4">
                    <strong className="text-sm text-gray-700 dark:text-gray-300">Features:</strong>
                    <ul className="list-disc pl-5">
                        {features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300">{feature}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
                <div className="mb-4">
                    <strong className="text-sm text-gray-700 dark:text-gray-300">Tags:</strong>
                    <ul className="list-disc pl-5">
                        {tags.map((tag, index) => (
                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300">{tag}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Privacy */}
            <div className="mb-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">Privacy:</strong>
                <p className="text-sm text-gray-700 dark:text-gray-300">{privacy}</p>
            </div>

            {/* Upload Date */}
            <div className="mt-4 flex gap-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">Date Uploaded:</strong>
                <p className="text-sm text-gray-700 dark:text-gray-300">{uploadDate}</p>
            </div>

            {/* Upload Time */}
            <div className="mt-2 flex gap-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">Time Uploaded:</strong>
                <p className="text-sm text-gray-700 dark:text-gray-300">{uploadTime}</p>
            </div>
        </div>
    );
}

export default MyDetailedRoom;
