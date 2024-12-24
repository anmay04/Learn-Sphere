// client/src/components/chatBot/ChatBotIcon.jsx
import React from 'react';
import { BsChatDotsFill } from 'react-icons/bs'; // Or your desired icon
const ChatBotIcon = ({ onClick }) => {
    return (
        <div
            className="fixed bottom-4 right-4 cursor-pointer bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200"
            onClick={onClick}
        >
            <BsChatDotsFill size={25} />
        </div>
    );
};
export default ChatBotIcon;