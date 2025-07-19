import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import socket from "@/lib/socket";

export const SendMessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message) return;
    const senderId = localStorage.getItem("senderId");
    const receiverId = localStorage.getItem("receiverId");
    socket.emit("private-message", {
      content: message,
      senderId,
      receiverId,
    });
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="p-3 px-6  bg-surface border-t border-neutral-200 dark:border-neutral-800  ">
      <div className="w-full h-12  rounded-lg border border-slate-300 dark:bg-neutral-700  dark:border-neutral-600  bg-white focus:outline-none focus:shadow-sm flex items-center justify-between">
        <Paperclip className="size-6 text-neutral-500 dark:text-neutral-300 ml-4" />
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-3 px-4 text-primary-text focus:outline-none "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div role="button" onClick={handleSendMessage}>
          <Send className="size-6 text-blue-600 dark:text-blue-400 mr-4" />
        </div>
      </div>
    </div>
  );
};
