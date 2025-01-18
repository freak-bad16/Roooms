import React, { useState, useEffect } from 'react';
import { db, doc, getDoc } from '../firebase';  // Firestore functions
import { getAuth } from 'firebase/auth';
import Notification from './Notification';
import Profile from '../Home_panels/Profile';

const RightPanel = ({ rightWidth, isDarkMode }) => {
    const [user, setUser] = useState({ username: '', userId: '' });
    const [loading, setLoading] = useState(true);

    // Fetch user data from Firestore
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const auth = getAuth();
                const currentUser = auth.currentUser;

                if (currentUser) {
                    const userDocRef = doc(db, 'users', currentUser.uid);  // Fetch user by UID
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUser({ username: data.name, userId: data.userID });
                    } else {
                        console.log("No such document!");
                    }
                } else {
                    console.log("User not logged in!");
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`border-l border-gray-300 p-4`} style={{ width: `${rightWidth}%` }}>
            {rightWidth > 40 ? (
                <div className='block h-full w-full'>
                    <Profile />
                </div>
            ) : (
                <>
                    {/* Profile Section */}
                    <div className='border-b-2 pb-4 border-dotted mb-4'>
                        <div className='flex items-center flex-wrap gap-6 '>
                            <div className='w-20 h-20 overflow-hidden rounded-full'>
                                <img 
                                    src="https://imgs.search.brave.com/3RewyY0tHzi0WQqDxJG6Ao3xDM15c-h0Hvbwc4O7D30/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waG90/b3Nub3cub3JnL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzA0/L3NoaW5jaGFuLXBo/b3RvLWRvd25sb2Fk/XzExLmpwZw" 
                                    alt="User Avatar" 
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p>{user.username}</p>
                                <p>{user.userId}</p>
                            </div>
                        </div>
                        <div className='text-sm flex justify-evenly mt-4'>
                            <div className='flex flex-col items-center gap-1'>
                                <p>---</p>
                                <p>Followers</p>
                            </div>
                            <div className='flex flex-col items-center gap-1'>
                                <p>---</p>
                                <p>Followers</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className='border-b-2 pb-4 border-dotted mb-6'>
                        <h3 className='text-lg font-semibold'>Stats</h3>
                        <div className='items-center justify-evenly flex flex-wrap gap-4 mt-2'>
                            <div className='flex flex-wrap gap-6'>
                                <div className="h-20 w-20 rounded-full border-8 bg-transparent "></div>
                                <ul>
                                    <li>stats 1</li>
                                    <li>stats 2</li>
                                    <li>stats 3</li>
                                </ul>
                            </div>
                            <div className='flex flex-wrap gap-6'>
                                <div className="h-20 w-20 rounded-full border-8 bg-transparent "></div>
                                <ul>
                                    <li>stats 1</li>
                                    <li>stats 2</li>
                                    <li>stats 3</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className='mb-6 '>
                        <div className='mb-4 flex items-center justify-between gap-1 pl-2 flex-wrap'>
                            <h3 className='text-lg font-semibold '>Notifications</h3>
                            <div className='flex gap-2 '>
                                <button>clear all</button>
                                <i className="ri-list-settings-fill"></i>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 h-80'>
                        <Notification isDarkMode={isDarkMode} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default RightPanel;
