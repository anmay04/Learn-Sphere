// client/src/components/chatBot/ChatBot.jsx
import React, { useState } from 'react';
import ChatBotIcon from './ChatBotIcon';
import ChatBox from './ChatBox';
import { useLocation } from "react-router-dom";

const ChatBot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const location = useLocation()
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };
    return (
        <>
            {location.pathname !== "/dashboard/settings" && <><ChatBotIcon onClick={toggleChat} />
                {isChatOpen && <ChatBox onClose={toggleChat} />} </>}
        </>
    );
};

export default ChatBot;