import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiX, FiMessageSquare, FiMinimize2, FiMic, FiPaperclip } from 'react-icons/fi';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: '👋 Hello! I\'m your StreamOn Assistant. How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        type: 'user',
        content: inputMessage,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      setIsTyping(true);
      
      // Simulate bot response (remove this when implementing actual chatbot)
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          type: 'bot',
          content: 'I understand you\'re asking about: ' + inputMessage,
          timestamp: new Date().toISOString()
        }]);
      }, 1500);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl group"
      >
        <FiMessageSquare className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 w-96 bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl transition-all duration-300 transform ${
      isMinimized ? 'h-16' : 'h-[600px]'
    } ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center animate-pulse">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">StreamOn Assistant</h3>
            <p className="text-xs text-green-400">Online</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-gray-700/50 rounded-full transition-colors duration-200"
          >
            <FiMinimize2 className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-700/50 rounded-full transition-colors duration-200"
          >
            <FiX className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      {!isMinimized && (
        <>
          <div className="h-[calc(600px-8rem)] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 shadow-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                      : 'bg-gray-700/50 backdrop-blur-sm text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gray-700/50 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700/50 bg-gray-800/50 backdrop-blur-sm rounded-b-2xl">
            <div className="flex space-x-2">
              <button
                type="button"
                className="p-2 hover:bg-gray-700/50 rounded-full transition-colors duration-200"
              >
                <FiPaperclip className="w-5 h-5 text-gray-400" />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700/50 backdrop-blur-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
              <button
                type="button"
                className="p-2 hover:bg-gray-700/50 rounded-full transition-colors duration-200"
              >
                <FiMic className="w-5 h-5 text-gray-400" />
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 p-2 rounded-full transition-all duration-200 transform hover:scale-105"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatBot; 