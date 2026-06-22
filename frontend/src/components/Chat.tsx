import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import type { RootState } from "../utils/Store";
import { createSocketConnection } from "../utils/socket";
import BASE_URL from "../utils/constant";

type ChatMessage = {
  senderId?: string;
  firstName?: string;
  text: string;
  timestamp: any;
};

const Chat = () => {
  const { targetUserId } = useParams();

  const user = useSelector((store: RootState) => store.user);
  const userId = user?._id;

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Array<{ senderId: string; firstName: string; text: string; timestamp: any }>>([]);

  const socketRef = useRef<ReturnType<typeof import("socket.io-client").io> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch old messages
  type BackendMessage = {
    senderId?: { _id: string; firstName?: string };
    text: string;
    createdAt?: string;
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/chat/" + targetUserId,
        {
          withCredentials: true,
        }
      );

      const rawMessages = res.data?.chat?.messages as BackendMessage[] | undefined;

      const chatMessages = (rawMessages ?? []).map((msg) => ({
        senderId: msg.senderId?._id,
        firstName: msg.senderId?.firstName ?? "",
        text: msg.text,
        timestamp: msg.createdAt,
      }));

      setMessages(chatMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [targetUserId]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

 

  // Socket Connection
  useEffect(() => {
    if (!userId || !targetUserId) return;

    socketRef.current = createSocketConnection();
 socketRef.current.on("connect", () => {
  console.log("Connected");
});

socketRef.current.on("connect_error", (err) => {
  console.log(err.message);
});
    socketRef.current.emit("joinChat", {
      // firstName: user?.firstName,
      // userId,
      targetUserId,
    });

    socketRef.current.on(
      "messageReceived",
      ({ firstName, senderId, text, timestamp }) => {
 console.log("Message Received:", text);
        setMessages((prev) => [
          ...prev,
          {
            senderId,
            firstName,
            text,
            timestamp: timestamp || new Date(),
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
      // firstName: user?.firstName,
      // userId,
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
    <div className="max-w-3xl mx-auto my-6 h-[80vh] flex flex-col border border-slate-200 rounded-2xl shadow-xl bg-white overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 bg-linear-to-r from-indigo-600 to-violet-600 text-white">
        <h2 className="font-semibold text-lg">
          {user?.firstName}
        </h2>
        <p className="text-xs text-indigo-200">
          Active
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50">

        {messages.length === 0 ? (
          <div className="h-full flex justify-center items-center text-slate-400">
            No messages yet
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe =
              msg.senderId?.toString() ===
              userId?.toString();

            return (
              <div
                key={index}
                className={`chat ${
                  isMe ? "chat-end" : "chat-start"
                } mb-3`}
              >
                <div className="chat-header text-xs text-gray-500">
                  {msg.firstName}
                </div>

                <div
                  className={`chat-bubble ${
                    isMe
                      ? "chat-bubble-primary"
                      : "chat-bubble-neutral"
                  }`}
                >
                  {msg.text}
                </div>

                <div className="chat-footer text-xs opacity-60">
                  {msg.timestamp
                    ? new Date(
                        msg.timestamp
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </div>
              </div>
            );
          })
        )}

        <div ref={messagesEndRef}></div>
      </div>

     
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t bg-white flex gap-2"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) =>
            setMessageText(e.target.value)
          }
          className="flex-1 border border-slate-300 text-black rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="px-5 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;