import React, { useState, useCallback } from "react";
import { getDatabase, ref, set, get, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const CreateRoom = ({ handlePanelSwitch }) => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("Public");
  const [features, setFeatures] = useState("");
  const [techStack, setTechStack] = useState("");
  const [requirements, setRequirements] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const handleCreate = useCallback(async () => {
    if (!roomName.trim()) {
      setError("Room name is required");
      return;
    }

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userId = currentUser ? currentUser.uid : null;

    if (!userId) {
      setError("User is not logged in. Please log in to create a room.");
      return;
    }

    const firestore = getFirestore();
    const userDocRef = doc(firestore, "users", userId);
    let userName = "Anonymous";

    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        userName = userData.name || "Anonymous";
      } else {
        console.warn("User document does not exist in Firestore.");
      }

      const currentDate = new Date();
      const uploadDate = currentDate.toLocaleDateString();
      const uploadTime = currentDate.toLocaleTimeString();
      const timestamp = currentDate.getTime();

      const database = getDatabase();
      const roomsRef = ref(database, "rooms");

      const snapshot = await get(roomsRef);
      let newRoomNumber = 1103;

      if (snapshot.exists()) {
        const roomsData = Object.values(snapshot.val());
        const lastRoomNumber = roomsData
          .map((room) => room.roomNumber || 0)
          .reduce((max, current) => Math.max(max, current), 0);

        newRoomNumber = lastRoomNumber + 1;
      }

      const newRoomRef = push(roomsRef);
      await set(newRoomRef, {
        roomNumber: newRoomNumber,
        roomName,
        description,
        techStack: techStack.split(",").map((tech) => tech.trim()),
        requirements: requirements.split(",").map((req) => req.trim()),
        privacy,
        features: features.split(",").map((feature) => feature.trim()),
        tags: tags.split(",").map((tag) => tag.trim()),
        userName,
        userId,
        uploadDate,
        uploadTime,
        timestamp,
      });

      alert("Room created successfully!");

      setRoomName("");
      setDescription("");
      setPrivacy("Public");
      setFeatures("");
      setTechStack("");
      setRequirements("");
      setTags("");
      setError("");
      handlePanelSwitch("fyp");
    } catch (error) {
      console.error("Failed to create room:", error);
      setError("Failed to create room. Please try again.");
    }
  }, [handlePanelSwitch]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg text-black"> {/* Modal container */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Room</h2> {/* Heading */}

      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error message */}

      <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }} className="space-y-4"> {/* Form with vertical spacing */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Room Name</label> {/* Label */}
          <input
            type="text"
            placeholder="Enter Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" // Input styles
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" // Textarea styles
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Privacy</label>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" // Select styles
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Features (comma-separated)</label>
          <input
            type="text"
            placeholder="Enter features"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" // Input styles
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tech Stack (comma-separated)</label>
          <input
            type="text"
            placeholder="Enter tech stack"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" // Input styles
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Requirements (comma-separated)</label>
          <input
            type="text"
            placeholder="Enter requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" // Input styles
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
          <input
            type="text"
            placeholder="Enter tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" // Input styles
          />
        </div>

        <div className="flex justify-end space-x-4"> {/* Button container */}
          <button
            type="button"
            onClick={() => handlePanelSwitch("fyp")}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" // Cancel button styles
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" // Create button styles
          >
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoom;