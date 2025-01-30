import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { app, db } from "../firebase"; // Ensure `db` is correctly imported

function RoomRequest() {
  const [rooms, setRooms] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch collaboration rooms from Firebase
  useEffect(() => {
    const database = getDatabase(app);
    const roomsRef = ref(database, "colabrooms");

    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const roomsArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setRooms(roomsArray);
      } else {
        setRooms([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch current user data
  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
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
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  // Filter rooms only when currentUserData is available
  const myRequest = currentUserData
    ? rooms.filter((room) => room.to === currentUserData.name)
    : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-[50vw] m-auto">
      {myRequest.length === 0 ? (
        <div className="text-center text-gray-500">No requests found.</div>
      ) : (
        <div className="space-y-4">
          {myRequest.map((room) => (
            <div
              key={room.id}
              className="p-4 bg-white dark:bg-gray-700 rounded-md shadow-md relative"
            >
              <div className="flex flex-col gap-2">
                <p><strong>From:</strong> {room.from}</p>
                <p><strong>To:</strong> {room.to}</p>
                <p><strong>Room Number:</strong> {room.roomNumber}</p>
              </div>
              <h2 className="text-xl font-semibold">{room.roomName}</h2>

              <p><strong>About:</strong> {room.about}</p>
              <p><strong>Reason:</strong> {room.reason}</p>
              <p><strong>Goals:</strong> {room.goals}</p>
              <p><strong>Requirements:</strong> {room.requirements}</p>
              <p><strong>Experience:</strong> {room.experience}</p>
              <p><strong>Interests:</strong> {room.interests}</p>
              <p><strong>Projects:</strong> {room.projects}</p>
              <p><strong>Contribution:</strong> {room.contribution}</p>
              <p><strong>Participation:</strong> {room.participation}</p>
              <p><strong>Questions:</strong> {room.questions}</p>
              <p><strong>Engagement:</strong> {room.engagement}</p>

              <div className="flex justify-evenly absolute bottom-4 right-2 w-1/3">
                <button className="px-5 py-3 rounded-full border-white border-2 border-dotted bg-gray-600 hover:border-dashed active:bg-gray-700">
                  Chat
                </button>
                <button className="px-5 py-3 rounded-full border-white border-2 border-dotted bg-gray-600 hover:border-dashed active:bg-gray-700">
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoomRequest;
