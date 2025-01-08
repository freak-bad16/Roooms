import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, onSnapshot, addDoc, orderBy } from "firebase/firestore";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const usersCollection = collection(db, "users");
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const usersList = snapshot.docs
        .filter((doc) => doc.id !== auth.currentUser.uid)
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    const chatId = getChatId(auth.currentUser.uid, selectedUser.id);
    const messagesRef = collection(db, "chats", chatId, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => doc.data());
      setMessages(messagesList);
    });

    return () => unsubscribe();
  }, [selectedUser]);

  const getChatId = (uid1, uid2) => {
    return uid1 > uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const chatId = getChatId(auth.currentUser.uid, selectedUser.id);
    const messagesRef = collection(db, "chats", chatId, "messages");

    try {
      await addDoc(messagesRef, {
        sender: auth.currentUser.uid,
        senderName: auth.currentUser.displayName,
        receiverName: selectedUser.name,
        text: newMessage.trim(),
        timestamp: Date.now(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-app flex h-screen">
      <div className="user-list w-56 dark:bg-gray-800 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user)}
            className={`p-2 mb-2 cursor-pointer rounded-md ${selectedUser?.id === user.id ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
          >
            {user.name}
          </div>
        ))}
      </div>

      <div className="chat-window flex-1 flex flex-col ">
        {selectedUser ? (
          <>
            <div className="chat-header dark:bg-gray-800 p-4  w-full">
              <h3 className="text-lg font-bold">Chat with {selectedUser.name}</h3>
            </div>

            <div className="messages flex-1 flex flex-col justify-end overflow-auto p-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message mb-2 p-3 rounded-lg max-w-fit ${msg.sender === auth.currentUser.uid
                      ? "bg-blue-500 text-white self-end" // Sent messages on the right
                      : "bg-gray-300 text-black self-start" // Received messages on the left
                    }`}
                >
                  <p className="text-xs text-gray-600">
                    {msg.sender === auth.currentUser.uid
                      ? `You -> ${msg.receiverName}`
                      : `${selectedUser.name} -> You`}
                  </p>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            <div className="chat-input flex items-center p-4 border-t-2 border-dotted mb-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-md text-black border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 p-2 px-6 bg-blue-500 text-white rounded-md"
              >
                <i className="ri-send-plane-2-fill "></i>
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
