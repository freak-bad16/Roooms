import React from 'react'
import { Link } from 'react-router-dom'

function Start() {
    return (
        <div className='p-6'>
            {/* Header Section */}
            <div className='flex justify-between '>
                {/* Logo */}
                <div className=' h-9 py-1 px-5 rounded-tr-3xl rounded-bl-3xl rounded bg-black '>
                    <h1 className=' text-white font-bold'>ROOMS</h1>
                </div>
                {/* Links to Login and Signup */}
                <div className='flex justify-between gap-5'>
                    <Link className=' border-2 active:border-black border-gray-500 rounded-full py-1 px-6 bg-[#d4d1d1] ' to="/Login">Login</Link>
                    <Link className=' border-2 active:border-black border-gray-500 rounded-full py-1 px-6 bg-[#d4d1d1] ' to="/Signup">Signup</Link>
                </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl font-bold text-center py-16 mt-10 flex">
                {/* First part of the heading */}
                <span className=" ml-32 block">Collaborate, Learn, &</span>
                {/* Second part of the heading */}
                <span className="-ml-60 mt-20 block">& Build Projects Together!</span>
            </h1>

            {/* Subheading */}
            <h2 className="text-2xl font-semibold text-center text-gray-700 w-[70%]">Struggling to find teammates or overcome challenges? We’re here to help!</h2>

            {/* Description Text */}
            <p className="text-lg text-gray-600 leading-relaxed mt-6 ml-32 w-[35%]">
                We understand the struggles of beginner developers: finding the right teammates, learning new tech, and overcoming challenges. Our platform is here to make your journey smoother.
            </p>

            {/* Button to explore */}
            <div className=" m-auto w-max mt-16">
                <button className="py-5 px-16 border-2 rounded hover:rounded-tr-3xl rounded-bl-3xl bg-green-300 text-2xl">
                    Explore with us
                </button>
            </div>

            {/* Footer Section */}
            <footer className="text-sm text-gray-500 text-center absolute bottom-4 right-10 py-4">
                {/* Copyright and Privacy Policy Link */}
                © 2025 Rooms.sumit. All rights reserved. | <a href="#" className="text-blue-600">Privacy Policy</a>
            </footer>

        </div>
    )
}

export default Start
