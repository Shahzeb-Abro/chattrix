import { Settings } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/user";
import ROUTES from "@/constants/routes";
import { Link, useParams } from "react-router-dom";
import { avatarJohn } from "@/constants/images";
import { formatShortTime } from "@/lib/dateTime";
import type { IUser, IChat } from "@/types/global";
import useSidebarUsers from "@/stores/sidebarUsers";
import { useEffect } from "react";

export const Sidebar = ({ typingUser }: { typingUser: string | null }) => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const { id } = useParams();
  const { sidebarUsers, setSidebarUsers } = useSidebarUsers();

  const users = data?.data;

  useEffect(() => {
    if (users) {
      setSidebarUsers(users);
    }
  }, [users, setSidebarUsers]);

  const formattedUsers = sidebarUsers?.map((user: IUser) => ({
    id: user._id,
    name: user.name,
    lastMessage: user?.lastMessage?.content,
    lastMessageTime: user?.lastMessage?.createdAt
      ? formatShortTime(user?.lastMessage?.createdAt)
      : null,
    sender: user?.lastMessage?.sender,
    imgUrl: user?.imgUrl,
    unreadCount: user?.unreadCount,
  }));

  const handleRead = (id: string) => {
    setSidebarUsers(
      sidebarUsers.map((user) =>
        user._id === id ? { ...user, unreadCount: 0 } : user
      )
    );
  };

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
        {formattedUsers?.map((chat: IChat) => (
          <Link
            to={ROUTES.CHAT(chat.id)}
            key={chat.id}
            onClick={() => {
              handleRead(chat.id);
            }}
            className={`${
              chat.id === id && "bg-neutral-0 dark:bg-neutral-900"
            } flex items-center gap-3 p-2 rounded-lg`}
          >
            <div className="flex-shrink-0 relative">
              {chat.imgUrl ? (
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
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="text-preset-7 font-semibold text-primary-text">
                {chat.name}
              </div>
              <div className="text-preset-8 font-medium text-secondary-text line-clamp-1">
                {typingUser === chat.id ? (
                  <span className="text-blue-600 dark:text-blue-400">
                    Typing...
                  </span>
                ) : (
                  chat?.lastMessage && (
                    <span
                      className={`${
                        chat?.unreadCount > 0 && "font-bold"
                      } text-secondary-text`}
                    >
                      {chat?.sender && chat.sender}: {chat.lastMessage}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {chat?.lastMessageTime && (
                <div className="text-preset-9 text-tertiary-text">
                  {chat.lastMessageTime}
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
        <img src={avatarJohn} alt="Avatar" className="size-8 rounded-full" />
        <Settings className="size-5 text-neutral-500 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" />
      </div>
    </div>
  );
};
