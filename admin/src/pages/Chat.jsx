import { useState, useEffect } from "react";
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);  
  const userId = '6737ddd58fc42fcee47cdbc3'

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

  return (
    <div className="flex">
      <div className="w-[30%] border-r-2">
        <h2 className="font-medium text-3xl text-gray-800 mb-8">Chat Admin</h2>
        <div className="flex flex-col h-[500px] overflow-y-scroll hidden_scroll ">
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
                  className="w-12 h-12"
                />
                <div className="flex items-center">
                  <p className="font-medium text-black text-lg">{user.name}</p>
                </div>
              </div>
              <hr className=" w-[90%] m-auto border-gray-300" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-[70%]">
        {/* Chat Interface */}
        <div className="flex-grow flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className=" p-4 border-b border-gray-200 flex items-center">
                <img
                  src={assets.avatar_woman}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {selectedUser.name}
                  </h2>
                </div>
              </div>

              {/* Messages Container */}
              <div className="h-[480px] w-full overflow-y-auto p-4 space-y-4 hidden_scroll">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col w-full
                    ${
                      msg.sender === "admin"
                        ? "self-end items-end float-end"
                        : "self-start items-start float-start"
                    }  
                  `}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg  max-w-[70%] 
                      ${
                        msg.sender === "admin"
                          ? "bg-pink-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }  
                    `}
                    >
                      {msg.message}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {moment(msg.timestamp).format("HH:mm")}
                    </span>
                  </div>
                ))}

                {/* <div className={`flex flex-col max-w-[70%] self-start items-start`}>
                  <div
                    className={`px-4 py-2 rounded-lg bg-gray-200 text-gray-800`}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                    minima distinctio numquam necessitatibus!
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {moment('2024-11-16T06:36:59.031+00:00').format("HH:mm")}
                  </span>
                </div>

                <div className={`flex flex-col max-w-[70%] items-end float-end`}>
                  <div
                    className={`px-4 py-2 rounded-lg bg-pink-500 text-white`}
                  >
                   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error ducimus tempora debitis vel earum aperiam cumque veritatis facilis itaque quod odio eum ad iste, incidunt non, laboriosam expedita, repellendus rerum ipsum ea. Neque animi aut quod ea veritatis nesciunt molestias.
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {moment('2024-11-16T06:36:59.031+00:00').format("HH:mm")}
                  </span>
                </div>

                <div className={`flex flex-col max-w-[70%] items-start self-start float-start`}>
                  <div
                    className={`px-4 py-2 rounded-lg bg-gray-200 text-gray-800`}
                  >
                   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error ducimus tempora debitis vel earum aperiam cumque veritatis facilis itaque quod odio eum ad iste, incidunt non, laboriosam expedita, repellendus rerum ipsum ea. Neque animi aut quod ea veritatis nesciunt molestias.
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {moment('2024-11-16T06:36:59.031+00:00').format("HH:mm")}
                  </span>
                </div>

                <div className={`flex flex-col max-w-[70%] items-end float-end`}>
                  <div
                    className={`px-4 py-2 rounded-lg bg-pink-500 text-white`}
                  >
                   🔥Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error ducimus tempora debitis vel earum aperiam cumque veritatis facilis itaque quod odio eum ad iste, incidunt non, laboriosam expedita, repellendus rerum ipsum ea. Neque animi aut quod ea veritatis nesciunt molestias.
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {moment('2024-11-16T06:36:59.031+00:00').format("HH:mm")}
                  </span>
                </div> */}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
                <button onClick={sendMessage} className="px-4 py-2 rounded-lg ">
                  <img className="w-8 h-8" src={assets.send_icon} alt="" />
                </button>
              </div>
            </>
          ) : (
            // Màn hình khi chưa chọn user
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
