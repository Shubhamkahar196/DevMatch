import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import type { RootState } from '../utils/Store';

const Chat = ({ messages = [], onSendMessage, currentUserId }) => {
  const { targetUserId } = useParams();
  const [messageText, setMessageText] = useState('');
  // const [newMessage,setNewMessage] = useState("");
  const user = useSelector((store: RootState) => store.user);
   const userId = user?._id

  useEffect(()=>{

    if(!userId){
      return 
    }

const socket = createSocketConnection()
// current userId and targetUserId(other user )
// as soon as the page loaded the socket connection is made and joinchat event is emitted
  socket.emit("joinChat",{
    firstName: user?.firstName,
    userId,targetUserId})
   
    socket.on("messageReceived",({firstName ,text})=>{
      setMessageText([...messageText,{firstName,text}])
    })
  return ()=>{
    socket.disconnect();
  }
  },[userId,targetUserId])

  const sendMessage = ()=>{
    const socket = createSocketConnection();
    socket.emit("sendMessage",{firstName: user.firstName,userId,targetUserId,text:messageText})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !onSendMessage) return;
    
    onSendMessage(messageText);
    setMessageText('');
  };

  return (
    <div className="max-w-2xl mx-auto my-6 border border-gray-200 rounded-2xl shadow-xl bg-white overflow-hidden flex flex-col h-[80vh]">
      
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 text-white font-semibold rounded-full flex items-center justify-center border border-white/40">
              {targetUserId ? targetUserId.substring(0, 2).toUpperCase() : 'U'}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h2 className="text-white font-medium text-lg leading-tight">
              {/* User ID: {targetUserId || "Chat Partner"} */}
              {user.firstName}
            </h2>
            <p className="text-indigo-100 text-xs">Active</p>
          </div>
        </div>
      </div>

      {/* Messages Body */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No messages yet. Say hello!
            {messageText}
          </div>
        ) : (
          messages.map((msg) => {
            // Checks if the message was sent by the logged-in user
            const isMe = msg.senderId === currentUserId;

            return (
              <div 
                key={msg.id || msg._id} 
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm transition-all ${
                  isMe 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}>
                  <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                  {msg.timestamp && (
                    <span className={`text-[10px] block text-right mt-1 ${
                      isMe ? 'text-indigo-200' : 'text-gray-400'
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Message Input Footer */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex items-center space-x-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm transition-all text-gray-700"
          />
        </div>
        
        <button
          type="submit"
          onClick={sendMessage}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transform rotate-45 -mt-0.5 -ml-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </form>

    </div>
  );
  
};

export default Chat;

