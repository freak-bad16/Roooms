import React, { useState } from "react";
import { database } from "../firebase"; // Adjust the path based on your project structure
import { ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";

const CreateRoom = ({ handlePanelSwitch }) => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("Public");
  const [features, setFeatures] = useState("");
  const [techStack, setTechStack] = useState("");
  const [requirements, setRequirements] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!roomName.trim()) {
      setError("Room name is required");
      return;
    }

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const userId = currentUser ? currentUser.uid : "unknown_user";
    const userName = currentUser ? currentUser.displayName : "Anonymous"; // Get the user's display name

    const currentDate = new Date();
    const uploadDate = currentDate.toLocaleDateString(); // Format it as per your requirements
    const uploadTime = currentDate.toLocaleTimeString(); // Format it as per your requirements
    const timestamp = currentDate.getTime(); // Use the timestamp for sorting

    try {
      // Generate a 5-digit serial roomId (e.g., "00001", "00002")
      const roomId = (Math.floor(Math.random() * 100000)).toString().padStart(5, "0");

      // Create a new room reference
      const newRoomRef = push(ref(database, "rooms"));

      // Set room data in Firebase
      await set(newRoomRef, {
        roomId, // Add roomId as a 5-digit serial number
        roomName,
        description,
        techStack: techStack.split(",").map((tech) => tech.trim()),
        requirements: requirements.split(",").map((req) => req.trim()),
        privacy,
        features: features.split(",").map((feature) => feature.trim()),
        tags: tags.split(",").map((tag) => tag.trim()),
        userName, // Add userName from the logged-in user
        userId,   // Add userId from the logged-in user
        uploadDate,
        uploadTime,
        timestamp, // Add timestamp for sorting
      });

      alert("Room created successfully!");

      // Reset fields
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
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Room</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          Room Name:
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          Privacy:
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          Features (comma-separated):
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          Tech Stack (comma-separated):
          <input
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          Requirements (comma-separated):
          <input
            type="text"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          Tags (comma-separated):
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </label>
      </div>
      <button
        onClick={handleCreate}
        className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create Room
      </button>
    </div>
  );
};

export default CreateRoom;
