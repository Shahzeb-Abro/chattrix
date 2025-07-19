import { Settings } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/api/user";
import ROUTES from "@/constants/routes";
import { Link, useParams } from "react-router-dom";
import { avatarJohn } from "@/constants/images";

interface IUser {
  _id: string;
  name: string;
  lastMessage: {
    content: string;
    createdAt: string;
  };
  imgUrl: string;
}

interface IChat {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  imgUrl: string;
}

export const Sidebar = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const { id } = useParams();

  const users = data?.data;

  const formattedUsers = users?.map((user: IUser) => ({
    id: user._id,
    name: user.name,
    lastMessage: user?.lastMessage?.content,
    lastMessageTime: new Date(user?.lastMessage?.createdAt).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    ),
  }));

  // useEffect(() => {
  //   if (formattedUsers && formattedUsers.length ==) {
  //     navigate(ROUTES.CHAT(formattedUsers[0].id));
  //   }
  // }, [formattedUsers]);

  console.log("Formatted User", formattedUsers);
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
            className={`${
              chat.id === id && "bg-neutral-0 dark:bg-neutral-900"
            } flex items-center gap-3 p-2 rounded-lg`}
          >
            <div className="flex-shrink-0">
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
                {chat.lastMessage}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="text-preset-9 text-tertiary-text">
                {chat.lastMessageTime}
              </div>
              {/* <div className="text-preset-9 bg-blue-600 text-white rounded-full size-5 flex items-center justify-center">
                {chat.unreadMessages}
              </div> */}
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
