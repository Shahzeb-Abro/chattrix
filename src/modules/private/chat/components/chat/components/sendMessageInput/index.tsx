import { useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";
import socket from "@/lib/socket";
import { useParams } from "react-router-dom";

export const SendMessageInput = () => {
  const [message, setMessage] = useState("");
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const { id } = useParams();
  const me = JSON.parse(localStorage.getItem("user") || "{}");

  const handleTyping = () => {
    socket.emit("typing", {
      receiverId: id,
      myId: me._id,
    });

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socket.emit("stop-typing", {
        receiverId: id,
      });
    }, 1000); // 1 sec after user stops typing
  };

  const handleSendMessage = () => {
    if (!message) return;
    socket.emit("private-message", {
      content: message,
      senderId: me._id,
      receiverId: id,
    });
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      handleSendMessage();
    }
    handleTyping();
  };

  return (
    <div className="p-3 px-6  bg-surface border-t border-neutral-200 dark:border-neutral-800  ">
      <div className="w-full h-12  rounded-lg border border-slate-300 dark:bg-neutral-900  dark:border-neutral-600  bg-white focus:outline-none focus:shadow-sm flex items-center justify-between">
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
