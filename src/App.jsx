import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Start from './Pages/Start';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import A from './Pages/A';
import { app } from './firebase';  // Import app
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';  // Import from firebase/auth

function App() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("You are logged out");
        setUser(null);
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [auth]);

  if (user === null) {
    // User is not logged in, show public routes
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  // User is logged in, show authenticated routes
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/A" element={<A />} />
        {/* Sign out functionality */}
        <Route path="/Logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/Home" />} />
      </Routes>
    </Router>
  );
}

function Logout() {
  const auth = getAuth(app);
  const navigate = useNavigate();  // useNavigate hook to programmatically navigate

  useEffect(() => {
    signOut(auth)
      .then(() => {
        console.log("You have logged out.");
        // Redirect to login page after logout
        navigate('/Login');
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  }, [auth, navigate]);

  return null; // Do not render anything, the navigation will handle it
}

export default App;
