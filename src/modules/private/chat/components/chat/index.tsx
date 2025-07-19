import { useEffect, useState } from "react";
import { Header, Message, Profile, SendMessageInput } from "./components";
import { getMyMessages } from "@/api/messages";
import { useQuery } from "@tanstack/react-query";
import socket from "@/lib/socket";

interface IMessage {
  id: string;
  sender: "me" | "other";
  content: string;
  timestamp: string;
}

// const MESSAGES: Message[] = [
//   {
//     id: 1,
//     sender: "me",
//     content:
//       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
//     timestamp: "09:02 AM",
//   },
//   {
//     id: 2,
//     sender: "other",
//     content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
//       eveniet delectus ipsum accusantium aperiam magni, quaerat soluta
//       debitis distinctio perferendis! Nulla, explicabo? Deleniti non
//       perspiciatis vero at asperiores fuga sint maiores cumque iusto
//       aliquid praesentium quia voluptates, eos tenetur? Minus minima ad,
//       voluptas quis laborum est iure eaque eum quam.`,
//     timestamp: "09:02 AM",
//   },
//   {
//     id: 3,
//     sender: "me",
//     content: "Do you think we can make it work?",
//     timestamp: "09:02 AM",
//   },
//   {
//     id: 4,
//     sender: "other",
//     content: "I think so, but I'm not sure.",
//     timestamp: "09:02 AM",
//   },
//   {
//     id: 5,
//     sender: "me",
//     content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
//       eveniet delectus ipsum accusantium aperiam magni, quaerat soluta
//       debitis distinctio perferendis! Nulla, explicabo? Deleniti non
//       perspiciatis vero at asperiores fuga sint maiores cumque iusto
//       aliquid praesentium quia voluptates, eos tenetur? Minus minima ad,
//       voluptas quis laborum est iure eaque eum quam.`,
//     timestamp: "09:02 AM",
//   },
//   {
//     id: 6,
//     sender: "other",
//     content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
//       eveniet delectus ipsum accusantium aperiam magni, quaerat soluta
//       debitis distinctio perferendis! Nulla, explicabo? Deleniti non
//       perspiciatis vero at asperiores fuga sint maiores cumque iusto
//       aliquid praesentium quia voluptates, eos tenetur? Minus minima ad,
//       voluptas quis laborum est iure eaque eum quam.`,
//     timestamp: "09:02 AM",
//   },
// ];

interface MessageAPI {
  _id: string;
  sender: string;
  content: string;
  createdAt: string;
}

export const Chat = () => {
  const [isProfileShown, setIsProfileShown] = useState<boolean>(true);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useState<HTMLAudioElement | null>(null);
  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMyMessages(localStorage.getItem("receiverId") || ""),
    refetchInterval: 600000,
    refetchOnWindowFocus: false,
  });

  const msgs = data?.messages;

  useEffect(() => {
    const handleNewMessage = (message: {
      _id: string;
      message: string;
      senderId: string;
      createdAt: string;
    }) => {
      if (message.senderId !== localStorage.getItem("senderId")) {
        const notificationAudio = new Audio("/sounds/message-notification.mp3");
        console.log(
          "I am here now",
          message.senderId,
          localStorage.getItem("senderId")
        );
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
          sender:
            message.senderId === localStorage.getItem("senderId")
              ? "me"
              : "other",
          timestamp: new Date(message.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    };

    socket.on("private-message", handleNewMessage);

    return () => {
      socket.off("private-message", handleNewMessage);
    };
  }, []);

  useEffect(() => {
    if (msgs) {
      const formattedMessages = msgs?.map((message: MessageAPI) => ({
        id: message._id,
        sender:
          message.sender === localStorage.getItem("senderId") ? "me" : "other",
        content: message.content,
        timestamp: new Date(message.createdAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      setMessages(formattedMessages);
    }
  }, [msgs]);

  return (
    <div className="w-full h-dvh relative bg-surface flex flex-col">
      {/* Header  */}
      <Header
        isProfileShown={isProfileShown}
        setIsProfileShown={setIsProfileShown}
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
          </div>

          {/* Send Message Input  */}
          <SendMessageInput />
        </div>

        {/* Profile  */}
        {isProfileShown && <Profile />}
      </div>
    </div>
  );
};
