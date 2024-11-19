import { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import moment from "moment";
import {io} from 'socket.io-client'; 
import { backendUrl } from '../App';

const listUser = [
  {
    name: "Nancy Considine II",
    msg: "quantify digital matrix",
    id: "1",
  },
  {
    name: "Willie Ebert",
    msg: "connect multi-byte interface",
    id: "2",
  },
  {
    name: "Mike Runolfsson",
    msg: "synthesize mobile circuit",
    id: "3",
  },
  {
    name: "Eduardo Schroeder Jr.",
    msg: "compress redundant protocol",
    id: "4",
  },
  {
    name: "Eula Legros",
    msg: "program multi-byte monitor",
    id: "5",
  },
  {
    name: "Howard Stamm",
    msg: "bypass bluetooth sensor",
    id: "6",
  },
  {
    name: "Luis Kunze",
    msg: "back up cross-platform alarm",
    id: "7",
  },
  {
    name: "Felipe Howe",
    msg: "copy online interface",
    id: "8",
  },
  {
    name: "Arlene Beatty",
    msg: "compress 1080p capacitor",
    id: "9",
  },
  {
    name: "Alyssa Goyette",
    msg: "hack optical capacitor",
    id: "10",
  },
  {
    name: "Dewey Hauck Jr.",
    msg: "copy solid state port",
    id: "11",
  },
  {
    name: "Annie Littel V",
    msg: "bypass solid state bus",
    id: "12",
  },
  {
    name: "Lucas Lehner",
    msg: "override cross-platform system",
    id: "13",
  },
  {
    name: "Megan O'Hara",
    msg: "calculate neural feed",
    id: "14",
  },
  {
    name: "Arthur Kuphal",
    msg: "back up haptic monitor",
    id: "15",
  },
  {
    name: "Jessie Cronin",
    msg: "navigate optical pixel",
    id: "16",
  },
  {
    name: "Jo Marvin",
    msg: "synthesize auxiliary interface",
    id: "17",
  },
  {
    name: "Conrad Stamm",
    msg: "copy optical bandwidth",
    id: "18",
  },
  {
    name: "Viola Schamberger",
    msg: "back up cross-platform alarm",
    id: "19",
  },
  {
    name: "Bill Sawayn",
    msg: "input wireless microchip",
    id: "20",
  },
  {
    name: "Van Dickens",
    msg: "reboot redundant pixel",
    id: "21",
  },
  {
    name: "Zachary Balistreri",
    msg: "quantify digital hard drive",
    id: "22",
  },
  {
    name: "April Christiansen",
    msg: "input virtual driver",
    id: "23",
  },
  {
    name: "Terence Mueller",
    msg: "transmit solid state port",
    id: "24",
  },
];

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(listUser[0]);
  const [users, setUsers] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);  
  const userId = '6738af64957c4debb2f7235a';
  const messageEndRef = useRef(null);  
  const messagesContainerRef = useRef(null);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const scrollToBottom = () => {
    if (messagesContainerRef.current && messageEndRef.current) {
      const container = messagesContainerRef.current;
      const scrollHeight = container.scrollHeight;
  
      container.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      });
    }
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedUser]);

  useEffect(() => {  
    // Kết nối socket  
    const newSocket = io(backendUrl);  
    setSocket(newSocket);  

    newSocket.emit('join', { userId, adminId : 'admin'});

    newSocket.on('previousMessages', (prevMessages) => {
      setMessages(prevMessages);
    });

    newSocket.on('privateMessage', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);  

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowMobileChat(true);
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
  };

  const sendMessage = () => {
    if (newMessage.trim() && socket) {
      const messageData = {  
        sender: 'admin',  
        receiver: userId,  
        message: newMessage,  
        timestamp: new Date()  
      };  

      socket.emit('privateMessage', messageData);   
      setNewMessage('');
    }
  };

  const handleKeyDown = (event) => {  
    if (event.key === 'Enter') {  
      event.preventDefault();  
      sendMessage();  
    }  
  };  

  return (
    <div className="flex w-full">
      {/* User List - Hidden on mobile when chat is shown */}
      <div className={`w-full sm:w-[30%] sm:border-r-2 ${showMobileChat ? 'hidden sm:block' : 'block'}`}>
        <h2 className="font-medium text-lg md:text-3xl text-gray-800 my-5">Chat Admin</h2>
        <div className="flex flex-col h-[500px] overflow-y-scroll hidden_scroll">
          {listUser.map((user) => (
            <div
              key={user.id}
              onClick={() => handleSelectUser(user)}
              className={`cursor-pointer px-3 rounded-sm ${
                selectedUser?.id === user.id ? "bg-pink-100" : ""
              }`}
            >
              <div className="flex gap-3 w-full py-3 mb-2">
                <img
                  src={assets.avatar_woman}
                  alt="avatar"
                  className="w-8 h-8 md:w-12 md:h-12"
                />
                <div className="flex items-center">
                  <p className="font-medium text-black sm:text-base lg:text-lg">{user.name}</p>
                </div>
              </div>
              <hr className="w-[90%] m-auto border-gray-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Chat Interface - Show on mobile only when a user is selected */}
      <div className={`w-full sm:w-[70%] ${showMobileChat ? 'block' : 'hidden sm:block'}`}>
        <div className="flex-grow flex flex-col h-[calc(100vh-66px)]">
          {selectedUser ? (
            <>
              {/* Chat Header with Back Button */}
              <div className="py-4 sm:p-4 border-b border-gray-200 flex items-center">
                {showMobileChat && (
                  <button 
                    onClick={handleBackToList}
                    className="mr-1 px-2 sm:hidden"
                  >
                    <img src={assets.exit_icon} alt="" className="w-5 h-5"/>
                  </button>
                )}
                <img
                  src={assets.avatar_woman}
                  className="w-10 h-10 rounded-full mr-4"
                  alt="avatar"
                />
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {selectedUser.name}
                  </h2>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 hidden_scroll" ref={messagesContainerRef}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col w-full ${
                      msg.sender === "admin"
                        ? "self-end items-end float-end"
                        : "self-start items-start float-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg max-w-[70%] ${
                        msg.sender === "admin"
                          ? "bg-pink-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.message}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {moment(msg.timestamp).format("DD/MM HH:mm")}
                    </span>
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 flex items-center space-x-2 mb-2 relative">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
                <button onClick={sendMessage} className="sm:px-4 sm:py-2">
                  <img className={`w-8 h-8 relative ${showMobileChat? 'absolute w-6 h-6' : ''}`} src={assets.send_icon} alt="send" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <h2 className="mt-4 text-xl text-gray-600">
                  Chọn một người dùng để bắt đầu trò chuyện
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
