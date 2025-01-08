import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase"; // Ensure storage is imported
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [profilePic, setProfilePic] = useState(""); // For displaying profile pic
  const [newProfilePic, setNewProfilePic] = useState(null); // For uploading new profile pic
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setFormData(data);
          setProfilePic(data.profilePic || ""); // Load existing profile pic
        } else {
          console.error("No user data found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProfilePic(e.target.files[0]);
  };

  const uploadProfilePic = async () => {
    if (!newProfilePic) return null;

    const storageRef = ref(storage, `profilePics/${user.uid}`);
    await uploadBytes(storageRef, newProfilePic);
    return await getDownloadURL(storageRef);
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      let updatedProfilePic = profilePic;

      // Upload new profile pic if selected
      if (newProfilePic) {
        updatedProfilePic = await uploadProfilePic();
      }

      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        ...formData,
        profilePic: updatedProfilePic,
      });

      setUserData({ ...formData, profilePic: updatedProfilePic });
      setProfilePic(updatedProfilePic); // Update local state
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="profile-page h-screen p-4 flex flex-col items-center bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center justify-between w-full mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Profile</h1>
        <button onClick={handleLogout} className="text-red-600 text-xl">
          Logout
        </button>
      </div>

      <div className="text-center">
        {!isEditing ? (
          <>
            <div className="border-b-2 pb-4 border-dotted mb-4">
              <div className="flex items-center flex-wrap gap-6">
                <div className="w-20 h-20 overflow-hidden rounded-full">
                  <img
                    src={profilePic || "https://via.placeholder.com/150"}
                    alt="Profile"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>{userData.name}</p>
                  <p>{userData.userID || "User ID not available"}</p>
                </div>
              </div>
              <div className="text-sm flex justify-evenly mt-4">
                <div className="flex flex-col items-center gap-1">
                  <p>200</p>
                  <p>Followers</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p>200</p>
                  <p>Following</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">{userData.email}</p>
            <h3 className="text-lg font-semibold mt-4">Description</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {userData.description || "No description available."}
            </p>
            <h3 className="text-lg font-semibold mt-4">About</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {userData.about || "No about section yet."}
            </p>
            <h3 className="text-lg font-semibold mt-4">Location</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {userData.city}, {userData.country}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded-lg text-black"
              placeholder="Name"
            />
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded-lg text-black"
              placeholder="Description"
            />
            <textarea
              name="about"
              value={formData.about || ""}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded-lg text-black"
              placeholder="About"
            />
            <input
              type="text"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded-lg text-black"
              placeholder="City"
            />
            <input
              type="text"
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded-lg text-black"
              placeholder="Country"
            />
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 mb-2 border rounded-lg text-black"
            />
            <button
              onClick={handleSave}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
