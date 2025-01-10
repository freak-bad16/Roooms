import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBEAlYxZQmHGifcNbCvjFOr34_eKoDY1FI",
  authDomain: "rooms-i.firebaseapp.com",
  projectId: "rooms-i",
  storageBucket: "rooms-i.appspot.com",
  messagingSenderId: "939916626641",
  appId: "1:939916626641:web:df5149ca6dac60030353f0",
  measurementId: "G-M0Y4E1254K",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null; // Analytics works only in browser
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);

// Export individual services
export {
  app,
  db,
  auth,
  analytics,
  storage,
  database,
  collection,
  doc,
  getDoc,
  onSnapshot,
  ref,
  uploadBytes,
  getDownloadURL,
};

// Add a default export with all services
const firebase = {
  app,
  db,
  auth,
  analytics,
  storage,
  database,
  collection,
  doc,
  getDoc,
  onSnapshot,
  ref,
  uploadBytes,
  getDownloadURL,
};

export default firebase;
