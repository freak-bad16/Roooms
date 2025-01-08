import React from 'react';
import 'remixicon/fonts/remixicon.css';

function DetailedRoomCard(props) {
    const exampleRoom = {
        roomName: "Web Development Room",
        description: "A place for developers to collaborate and discuss web development topics.",
        privacy: "Public",
        features: ["Live chat", "Code sharing", "Video calls"],
        techStack: ["React", "Node.js", "Express", "MongoDB"],
        requirements: ["Basic understanding of JavaScript", "Knowledge of web development frameworks"],
        tags: ["React", "JavaScript", "Web Development"],
        uploadDate: "2025-01-02",
        uploadTime: "12:30 PM",
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg relative">
            <i onClick={() => {
                props.setDetailedRoom(false);
            }}
                className="ri-close-large-fill absolute top-4 right-4">
            </i>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{exampleRoom.roomName}</h2>
            <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">{exampleRoom.description}</p>

            <div className="mb-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">Privacy:</strong>
                <p className="text-sm">{exampleRoom.privacy}</p>
            </div>

            <div className='flex items-start justify-between gap-6'>
                <div className="mb-4 border-r-2 w-full px-16">
                    <strong className="text-sm text-gray-700 dark:text-gray-300">Features:</strong>
                    <ul className="list-disc pl-5">
                        {exampleRoom.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300">{feature}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-4 border-r-2 w-full px-16">
                    <strong className="text-sm text-gray-700 dark:text-gray-300">Tech Stack:</strong>
                    <ul className="list-disc pl-5">
                        {exampleRoom.techStack.map((tech, index) => (
                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300">{tech}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-4 w-full px-16">
                    <strong className="text-sm text-gray-700 dark:text-gray-300">Requirements:</strong>
                    <ul className="list-disc pl-5">
                        {exampleRoom.requirements.map((req, index) => (
                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300">{req}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mb-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">Tags:</strong>
                <p className="text-sm">{exampleRoom.tags.join(', ')}</p>
            </div>

            {/* Date and Time Uploaded */}
            <div className="mt-4 flex gap-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">Date Uploaded:</strong>
                <p className="text-sm text-gray-700 dark:text-gray-300">{exampleRoom.uploadDate}</p>
            </div>

            <div className="mt-2 flex gap-4">
                <strong className="text-sm text-gray-700 dark:text-gray-300">Time Uploaded:</strong>
                <p className="text-sm text-gray-700 dark:text-gray-300">{exampleRoom.uploadTime}</p>
            </div>
            <button
                className="py-3 px-10 bg-gray-600 text-white rounded-lg border-dotted border-2 border-gray-400 absolute bottom-4 right-4 ">
                collaborate
            </button>
        </div>
    );
}

export default DetailedRoomCard;
