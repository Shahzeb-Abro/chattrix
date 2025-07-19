import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { avatarJenny } from "../../../../../constants/images";
import {
  Phone,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  Copy,
  Trash,
  Forward,
  User2,
  Delete,
} from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  sender: "me" | "other";
  content: string;
  timestamp: string;
}

const MESSAGES: Message[] = [
  {
    id: 1,
    sender: "me",
    content:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    timestamp: "09:02 AM",
  },
  {
    id: 2,
    sender: "other",
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
      eveniet delectus ipsum accusantium aperiam magni, quaerat soluta
      debitis distinctio perferendis! Nulla, explicabo? Deleniti non
      perspiciatis vero at asperiores fuga sint maiores cumque iusto
      aliquid praesentium quia voluptates, eos tenetur? Minus minima ad,
      voluptas quis laborum est iure eaque eum quam.`,
    timestamp: "09:02 AM",
  },
  {
    id: 3,
    sender: "me",
    content: "Do you think we can make it work?",
    timestamp: "09:02 AM",
  },
  {
    id: 4,
    sender: "other",
    content: "I think so, but I'm not sure.",
    timestamp: "09:02 AM",
  },
  {
    id: 5,
    sender: "me",
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
      eveniet delectus ipsum accusantium aperiam magni, quaerat soluta
      debitis distinctio perferendis! Nulla, explicabo? Deleniti non
      perspiciatis vero at asperiores fuga sint maiores cumque iusto
      aliquid praesentium quia voluptates, eos tenetur? Minus minima ad,
      voluptas quis laborum est iure eaque eum quam.`,
    timestamp: "09:02 AM",
  },
  {
    id: 6,
    sender: "other",
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
      eveniet delectus ipsum accusantium aperiam magni, quaerat soluta
      debitis distinctio perferendis! Nulla, explicabo? Deleniti non
      perspiciatis vero at asperiores fuga sint maiores cumque iusto
      aliquid praesentium quia voluptates, eos tenetur? Minus minima ad,
      voluptas quis laborum est iure eaque eum quam.`,
    timestamp: "09:02 AM",
  },
];

export const Chat = () => {
  const [isProfileShown, setIsProfileShown] = useState<boolean>(true);
  return (
    <div className="w-full h-dvh relative bg-surface flex flex-col">
      {/* Header  */}
      <div className=" border-b border-neutral-200 dark:border-neutral-800 p-3 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div>
            <img
              src={avatarJenny}
              alt="avatar"
              className="size-10 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-preset-7 font-semibold text-primary-text">
              Jenny
            </div>
            <div className="text-preset-8 font-medium text-blue-600 dark:text-blue-400">
              Online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="size-8 rounded-full flex items-center justify-center hover:bg-white/50 dark:hover:bg-neutral-900 transition-all">
            <Phone className="size-5 text-neutral-500 dark:text-neutral-300 hover:text-blue-600" />
          </div>
          <div className="size-8 rounded-full flex items-center justify-center hover:bg-white/50 dark:hover:bg-neutral-900 transition-all">
            <Video className="size-5 text-neutral-500 dark:text-neutral-300 hover:text-blue-600" />
          </div>
          <div
            className={`size-8 rounded-full flex items-center justify-center transition-all ${
              isProfileShown
                ? "bg-blue-600/50 dark:bg-neutral-900"
                : "hover:bg-white/50 dark:hover:bg-neutral-900 "
            }`}
          >
            <User2
              className={`size-5 text-neutral-500 dark:text-neutral-300  ${
                isProfileShown ? "text-white" : "hover:text-blue-600"
              }`}
              onClick={() => setIsProfileShown(!isProfileShown)}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 flex ">
        <div className="flex-1">
          {/* Messages  */}
          <div className=" py-2 flex flex-col  flex-1 overflow-y-auto h-[calc(100dvh-65px-73px)]">
            <div className="text-preset-9 text-tertiary-text text-center my-2">
              Today
            </div>

            {MESSAGES.map((message) => (
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

const Message = (message: Message) => {
  return (
    <div
      className={`${
        message.sender === "other"
          ? "bg-blue-50/10 dark:bg-neutral-900"
          : "bg-white dark:bg-transparent"
      } py-5 px-4`}
    >
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            {message.sender === "other" ? (
              <div className="size-8 text-preset-7 bg-tertiary-text rounded-full flex items-center justify-center">
                <img src={avatarJenny} alt="avatar" className="size-full" />
              </div>
            ) : (
              <div className="size-8 text-preset-7 bg-tertiary-text rounded-full flex items-center justify-center">
                S
              </div>
            )}
            <div className="text-preset-9 text-tertiary-text">
              {message.timestamp}
            </div>
          </div>
          <MessagePopover {...message} />
        </div>

        {/* Text  */}
        <div className="text-preset-7  text-primary-text">
          {message.content}
        </div>
      </div>
    </div>
  );
};

const MessagePopover = (message: Message) => {
  return (
    <Popover>
      <PopoverTrigger>
        <MoreVertical className="size-5 text-neutral-500 dark:text-neutral-300 hover:text-blue-600" />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="max-w-[180px] shadow-none p-1 dark:bg-neutral-900 rounded-lg"
      >
        <div className="flex flex-col gap-1">
          <div
            role="button"
            onClick={async () =>
              await navigator.clipboard.writeText(message.content)
            }
            className=" text-primary-text flex items-center gap-2 justify-between p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all rounded-md"
          >
            <span className="text-preset-7 font-medium">Copy</span>
            <Copy className="size-4" />
          </div>
          <div
            role="button"
            className=" text-primary-text flex items-center gap-2 justify-between p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all rounded-md"
          >
            <span className="text-preset-7 font-medium">Forward</span>
            <Forward className="size-4" />
          </div>

          <div
            role="button"
            className=" text-red-600 dark:text-red-400 flex items-center gap-2 justify-between p-2 hover:bg-red-600/10  transition-all rounded-md"
          >
            <span className="text-preset-7 font-medium">Delete</span>
            <Trash className="size-4" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const SendMessageInput = () => {
  return (
    <div className="p-3 px-6  bg-surface border-t border-neutral-200 dark:border-neutral-800  ">
      <div className="w-full h-12  rounded-lg border border-slate-300 dark:bg-neutral-700  dark:border-neutral-600  bg-white focus:outline-none focus:shadow-sm flex items-center justify-between">
        <Paperclip className="size-6 text-neutral-500 dark:text-neutral-300 ml-4" />
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-3 px-4 text-primary-text focus:outline-none "
        />
        <Send className="size-6 text-blue-600 dark:text-blue-400 mr-4" />
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="max-w-[350px] w-full h-full flex flex-col  items-center border-l border-neutral-200 dark:border-neutral-800">
      <div className="p-4 bg-white dark:bg-neutral-900 flex items-center justify-between w-full border-b border-neutral-200 dark:border-neutral-800">
        <span>Jenny Smith</span>
        <ProfilePopover />
      </div>
      <div className="flex flex-col items-center gap-4 mt-8 px-4">
        <div>
          <img
            src={avatarJenny}
            alt="avatar"
            className="size-20 rounded-full"
          />
        </div>
        <div className="flex flex-col text-center">
          <span className="text-preset-6 font-semibold text-primary-text">
            Jenny Smith
          </span>
          <span className="text-preset-7 font-medium text-secondary-text">
            jenny.smith@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
};

const ProfilePopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <MoreVertical className="size-5 text-neutral-500 dark:text-neutral-300 hover:text-blue-600" />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="max-w-[180px] shadow-none p-1 dark:bg-neutral-900 rounded-lg"
      >
        <div className="flex flex-col gap-1">
          <div
            role="button"
            className=" text-primary-text flex items-center gap-2 justify-between p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all rounded-md"
          >
            <span className="text-preset-7 font-medium">Remove Friend</span>
            <Delete className="size-4" />
          </div>
          <div
            role="button"
            className=" text-primary-text flex items-center gap-2 justify-between p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all rounded-md"
          >
            <span className="text-preset-7 font-medium">Block</span>
            <Forward className="size-4" />
          </div>

          <div
            role="button"
            className=" text-red-600 dark:text-red-400 flex items-center gap-2 justify-between p-2 hover:bg-red-600/10  transition-all rounded-md"
          >
            <span className="text-preset-7 font-medium">Delete Chat</span>
            <Trash className="size-4" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
