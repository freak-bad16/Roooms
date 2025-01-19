import React, { useState, useCallback } from "react";
import { getDatabase, ref, set, get, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const FeedbackForm = ({ handlePanelSwitch }) => {
  const [feedback, setFeedback] = useState("");
  const [thankYouMessage, setThankYouMessage] = useState("");
  const [error, setError] = useState("");

  const handleFeedbackSubmit = useCallback(async () => {
    if (!feedback.trim()) {
      setError("Feedback is required");
      return;
    }

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const UID = currentUser ? currentUser.uid : null; // Replace `userId` with `UID`

    if (!UID) {
      setError("User is not logged in. Please log in to submit feedback.");
      return;
    }

    const firestore = getFirestore();
    const userDocRef = doc(firestore, "users", UID); // Replace `userId` with `UID`
    let userName = "Anonymous";

    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        userName = userData.name || "Anonymous";
      } else {
        console.warn("User document does not exist in Firestore.");
      }

      const database = getDatabase();
      const feedbackRef = ref(database, "feedbacks");

      const snapshot = await get(feedbackRef);
      let newFeedbackNumber = 0;

      if (snapshot.exists()) {
        const feedbacksData = Object.values(snapshot.val());
        const lastFeedbackNumber = feedbacksData
          .map((fb) => fb.feedbackNumber || 0)
          .reduce((max, current) => Math.max(max, current), 0);

        newFeedbackNumber = lastFeedbackNumber + 1;
      }

      // Get current date and time
      const currentDateTime = new Date().toLocaleString("en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const newFeedbackRef = push(feedbackRef);
      await set(newFeedbackRef, {
        feedbackNumber: newFeedbackNumber,
        feedback,
        userName,
        UID, // Store UID instead of userId
        dateTime: currentDateTime, // Store formatted date and time
      });

      setThankYouMessage("Thank you for your feedback!");
      setFeedback("");
      setError("");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      setError("Failed to submit feedback. Please try again.");
    }
  }, [feedback]);

  return (
    <div>
      {/* Header with Back Button and Title */}
      <div className="flex items-center justify-between text-2xl mb-4">
        <i
          onClick={() => {
            handlePanelSwitch("fyp"); // Switch to FYP panel
          }}
          className="ri-arrow-left-long-line mb-1 cursor-pointer text-gray-600 dark:text-gray-300"
        ></i>
        <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-300">
        Feedback
        </h3>
        <i className="ri-arrow-left-long-line opacity-0"></i>
      </div>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg text-black">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Feedback Form</h2>

        {thankYouMessage && (
          <p className="text-green-500 mb-4">{thankYouMessage}</p>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFeedbackSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Feedback
            </label>
            <textarea
              placeholder="Enter your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
