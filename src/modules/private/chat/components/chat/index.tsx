import { useCallback, useEffect, useRef, useState } from "react";
import { Header, Message, Profile, SendMessageInput } from "./components";
import { getMyMessages } from "@/api/messages";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import socket from "@/lib/socket";
import { useParams } from "react-router-dom";
import type { IMessage, IUser } from "@/types/global";
import useMessages from "@/stores/messages";
import useSidebarUsers from "@/stores/sidebarUsers";

export const Chat = ({
  isTyping,
  typingUser,
}: {
  isTyping: boolean;
  typingUser: string | null;
}) => {
  const [isProfileShown, setIsProfileShown] = useState<boolean>(true);
  const { messages, setMessages, addMessage } = useMessages();
  const { sidebarUsers } = useSidebarUsers();

  const { id } = useParams();

  const user = sidebarUsers.find((user) => user._id === id);

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

      addMessage(message);
    },
    [myId, id, queryClient, addMessage]
  );

  useEffect(() => {
    if (msgs) {
      setMessages(msgs);
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
        user={user as IUser}
        typingUser={typingUser}
      />
      <div className="flex-1 flex ">
        <div className="flex-1">
          {/* Messages  */}
          <div className=" py-2 flex flex-col  flex-1 overflow-y-auto h-[calc(100dvh-65px-73px)] bg-white dark:bg-transparent">
            {messages?.map((message: IMessage, index: number) => (
              <Message
                key={message._id}
                message={message}
                previousMessage={messages[index - 1] || {}}
              />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Send Message Input  */}
          <SendMessageInput />
        </div>

        {/* Profile  */}
        {isProfileShown && <Profile user={user as IUser} />}
      </div>
    </div>
  );
};
