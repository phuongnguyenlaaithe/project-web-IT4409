import { useState, useEffect, useCallback, useMemo, useRef, useContext } from "react";
import { ShopContext } from '../../context/ShopContext';
import { io } from "socket.io-client";
import { assets } from "../../assets/assets";
import moment from "moment";
import { Link } from "react-router-dom";

const socket = io("https://project-web-it4409-backend.onrender.com"); // Adjust server URL if needed

const ChatBox = () => {
  const { userId } = useContext(ShopContext);

  const [isActive, setIsActive] = useState(false);
  const [enterMessage, setEnterMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);  
  const messagesContainerRef = useRef(null);

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
  }, [messages,isActive]);

  const onCloseModel = useCallback(() => {
    setIsActive(false);
  }, []);

  const onOpenModel = useCallback(() => {
    setIsActive(true);
  }, []);

  const isActiveSendButton = useMemo(() => {
    return enterMessage.length > 0;
  }, [enterMessage]);

  // Fetch previous messages and handle real-time messages
  useEffect(() => {

    if (!userId) return;

    socket.emit("join", {
      userId : userId,
      adminId: "admin",
    }); // Replace with dynamic IDs

    socket.on("previousMessages", (msgs) => {
      setMessages(msgs);
    });

    socket.on("privateMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("previousMessages");
      socket.off("privateMessage");
    };
  }, [userId]);

  const handleSend = useCallback(() => {
    if (enterMessage.length > 0) {
      const newMessage = {
        sender: userId, // Replace with actual sender ID
        receiver: "admin", // Replace with actual receiver ID
        message: enterMessage,
        timestamp: new Date(),
      };
      socket.emit("privateMessage", newMessage);
    }
    setEnterMessage(""); // Clear input after sending
  }, [enterMessage]);

  const handleKeyDown = (event) => {  
    if (event.key === 'Enter') {  
      event.preventDefault();  
      handleSend();  
    }  
  };  

  if (!isActive) {
    return (
      <div
        onClick={onOpenModel}
        className="cursor-pointer px-4 py-6 items-center gap-1 flex h-10 rounded-lg bg-black fixed bottom-10 right-10"
      >
        <img
          className="w-8 h-auto fill-white scale-90"
          src={assets.message_icon}
        />
        <p className="hidden sm:flex text-white text-[14px] font-bold">Chat box</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 right-0  sm:bottom-10 sm:right-10">
      <div className="w-screen sm:w-[364px] sm:mb-16 rounded-xl relative h-screen sm:h-[532px] shadow-lg bg-white">
        <div className="h-14 flex justify-center items-center bg-black w-full sm:rounded-t-xl ">
          <p className="text-white text-base font-bold text-center">Forever</p>
          <div
            onClick={onCloseModel}
            className="sm:hidden p-2 absolute top-3 right-4"
          >
            <img
              className="w-4 h-auto fill-white scale-125"
              src={assets.cancel_icon}
            />
          </div>
        </div>
        {userId ? (
          // Nội dung chat khi đã đăng nhập
          <>
            <div className="flex flex-col h-[82%] sm:h-[78%] p-4 overflow-y-auto gap-2" ref={messagesContainerRef}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-1 flex ${
                    msg.sender === userId
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      msg.sender === userId
                        ? "bg-black text-white"
                        : "bg-gray-200 text-black"
                    } text-base p-2 rounded max-w-[70%] break-words`}
                  >
                    <p>{msg.message}</p>
                    <span className="text-xs text-gray-400 block mt-1">
                      {moment(msg.timestamp).format("HH:mm DD-MM")}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>

            <div className="px-2">
              <div className="w-full border h-[16%] rounded bg-white mt-3 p-2 flex">
                <input
                  value={enterMessage}
                  onChange={(e) => setEnterMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your message..."
                  className="text base border-0 outline-none w-[90%] focus:ring-0 hover:border-gray-300 py-3 sm:py-0"
                />
                <div
                  onClick={handleSend}
                  className={`flex justify-end items-center w-[10%] ${
                    isActiveSendButton ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <img
                    src={assets.send_icon}
                    className="w-5 h-5 cursor-pointer hover:opacity-60"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          // Thông báo khi chưa đăng nhập
          <div className="flex flex-col items-center justify-center h-[82%] sm:h-[78%] p-4">
            <p className="text-lg text-gray-500 text-center">
              Please <strong className="underline"> <Link to='/login'>login </Link></strong> to use chat feature
            </p>
          </div>
        )}
      </div>
      <div
        onClick={onCloseModel}
        className="hidden cursor-pointer p-4 rounded-full items-center gap-1 sm:flex h-12 w-12 fixed bottom-10 right-10 bg-black"
      >
        <img
          className="w-8 h-auto fill-white scale-125"
          src={assets.cancel_icon}
        />
      </div>
    </div>
  );
};

export default ChatBox;
