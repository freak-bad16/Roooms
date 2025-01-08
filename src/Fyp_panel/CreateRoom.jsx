import React, { useState, useEffect } from 'react';
import '../index.css';

// Wrapping CreateRoom with React.forwardRef to pass ref from the parent component
const CreateRoom = React.forwardRef(({ setCreateRoom, handlePanelSwitch }, ref) => {
  // State variables to handle form input values and errors
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState('Public');
  const [features, setFeatures] = useState('');
  const [techStack, setTechStack] = useState('');
  const [requirements, setRequirements] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [tagSuggestions, setTagSuggestions] = useState([]);

  // Mock tag suggestions that simulate a tag auto-completion feature
  const mockTagSuggestions = ['React', 'Node.js', 'JavaScript', 'CSS', 'HTML'];

  // useEffect hook to handle tag suggestions filtering based on user input
  useEffect(() => {
    if (tags) {
      const lastTag = tags.split(',').pop().trim(); // Get the last entered tag
      const filtered = mockTagSuggestions.filter((tag) =>
        tag.toLowerCase().startsWith(lastTag.toLowerCase()) // Filter based on entered tag
      );
      setTagSuggestions(filtered); // Update the tag suggestions state
    } else {
      setTagSuggestions([]); // Clear suggestions when there are no tags
    }
  }, [tags]); // Runs every time the 'tags' state changes

  // Function to handle form submission and room creation
  const handleCreate = () => {
    // Basic validation for required fields
    if (!roomName.trim()) {
      setError('Room name is required');
      return;
    }
    if (!description.trim()) {
      setError('Description is required');
      return;
    }
    if (!features.trim()) {
      setError('Features are required');
      return;
    }
    if (!techStack.trim()) {
      setError('Tech stack is required');
      return;
    }
    if (!requirements.trim()) {
      setError('Requirements are required');
      return;
    }
    if (!privacy.trim()) {
      setError('Privacy is required');
      return;
    }

    // Log the room data to the console (in a real app, this would be submitted to a backend)
    console.log({
      roomName,
      description,
      privacy,
      features: features.split(',').map((feature) => feature.trim()),
      techStack: techStack.split(',').map((tech) => tech.trim()),
      requirements: requirements.split(',').map((req) => req.trim()),
      tags: tags.split(',').map((tag) => tag.trim()),
    });

    // Reset form data after successful creation
    setRoomName('');
    setDescription('');
    setPrivacy('Public');
    setFeatures('');
    setTechStack('');
    setRequirements('');
    setTags('');
    setError('');

    // Show a success alert and switch to the "fyp" panel (home)
    alert('Room created successfully!');
    handlePanelSwitch('fyp');
    setCreateRoom(false); // Close the create room panel
  };

  // Function to handle the selection of a tag suggestion
  const handleTagSuggestionClick = (suggestion) => {
    const existingTags = tags.split(',').slice(0, -1).map((tag) => tag.trim());
    setTags([...existingTags, suggestion].join(', ') + ', ');
    setTagSuggestions([]); // Clear suggestions after a selection
  };

  return (
    <div ref={ref}>
      {console.log('Rendering CreateRoom component')} {/* Logs component rendering */}
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Create a New Room</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Show error if there's any validation issue */}
        
        {/* Room Name input field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Room Name</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Enter room name"
          />
        </div>

        {/* Room Description input field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Enter room description"
          />
        </div>

        {/* Privacy select field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Privacy</label>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* Features input field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Features</label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Add features (comma-separated)"
          />
        </div>

        {/* Tech Stack input field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tech Stack</label>
          <input
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Add tech stack (comma-separated)"
          />
        </div>

        {/* Requirements input field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Requirements</label>
          <input
            type="text"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Add requirements (comma-separated)"
          />
        </div>

        {/* Tags input field with suggestions */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Add tags (comma-separated)"
          />
          {tagSuggestions.length > 0 && (
            <ul className="bg-white dark:bg-gray-700 border mt-1 rounded-lg">
              {tagSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleTagSuggestionClick(suggestion)} // Handle click to add suggestion to tags
                  className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-4">
          {/* Cancel button to reset form and go back to the "home" panel */}
          <button
            onClick={() => {
              handlePanelSwitch("fyp");
              setCreateRoom(false); // Close the create room panel
              setRoomName('');
              setDescription('');
              setPrivacy('Public');
              setFeatures('');
              setTechStack('');
              setRequirements('');
              setTags('');
              setError('');
            }}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg dark:bg-gray-600 dark:text-white"
          >
            Cancel
          </button>

          {/* Create button to submit form */}
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
});

export default CreateRoom;
