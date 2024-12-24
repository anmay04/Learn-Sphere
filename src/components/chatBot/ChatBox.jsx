// client/src/components/chatBot/ChatBox.jsx
import React, { useState, useRef, useEffect } from 'react';
import { apiConnector } from "../../services/apiconnector"
import { toast } from 'react-hot-toast';
import { geminiEndpoints } from '../../services/apis'

const ChatBox = ({ onClose }) => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const chatBoxRef = useRef(null);
    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (prompt.trim() === '') return;
        const newMessage = { text: prompt, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setPrompt('');

        try {
            const response = await apiConnector('POST', geminiEndpoints.GEMINI_CHAT_API, { prompt });
            if (response.data.success) {
                const geminiMessage = { text: response.data.response, sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, geminiMessage]);
            } else {
                toast.error("Error generating response")
            }
        } catch (error) {
            console.error("API Error: ", error);
            toast.error("Error generating response")
        }
    };

    return (
        <div className="fixed bottom-16 right-4 bg-white rounded-md shadow-lg w-[350px] h-[500px] flex flex-col z-50">
            <div className="flex justify-between items-center p-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Chat with Gemini</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <div ref={chatBoxRef} className="p-4 flex-grow overflow-y-auto space-y-2">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`rounded-md p-2 max-w-[80%] ${message.sender === 'user'
                            ? 'bg-blue-100 ml-auto text-right'
                            : 'bg-gray-100 mr-auto'
                            }`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>

            <div className="p-2 flex border-t border-gray-200">
                <input
                    type="text"
                    className="flex-grow border rounded-md px-3 py-2 mr-2 outline-none"
                    placeholder="Type your message..."
                    value={prompt}
                    onChange={handlePromptChange}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                />
                <button
                    className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-all duration-200"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;