import { avatarJenny } from "@/constants/images";
import { MessagePopover } from "../messagePopover";

interface Message {
  id: string;
  sender: "me" | "other";
  content: string;
  timestamp: string;
}

export const Message = (message: Message) => {
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
