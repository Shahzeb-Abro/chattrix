import { useEffect, useRef, useState } from "react";
import { Header, Message, Profile, SendMessageInput } from "./components";
import { getMyMessages } from "@/api/messages";
import { QueryClient, useQuery } from "@tanstack/react-query";
import socket from "@/lib/socket";
import { useParams } from "react-router-dom";
import { getUserById } from "@/api/user";

interface IMessage {
  id: string;
  sender: "me" | "other";
  content: string;
  timestamp: string;
}

interface MessageAPI {
  _id: string;
  sender: string;
  content: string;
  createdAt: string;
}

export const Chat = () => {
  const queryClient = new QueryClient();
  const [isProfileShown, setIsProfileShown] = useState<boolean>(true);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const { id } = useParams();

  const { data: userData } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id,
  });

  const user = userData?.data;

  const senderId = JSON.parse(localStorage.getItem("user") || "{}")?._id;

  const { data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMyMessages(id as string),
    enabled: !!id,
  });

  console.log("receiver id", id);
  console.log("Data", data);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const msgs = data?.messages;

  console.log("Messages", msgs);

  useEffect(() => {
    const handleTyping = ({ senderId }: { senderId: string }) => {
      if (senderId === id) {
        setIsTyping(true);
      }
    };

    const handleStopTyping = ({ senderId }: { senderId: string }) => {
      if (senderId === id) {
        setIsTyping(false);
      }
    };

    socket.on("typing", handleTyping);
    socket.on("stop-typing", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop-typing", handleStopTyping);
    };
  }, [id]);

  useEffect(() => {
    const handleNewMessage = (message: {
      _id: string;
      message: string;
      senderId: string;
      createdAt: string;
    }) => {
      if (message.senderId === id) {
        const notificationAudio = new Audio("/sounds/message-notification.mp3");

        notificationAudio.currentTime = 0; // rewind to start

        notificationAudio.play().catch((err) => {
          console.warn("Audio play blocked", err);
        });
      }

      setMessages((prev: IMessage[]) => [
        ...prev,
        {
          id: message._id,
          content: message.message,
          sender: message.senderId === senderId ? "me" : "other",
          timestamp: new Date(message.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      queryClient.invalidateQueries({ queryKey: ["users"] });
    };

    socket.on("private-message", handleNewMessage);

    return () => {
      socket.off("private-message", handleNewMessage);
    };
  }, [queryClient, id, senderId]);

  useEffect(() => {
    if (msgs) {
      console.log("Msgs", msgs);
      const formattedMessages = msgs?.map((message: MessageAPI) => ({
        id: message._id,
        sender: message.sender === senderId ? "me" : "other",
        content: message.content,
        timestamp: new Date(message.createdAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      setMessages(formattedMessages);
    }
  }, [msgs, senderId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-dvh relative bg-surface flex flex-col">
      {/* Header  */}
      <Header
        isProfileShown={isProfileShown}
        setIsProfileShown={setIsProfileShown}
        isTyping={isTyping}
        user={user}
      />
      <div className="flex-1 flex ">
        <div className="flex-1">
          {/* Messages  */}
          <div className=" py-2 flex flex-col  flex-1 overflow-y-auto h-[calc(100dvh-65px-73px)]">
            <div className="text-preset-9 text-tertiary-text text-center my-2">
              Today
            </div>

            {messages?.map((message: IMessage) => (
              <Message key={message.id} {...message} />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Send Message Input  */}
          <SendMessageInput />
        </div>

        {/* Profile  */}
        {isProfileShown && <Profile user={user} />}
      </div>
    </div>
  );
};
