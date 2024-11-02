import { useCallback, useMemo, useState } from 'react';
import { assets } from '../../assets/assets';
import ConversationBox from './conversation';

const ChatBox = () => {
  const [isActive, setIsActive] = useState(false);
  const [enterMessage, setEnterMessage] = useState('');
  const [showConversation, setShowConversation] = useState(false);

  const onShowConversation = useCallback(() => {
    setShowConversation(true);
  }, []);

  const onCloseConversation = useCallback(() => {
    setShowConversation(false);
  }, []);

  const onCloseModel = useCallback(() => {
    setIsActive(false);
  }, []);

  const onOpenModel = useCallback(() => {
    setIsActive(true);
  }, []);

  const isActiveSendButton = useMemo(() => {
    return enterMessage.length > 0;
  }, [enterMessage]);

  const handleSend = useCallback(() => {
    onShowConversation();
  }, []);

  if (showConversation) {
    return (
      <div className="fixed bottom-10 right-10">
        <div className="w-80 border mb-16 rounded relative h-80 shadow-lg bg-white">
          <div className="h-14 flex justify-between items-center bg-black w-full rounded-tl rounded-tr">
            <img onClick={onCloseConversation} src={assets.arrow_left} className="scale-50 cursor-pointer" />
            <p className="text-white text-base font-bold text-center">Semir</p>
            <div className="text-black">hi</div>
          </div>
          <div className="flex-1 h-[164px] p-4">
            <div className="flex justify-end">
              <div className="bg-black text-white text-sm p-2 rounded max-w-52">
                <p>Đây là đơn hàng của tôi</p>
                <span className="text-xs text-gray-100">02:12</span>
              </div>
            </div>

            <div className="flex justify-start mt-2">
              <div className="bg-gray-200 text-black text-sm p-2 rounded max-w-52">
                <p>Đây là đơn hàng của tôi</p>
                <span className="text-xs text-black">02:12</span>
              </div>
            </div>
          </div>
          <div className="p-2">
            <div className="w-full border h-16 rounded bg-white mt-4 p-2">
              <input
                onChange={(e) => setEnterMessage(e.target.value)}
                placeholder="Enter your mesage..."
                className="text-sm border-0 outline-none w-full focus:ring-0 hover:border-gray-300"
              />
              <div
                onClick={handleSend}
                className={`flex justify-end w-full ${isActiveSendButton ? 'opacity-100' : 'opacity-50'}`}
              >
                <img src={assets.send_icon} className="w-4 cursor-pointer hover:opacity-60" />
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={onCloseModel}
          className="cursor-pointer p-4 rounded-full items-center gap-1 flex h-12 w-12 fixed bottom-10 right-10 bg-black"
        >
          <img className="w-8 h-auto fill-white scale-125" src={assets.cancel_icon} />
        </div>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div
        onClick={onOpenModel}
        className="cursor-pointer px-4 py-6 items-center gap-1 flex h-10 rounded-lg bg-black fixed bottom-10 right-10"
      >
        <img className="w-8 h-auto fill-white scale-90" src={assets.message_icon} />
        <p className="text-white text-[10px] font-bold">Trò chuyện</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-10 right-10">
      <div className="w-80 border mb-16 rounded relative h-80 shadow-lg bg-white">
        <div className="h-2/4 bg-black rounded-tl rounded-tr p-4">
          <p className="text-white text-lg font-semibold">Trò chuyện với chúng tôi</p>
          <p className="text-white">👋 Hi, message us with any questions. We're happy to help!</p>

          <div className="w-full border h-16 rounded bg-white mt-4 p-2">
            <input
              onChange={(e) => setEnterMessage(e.target.value)}
              placeholder="Enter your mesage..."
              className="text-sm border-0 outline-none w-full focus:ring-0 hover:border-gray-300"
            />
            <div
              onClick={handleSend}
              className={`flex justify-end w-full ${isActiveSendButton ? 'opacity-100' : 'opacity-50'}`}
            >
              <img src={assets.send_icon} className="w-4 cursor-pointer hover:opacity-60" />
            </div>
          </div>
        </div>
        <div onClick={onShowConversation} className="flex h-2/4 flex-col justify-center p-4 gap-4">
          <p className="text-center">Câu hỏi tức thì</p>
          <div className="cursor-pointer border border-gray-500 text-gray-400 hover:opacity-70 rounded p-2">
            Theo dõi đơn hàng của tôi
          </div>
        </div>
      </div>
      <div
        onClick={onCloseModel}
        className="cursor-pointer p-4 rounded-full items-center gap-1 flex h-12 w-12 fixed bottom-10 right-10 bg-black"
      >
        <img className="w-8 h-auto fill-white scale-125" src={assets.cancel_icon} />
      </div>
    </div>
  );
};

export default ChatBox;
