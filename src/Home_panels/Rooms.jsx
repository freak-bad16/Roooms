import React, { useState, useRef, useEffect } from 'react';
import RoomCard from '../Fyp_panel/RoomCard';
import 'remixicon/fonts/remixicon.css';
import DetailedRoomCard from '../Fyp_panel/DetailedRoomCard';
import gsap from 'gsap';

function Rooms({ handlePanelSwitch }) {
  const [showJoinedRooms, setShowJoinedRooms] = useState(false);
  const [detailedRoom, setDetailedRoom] = useState(false);
  const detailedRoomRef = useRef(null);

  // useEffect to handle GSAP animation
  useEffect(() => {
    if (detailedRoomRef.current) {
      if (detailedRoom) {
        gsap.to(detailedRoomRef.current, { display: "block", opacity: 1, duration: 0.1 });
      } else {
        gsap.to(detailedRoomRef.current, { display: "none", opacity: 0, duration: 0.5 });
      }
    }
  }, [detailedRoom]);

  // Example data for "My Rooms"
  const myRooms = [
    {
      roomName: "Web Development Room",
      description: "A place for developers to collaborate and discuss web development topics.",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      requirements: ["Basic understanding of JavaScript", "Knowledge of web development frameworks"],
      uploadDate: "2025-01-02",
      uploadTime: "12:30 PM",
    },
    {
      roomName: "Designers Room",
      description: "A room for UI/UX designers to collaborate on design systems.",
      techStack: ["Figma", "Sketch", "Adobe XD"],
      requirements: ["Basic understanding of design principles"],
      uploadDate: "2025-01-05",
      uploadTime: "10:00 AM",
    },
    {
      roomName: "Mobile Development Room",
      description: "A room for mobile developers to discuss Android and iOS development.",
      techStack: ["Flutter", "React Native", "Java", "Kotlin"],
      requirements: ["Basic knowledge of mobile app development"],
      uploadDate: "2025-01-08",
      uploadTime: "2:00 PM",
    },
    {
      roomName: "Backend Developers",
      description: "A place for backend developers to discuss API design, microservices, and server-side technologies.",
      techStack: ["Node.js", "Java", "Spring Boot", "Docker"],
      requirements: ["Familiarity with RESTful APIs and databases"],
      uploadDate: "2025-01-12",
      uploadTime: "5:30 PM",
    },
    {
      roomName: "Cloud Computing Room",
      description: "A room for cloud enthusiasts to explore services like AWS, Azure, and Google Cloud.",
      techStack: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
      requirements: ["Basic knowledge of cloud platforms and containers"],
      uploadDate: "2025-01-15",
      uploadTime: "11:00 AM",
    },
    {
      roomName: "Cybersecurity Room",
      description: "A space for cybersecurity experts and learners to discuss security challenges and solutions.",
      techStack: ["Penetration Testing", "Ethical Hacking", "Firewalls"],
      requirements: ["Understanding of cybersecurity concepts"],
      uploadDate: "2025-01-18",
      uploadTime: "1:00 PM",
    },
  ];

  // Example data for "Joined Rooms"
  const joinedRooms = [
    {
      roomName: "React Enthusiasts",
      description: "A community for React.js developers.",
      techStack: ["React", "Redux", "TypeScript"],
      requirements: ["Intermediate knowledge of React"],
      uploadDate: "2025-01-01",
      uploadTime: "3:00 PM",
    },
    {
      roomName: "AI & Machine Learning",
      description: "A space for AI and ML enthusiasts.",
      techStack: ["Python", "TensorFlow", "Keras"],
      requirements: ["Basic knowledge of Python and ML"],
      uploadDate: "2025-01-10",
      uploadTime: "9:00 AM",
    },
    {
      roomName: "Blockchain Developers",
      description: "A place for developers to discuss blockchain technology and cryptocurrencies.",
      techStack: ["Solidity", "Ethereum", "Bitcoin", "Web3.js"],
      requirements: ["Understanding of blockchain fundamentals"],
      uploadDate: "2025-01-03",
      uploadTime: "4:30 PM",
    },
    {
      roomName: "DevOps Enthusiasts",
      description: "A community for DevOps engineers to discuss tools, CI/CD, and automation.",
      techStack: ["Jenkins", "Docker", "Kubernetes", "Terraform"],
      requirements: ["Familiarity with DevOps principles"],
      uploadDate: "2025-01-07",
      uploadTime: "12:00 PM",
    },
    {
      roomName: "Data Science Community",
      description: "A space for data scientists to share knowledge and solve data problems.",
      techStack: ["Python", "Pandas", "Matplotlib", "R"],
      requirements: ["Basic knowledge of statistics and data analysis"],
      uploadDate: "2025-01-14",
      uploadTime: "8:00 AM",
    },
    {
      roomName: "IoT Innovators",
      description: "A room for Internet of Things enthusiasts to collaborate on IoT projects and innovations.",
      techStack: ["Arduino", "Raspberry Pi", "Sensors", "MQTT"],
      requirements: ["Basic understanding of IoT concepts"],
      uploadDate: "2025-01-20",
      uploadTime: "10:00 AM",
    },
  ];

  return (
    <div className="p-4">
      <div className='flex items-center justify-between text-2xl '>
        <i
          onClick={() => {
            handlePanelSwitch("fyp");
          }}
          className="ri-arrow-left-long-line mb-1"></i>
        <h3 className="text-2xl -mt-4 -mb-1 ml-1 font-bold text-gray-500">Room Dashboard</h3>
        <i className="ri-arrow-left-long-line opacity-0 "></i>
      </div>
      <div className="mt-4">
        {/* Tabs for toggling between "My Rooms" and "Joined Rooms" */}
        <div className="flex justify-evenly items-center mb-6 border-b-2 border-dotted p-4">
          <button
            className={`py-2 px-4 rounded-lg ${!showJoinedRooms ? 'bg-blue-500 text-white' : 'bg-gray-300'} border-r-2 border-dotted pr-4`}
            onClick={() => setShowJoinedRooms(false)}
          >
            My Rooms
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${showJoinedRooms ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setShowJoinedRooms(true)}
          >
            Joined Rooms
          </button>
        </div>


        {/* Conditionally render room data */}
        <div className="mt-4 h-[95vh] overflow-auto scrollbar-hide">
          {!detailedRoom && (
            <div className="mt-4 mb-10 items-center justify-evenly flex flex-wrap gap-2 ">
              {showJoinedRooms
                ? joinedRooms.map((room, index) => (
                  <RoomCard key={index} room={room} setDetailedRoom={setDetailedRoom} />
                ))
                : myRooms.map((room, index) => (
                  <RoomCard key={index} room={room} setDetailedRoom={setDetailedRoom} />
                ))}
            </div>
          )}

          {/* Detailed Room View */}
          <div ref={detailedRoomRef} className="transition-opacity duration-300">
            {detailedRoom && <DetailedRoomCard setDetailedRoom={setDetailedRoom} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
