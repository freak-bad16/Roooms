import React, { useState } from "react";
import { getDatabase, ref, update, remove } from "firebase/database";

function EditMyRoomCard({ room, onSave }) {
  const [updatedRoom, setUpdatedRoom] = useState({
    ...room,
    techStack: room.techStack || [],
    requirements: room.requirements || [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRoom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const db = getDatabase();
    const roomRef = ref(db, `rooms/${updatedRoom.id}`);
    update(roomRef, updatedRoom)
      .then(() => {
        alert("Room updated successfully");
        onSave();
      })
      .catch((error) => alert("Error updating room: " + error.message));
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-[50vw]">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Edit Room</h2>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 dark:text-gray-300">Room Name</label>
        <input
          type="text"
          name="roomName"
          value={updatedRoom.roomName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          name="description"
          value={updatedRoom.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg text-black"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 dark:text-gray-300">Tech Stack</label>
        <input
          type="text"
          name="techStack"
          value={updatedRoom.techStack.join(", ")}
          onChange={(e) =>
            setUpdatedRoom((prev) => ({
              ...prev,
              techStack: e.target.value.split(",").map((item) => item.trim()),
            }))
          }
          className="w-full px-3 py-2 border rounded-lg text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 dark:text-gray-300">Features</label>
        <input
          type="text"
          name="features"
          value={updatedRoom.features.join(", ")}
          onChange={(e) =>
            setUpdatedRoom((prev) => ({
              ...prev,
              features: e.target.value.split(",").map((item) => item.trim()),
            }))
          }
          className="w-full px-3 py-2 border rounded-lg text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 dark:text-gray-300">Tags</label>
        <input
          type="text"
          name="tags"
          value={updatedRoom.tags.join(", ")}
          onChange={(e) =>
            setUpdatedRoom((prev) => ({
              ...prev,
              tags: e.target.value.split(",").map((item) => item.trim()),
            }))
          }
          className="w-full px-3 py-2 border rounded-lg text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 dark:text-gray-300">Requirements</label>
        <input
          type="text"
          name="requirements"
          value={updatedRoom.requirements.join(", ")}
          onChange={(e) =>
            setUpdatedRoom((prev) => ({
              ...prev,
              requirements: e.target.value.split(",").map((item) => item.trim()),
            }))
          }
          className="w-full px-3 py-2 border rounded-lg text-black"
        />
      </div>
      <div className="flex gap-4">
        <button onClick={handleSave} className="py-2 px-4 bg-blue-600 text-white rounded-lg">
          Save
        </button>
        <button className="py-2 px-4 bg-red-600 text-white rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditMyRoomCard;
