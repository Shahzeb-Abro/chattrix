import { Settings } from "lucide-react";
import {
  avatarJenny,
  avatarJohn,
  avatarWilliam,
} from "../../../../../constants/images";

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessages: number;
  avatar: string;
  active: boolean;
};

const CHATS: Chat[] = [
  {
    id: 1,
    avatar: avatarJohn,
    name: "John Doe",
    lastMessage: "Hello, hows it going?",
    lastMessageTime: "12:00",
    unreadMessages: 1,
    active: false,
  },
  {
    id: 2,
    avatar: avatarJenny,
    name: "Jenny ",
    lastMessage: "Hello, how are you?",
    lastMessageTime: "12:00",
    unreadMessages: 9,
    active: true,
  },
  {
    id: 2,
    avatar: avatarWilliam,
    name: "William",
    lastMessage: "Hope u r well, I wanted to ask something",
    lastMessageTime: "12:00",
    unreadMessages: 3,
    active: false,
  },
];

export const Sidebar = () => {
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
        {CHATS.map((chat) => (
          <div
            key={chat.id}
            className={`${
              chat.active && "bg-neutral-0 dark:bg-neutral-900"
            } flex items-center gap-3 p-2 rounded-lg`}
          >
            <div className="flex-shrink-0">
              <img
                src={chat.avatar}
                alt="Avatar"
                className="size-10 rounded-full"
              />
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
                {chat.lastMessageTime}PM
              </div>
              <div className="text-preset-9 bg-blue-600 text-white rounded-full size-5 flex items-center justify-center">
                {chat.unreadMessages}
              </div>
            </div>
          </div>
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
