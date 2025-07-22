import socket from "@/lib/socket";
import { Sidebar, Chat } from "./components";
import { useEffect, useState } from "react";

export const ChatModule = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  useEffect(() => {
    const handleTyping = ({ senderId }: { senderId: string }) => {
      setTypingUser(senderId);
      setIsTyping(true);
    };

    const handleStopTyping = () => {
      setIsTyping(false);
      setTypingUser(null);
    };

    socket.on("typing", handleTyping);
    socket.on("stop-typing", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop-typing", handleStopTyping);
    };
  }, []);
  return (
    <main className="w-full  flex  h-dvh ">
      <Sidebar typingUser={typingUser} />
      <Chat isTyping={isTyping} typingUser={typingUser} />
    </main>
  );
};
