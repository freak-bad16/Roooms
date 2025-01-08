import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { app } from "../firebase";

function Signup() {
    const [userID, setUserID] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);

    const auth = getAuth(app);
    const db = getFirestore(app); // Initialize Firestore
    const navigate = useNavigate();

    const createUser = async (e) => {
        e.preventDefault();

        // Input Validation
        if (!userID || !name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (password.length < 8) {
            setPasswordValid(false);
            return;
        } else {
            setPasswordValid(true);
        }

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Save additional user info in Firestore
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                userID,
                name,
                email,
            });

            // Success Message and Redirection
            alert('Account created successfully!');
            navigate('/home'); // Redirect to home page
        } catch (err) {
            // Handle Errors
            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already in use. Please try another one.');
            } else {
                setError(err.message);
            }
        }
    };

    return (
        <div className="p-6">
            {/* Logo */}
            <div className="h-9 py-1 px-5 rounded-tr-3xl rounded-bl-3xl bg-black w-24 m-auto mb-8 mt-20">
                <h1 className="text-white font-bold">ROOMS</h1>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Join Rooms Today!</h1>
                <p className="text-lg text-gray-600">Collaborate, Learn, and Build Projects Together.</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={createUser} className="w-[90%] sm:w-[400px] m-auto">
                {/* User ID */}
                <div className="mb-4">
                    <label htmlFor="userID" className="block text-sm text-gray-700">User ID</label>
                    <input
                        type="text"
                        id="userID"
                        className="w-full p-3 mt-1 border rounded-md"
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        placeholder="Enter a unique User ID"
                    />
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full p-3 mt-1 border rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-3 mt-1 border rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        className={`w-full p-3 mt-1 border rounded-md ${passwordValid ? '' : 'border-red-500'}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                    {!passwordValid && <p className="text-red-500 text-sm">Password must be at least 8 characters long.</p>}
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Terms and Conditions */}
                <div className="flex items-center mb-4">
                    <input type="checkbox" id="remember" className="mr-2" />
                    <label htmlFor="remember" className="text-sm text-gray-700">
                        By continuing, you agree to our{' '}
                        <Link to="/terms" className="text-blue-600">Terms of Use</Link> and have read our{' '}
                        <Link to="/privacy" className="text-blue-600">Privacy Policy</Link>.
                    </label>
                </div>

                {/* Signup Button */}
                <button type="submit" className="w-full p-3 bg-blue-500 text-white text-lg rounded-md">
                    Create Account
                </button>
            </form>

            {/* Alternative Links */}
            <div className="text-center mt-4">
                <Link to="/login" className="text-gray-600">
                    Already have an account?
                    <span className="text-blue-600 ml-1">Login here</span>
                </Link>
            </div>
        </div>
    );
}

export default Signup;
