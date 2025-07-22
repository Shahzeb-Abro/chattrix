import { useCallback, useEffect, useRef, useState } from "react";
import { Header, Message, Profile, SendMessageInput } from "./components";
import { getMyMessages } from "@/api/messages";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import socket from "@/lib/socket";
import { useParams } from "react-router-dom";
import { getUserById } from "@/api/user";
import type { IMessage } from "@/types/global";
import useMessages from "@/stores/messages";

export const Chat = ({
  isTyping,
  typingUser,
}: {
  isTyping: boolean;
  typingUser: string | null;
}) => {
  const [isProfileShown, setIsProfileShown] = useState<boolean>(true);
  const { messages, setMessages, addMessage } = useMessages();

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

      addMessage({
        ...message,
        createdAt: new Date(message.createdAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    },
    [myId, id, queryClient, addMessage]
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
  }, [msgs, setMessages]);

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
          setMessages(
            messages.map((message) => ({ ...message, isRead: true }))
          );
        }
      });
    }
  }, [messages.length, id, myId, setMessages, messages]);

  useEffect(() => {
    socket.on("private-message", handleNewMessage);

    return () => {
      socket.off("private-message", handleNewMessage);
    };
  }, [id, myId, handleNewMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
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
