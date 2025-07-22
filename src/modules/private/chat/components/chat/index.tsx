import { useCallback, useEffect, useRef, useState } from "react";
import { Header, Message, Profile, SendMessageInput } from "./components";
import { getMyMessages } from "@/api/messages";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import socket from "@/lib/socket";
import { useParams } from "react-router-dom";
import { getUserById } from "@/api/user";
import type { IMessage } from "@/types/global";

export const Chat = ({
  isTyping,
  typingUser,
}: {
  isTyping: boolean;
  typingUser: string | null;
}) => {
  const [isProfileShown, setIsProfileShown] = useState<boolean>(true);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { id } = useParams();

  const { data: userData } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id,
  });

  const user = userData?.data;

  const myId = JSON.parse(localStorage.getItem("user") || "{}")?._id;
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMyMessages(id as string),
    enabled: !!id,
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
  });

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const msgs = data?.messages;

  const handleNewMessage = useCallback(
    (message: IMessage) => {
      if (message.receiver._id == myId) {
        const notificationAudio = new Audio("/sounds/message-notification.mp3");

        notificationAudio.currentTime = 0; // rewind to start

        notificationAudio.play().catch((err) => {
          console.warn("Audio play blocked", err);
        });
      }

      queryClient.invalidateQueries({ queryKey: ["users"] });

      // Emit mark-as-read if the message is for the currently open chat
      if (message.sender._id === id && message.receiver._id === myId) {
        socket.emit("mark-as-read", {
          senderId: id,
          receiverId: myId,
        });
      }

      setMessages((prev: IMessage[]) => [
        ...prev,
        {
          _id: message._id,
          content: message.content,
          sender: {
            _id: message.sender._id,
            name: message.sender.name,
            imgUrl: message.sender.imgUrl,
          },
          receiver: {
            _id: message.receiver._id,
            name: message.receiver.name,
            imgUrl: message.receiver.imgUrl,
          },
          createdAt: new Date(message.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isRead: message.isRead,
          deliveredAt: message.deliveredAt,
        },
      ]);
    },
    [myId, id, queryClient]
  );

  useEffect(() => {
    if (msgs) {
      const formattedMessages = msgs?.map((message: IMessage) => ({
        _id: message._id,
        sender: message.sender,
        content: message.content,
        createdAt: new Date(message.createdAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isRead: message.isRead,
        receiver: {
          _id: message.receiver._id,
          name: message.receiver.name,
          imgUrl: message.receiver.imgUrl,
        },
        deliveredAt: message.deliveredAt,
      }));
      setMessages(formattedMessages);
    }
  }, [msgs]);

  useEffect(() => {
    if (id) {
      socket.emit("mark-as-read", {
        senderId: id,
        receiverId: myId,
      });
    }
  }, [id, myId]);

  useEffect(() => {
    if (id) {
      socket.on("mark-as-read", ({ receiverId }: { receiverId: string }) => {
        if (receiverId === id) {
          setMessages((prevMessages) =>
            prevMessages.map((message) => {
              console.log("message", message);
              if (message.receiver._id === id) {
                return { ...message, isRead: true };
              }
              return message;
            })
          );
        }
      });
    }
  }, [messages.length, id, myId, queryClient]);

  useEffect(() => {
    socket.on("private-message", handleNewMessage);

    return () => {
      socket.off("private-message", handleNewMessage);
    };
  }, [id, myId, handleNewMessage]);

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
        typingUser={typingUser}
      />
      <div className="flex-1 flex ">
        <div className="flex-1">
          {/* Messages  */}
          <div className=" py-2 flex flex-col  flex-1 overflow-y-auto h-[calc(100dvh-65px-73px)] bg-white dark:bg-transparent">
            <div className="text-preset-9 text-tertiary-text text-center my-2">
              Today
            </div>

            {messages?.map((message: IMessage) => (
              <Message key={message._id} message={message} />
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
