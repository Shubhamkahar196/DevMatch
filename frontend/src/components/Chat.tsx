import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../utils/Store";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();

  const user = useSelector((store: RootState) => store.user);

  const userId = user?._id;

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socketRef.current.on(
      "messageReceived",
      ({ firstName, text, senderId }) => {
        setMessages((prev) => [
          ...prev,
          {
            senderId,
            firstName,
            text,
            timestamp: new Date(),
          },
        ]);
      }
    );

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!messageText.trim()) return;

    socketRef.current.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      targetUserId,
      text: messageText,
    });

    setMessageText("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="max-w-2xl mx-auto my-6 h-[80vh] flex flex-col border border-slate-200 rounded-2xl shadow-xl bg-white overflow-hidden">
      
      {/* Modern Gradient Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 text-white font-bold rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm tracking-wider">
              {user?.firstName ? user.firstName.substring(0, 2).toUpperCase() : "CH"}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h2 className="font-semibold text-base leading-tight tracking-wide">
              {user?.firstName}
            </h2>
            <p className="text-indigo-200 text-xs mt-0.5 font-medium">Active Session</p>
          </div>
        </div>
      </div>

      {/* Modern Message Threads Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9a8.25 8.25 0 0 1-4.875-1.577l-4.237 1.146.12-.127c.432-.456.852-.98 1.192-1.523C2.316 14.842 2 13.455 2 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            <p className="text-sm font-medium">No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.senderId === userId;

            return (
              <div
                key={index}
                className={`flex ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl shadow-sm text-sm leading-relaxed break-words transition-all ${
                    isMe
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-200/60 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modern Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white border-t border-slate-100 flex items-center space-x-3"
      >
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-3 text-sm transition-all text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-full shadow-md hover:shadow-lg font-medium text-sm transition-all transform active:scale-95"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;