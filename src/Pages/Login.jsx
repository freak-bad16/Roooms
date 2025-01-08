import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = getAuth(app);
    const navigate = useNavigate(); // Initialize useNavigate

    const loginUser = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Input validation
        if (!email || !password) {
            setError('Please fill in both fields');
            setLoading(false);
            return;
        }

        try {
            // Firebase login attempt
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in successfully:', email);

            // Redirect to Home page after successful login
            navigate('/home'); // Use navigate to redirect
        } catch (err) {
            console.error('Login error:', err.message);

            // Show appropriate error message
            if (err.code === 'auth/user-not-found') {
                setError('No user found with this email.');
            } else if (err.code === 'auth/wrong-password') {
                setError('Incorrect password.');
            } else {
                setError('Failed to login. Please try again.');
            }
        } finally {
            setLoading(false);
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
                <h1 className="text-3xl font-bold">Welcome Back Developer!</h1>
                <p className="text-lg text-gray-600">Let's make some awesome projects</p>
            </div>

            {/* Login Form */}
            <form onSubmit={loginUser} className="w-[90%] sm:w-[400px] m-auto">
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
                        className="w-full p-3 mt-1 border rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Loading Indicator */}
                {loading && <p className="text-blue-500 text-sm">Logging in...</p>}

                {/* Remember me */}
                <div className="flex items-center mb-4">
                    <input type="checkbox" id="remember" className="mr-2" />
                    <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white text-lg rounded-md"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {/* Alternative Links */}
            <div className="text-center mt-4">
                <Link to="/signup" className="text-gray-600">
                    Don't have an account? <span className="text-blue-600">Create one</span>
                </Link>
            </div>
            <div className="text-center mt-2">
                <Link to="/forgot-password" className="text-blue-600">Forgot Password?</Link>
            </div>
        </div>
    );
}

export default Login;
