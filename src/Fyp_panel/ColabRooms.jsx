import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { getDatabase, ref, push, set } from "firebase/database";
import { db, app } from "../firebase";

function ColabRooms({ room, setColabPanel }) {
  const [formData, setFormData] = useState({
    about: "",
    reason: "",
    goals: "",
    requirements: "",
    experience: "",
    interests: "",
    roll: "",
    questions: "",
  });

  const [currentUserData, setCurrentUserData] = useState(null);

  // Fetch current user data
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const fetchCurrentUserData = async () => {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setCurrentUserData(docSnap.data());
          } else {
            console.error("No current user data found!");
          }
        } catch (error) {
          console.error("Error fetching current user data:", error);
        }
      };

      fetchCurrentUserData();
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUserData) {
      console.error("User data not available!");
      return;
    }

    const { userName, roomNumber, roomName } = room;

    const dataToStore = {
      ...formData,
      from: currentUserData.name || "Unknown User",
      to: userName,
      roomNumber,
      roomName,
    };

    try {
      const database = getDatabase(app);
      const newRoomRef = push(ref(database, "colabrooms"));

      await set(newRoomRef, dataToStore);
      alert("Form submitted successfully!"); // Show success alert
      setColabPanel(false); // Close the panel
    } catch (error) {
      console.error("Error storing data:", error);
      alert("Error submitting the form. Please try again."); // Show error alert
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 flex justify-center items-center p-4 mb-7 rounded-sm">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Join ColabRooms
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/** About */}
          <div>
            <label htmlFor="about" className="block font-medium text-gray-700">
              Tell us about yourself:
            </label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Brief introduction about yourself"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-200"
              rows="4"
              required
            ></textarea>
          </div>

          {/** Reason */}
          <div>
            <label htmlFor="reason" className="block font-medium text-gray-700">
              Why do you want to join this room :
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter reason"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-200"
              rows="2"
            ></textarea>
          </div>

          {/** Goals */}
          <div>
            <label htmlFor="goals" className="block font-medium text-gray-700">
              Goals:
            </label>
            <textarea
              id="goals"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              placeholder="Enter goals"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-200"
              rows="2"
            ></textarea>
          </div>

          {/** Requirements */}
          <div>
            <label
              htmlFor="requirements"
              className="block font-medium text-gray-700"
            >
              What are the Requirements you fullfill :
            </label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Enter requirements"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-200"
              rows="2"
            ></textarea>
          </div>

          {/** Experience */}
          <div>
            <label htmlFor="experience" className="block font-medium text-gray-700">
              Any previous Experience of working in project :
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Enter experience"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-200"
              rows="2"
            ></textarea>
          </div>

          {/** Interests */}
          <div>
            <label htmlFor="interests" className="block font-medium text-gray-700">
              What do you find Interests in this room :
            </label>
            <textarea
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="Enter interests"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-200"
              rows="2"
            ></textarea>
          </div>

          {/** Projects */}
          <div>
            <label htmlFor="roll" className="block font-medium text-gray-700">
              Which rool you are intrested in :
            </label>
            <textarea
              id="roll"
              name="roll"
              value={formData.roll}
              onChange={handleChange}
              placeholder="Enter roll"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-200"
              rows="2"
            ></textarea>
          </div>
          
          {/** Questions */}
          <div>
            <label htmlFor="questions" className="block font-medium text-gray-700">
              Any Questions:
            </label>
            <textarea
              id="questions"
              name="questions"
              value={formData.questions}
              onChange={handleChange}
              placeholder="Enter questions"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-200"
              rows="2"
            ></textarea>
          </div>

          {/** Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ColabRooms;
