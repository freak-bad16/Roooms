import React from "react";
import { getDatabase, ref, remove } from "firebase/database"; // Ensure correct imports

function MyRoomCard({ room, onEdit, setDetailedRoom, currentUserData }) {
  if (!currentUserData || currentUserData.name !== room.userName) {
    return null; // Don't render the component if the user is not the creator
  }

  const handleDelete = () => {
    if (window.confirm("Do you really want to delete this room?")) {
      const db = getDatabase();
      const roomRef = ref(db, `rooms/${room.id}`);
      remove(roomRef)
        .then(() => alert("Room deleted successfully"))
        .catch((error) => alert("Error deleting room: " + error.message));
    }
  };

  return (
    <div className="p-6 relative bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-[50vw]">
      <div className="absolute top-4 right-4 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
        <p>Created by: {room.userName || "Unknown"}</p>
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
        <button onClick={() => onEdit(room)} className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:border-dashed active:bg-gray-700 border-dotted ">
          Edit
        </button>
        <button onClick={handleDelete} className="py-2 px-4 bg-red-600 text-white rounded-lg hover:border-dashed active:bg-gray-700 border-dotted ">
          Delete
        </button>
        <button onClick={() => setDetailedRoom(room)} className="py-3 px-10 bg-gray-600 text-white rounded-lg border-dotted border-2 border-gray-400 absolute bottom-4 right-4 bg-gray-600 hover:border-dashed active:bg-gray-700 ">
          Details
        </button>
      </div>
    </div>
  );
}

export default MyRoomCard;
