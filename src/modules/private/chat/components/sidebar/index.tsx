import { Settings } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/user";
import ROUTES from "@/constants/routes";
import { Link, useParams } from "react-router-dom";
import type { IUser } from "@/types/global";
import useSidebarUsers from "@/stores/sidebarUsers";
import { useEffect } from "react";
import { formatShortTime } from "@/lib/dateTime";
import socket from "@/lib/socket";

export const Sidebar = ({ typingUser }: { typingUser: string | null }) => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const { id } = useParams();
  const { sidebarUsers, setSidebarUsers } = useSidebarUsers();

  const users = data?.data;
  const me = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (users) {
      setSidebarUsers(users);
    }
  }, [users, setSidebarUsers]);

  const handleRead = (id: string) => {
    setSidebarUsers(
      sidebarUsers.map((user) =>
        user._id === id ? { ...user, unreadCount: 0 } : user
      )
    );
  };

  useEffect(() => {
    socket.on("user-online", ({ userId }: { userId: string }) => {
      setSidebarUsers(
        sidebarUsers.map((user) =>
          user._id === userId ? { ...user, isOnline: true } : user
        )
      );
    });

    socket.on("user-offline", ({ userId }: { userId: string }) => {
      setSidebarUsers(
        sidebarUsers.map((user) =>
          user._id === userId
            ? { ...user, isOnline: false, lastSeen: new Date().toISOString() }
            : user
        )
      );
    });

    return () => {
      socket.off("user-online");
      socket.off("user-offline");
    };
  }, [sidebarUsers, setSidebarUsers]);

  return (
    <div className="max-w-[300px]   hidden w-full h-full bg-surface md:flex flex-col gap-5 border-r border-neutral-200  dark:border-neutral-800">
      {/* Logo and Filters  */}
      <div className="px-5 flex flex-col gap-5 pt-5">
        <div className="text-preset-4 font-semibold text-primary-text">
          Chattrix
        </div>

        <div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-12 rounded-lg border border-slate-100 dark:bg-neutral-900 dark:border-neutral-800 p-3 px-4 text-primary-text bg-white focus:outline-none focus:shadow-sm"
          />
        </div>
      </div>

      {/* Chats Overview  */}
      <div className="flex flex-col gap-1 flex-1 overflow-y-auto px-5">
        {sidebarUsers?.map((chat: IUser) => (
          <Link
            to={ROUTES.CHAT(chat._id)}
            key={chat._id}
            onClick={() => {
              handleRead(chat._id);
            }}
            className={`${
              chat._id === id && "bg-neutral-0 dark:bg-neutral-900"
            } flex items-center gap-3 p-2 rounded-lg`}
          >
            <div className="flex-shrink-0 relative">
              {chat?.imgUrl ? (
                <img
                  src={chat.imgUrl}
                  alt="Avatar"
                  className="size-10 rounded-full"
                />
              ) : (
                <div className="size-10 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
                  {chat.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div
                className={`absolute bottom-0 right-0 size-3 rounded-full  border-2 border-white dark:border-neutral-900 ${
                  chat?.isOnline
                    ? "bg-blue-600"
                    : "bg-neutral-200 dark:bg-neutral-600"
                } transition-colors duration-300`}
              ></div>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="text-preset-7 font-semibold text-primary-text">
                {chat.name}
              </div>
              <div className="text-preset-8 font-medium text-secondary-text line-clamp-1">
                {typingUser === chat._id ? (
                  <span className="text-blue-600 dark:text-blue-400">
                    Typing...
                  </span>
                ) : (
                  chat?.lastMessage?.content && (
                    <span
                      className={`${
                        chat?.unreadCount > 0 && "font-bold"
                      } text-secondary-text`}
                    >
                      {chat?.lastMessage.sender}: {chat.lastMessage.content}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {chat?.lastMessage?.createdAt && (
                <div className="text-preset-9 text-tertiary-text">
                  {formatShortTime(chat.lastMessage.createdAt)}
                </div>
              )}
              {chat?.unreadCount > 0 && (
                <div className="text-preset-9 bg-blue-600 text-white rounded-full size-5 flex items-center justify-center">
                  {chat.unreadCount}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Profile and Settings Icon  */}
      <div className="flex items-center gap-3 justify-between  px-5 py-3 border-t border-neutral-200 dark:border-neutral-800">
        {me?.imgUrl ? (
          <img src={me?.imgUrl} alt="Avatar" className="size-8 rounded-full" />
        ) : (
          <div className="size-8 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
            {me?.name?.charAt(0)?.toUpperCase()}
          </div>
        )}
        <Settings className="size-5 text-neutral-500 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" />
      </div>
    </div>
  );
};
