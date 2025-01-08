import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration using environment variables for security
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services with error handling
let analytics = null;
try {
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app); // Analytics works only in browser
  }
} catch (error) {
  console.error("Firebase Analytics initialization failed:", error);
}

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Export initialized services and utility functions
export {
  app,
  db,
  auth,
  analytics,
  storage,
  collection,
  doc,
  getDoc,
  onSnapshot,
  ref,
  uploadBytes,
  getDownloadURL,
};
