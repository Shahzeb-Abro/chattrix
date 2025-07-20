import { MessagePopover } from "../messagePopover";
import { useParams } from "react-router-dom";
import { getUserById } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

interface Message {
  _id: string;
  sender: "me" | "other";
  content: string;
  timestamp: string;
}

export const Message = (message: Message) => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id,
  });

  const user = data?.data;
  const me = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div
      className={`${
        message.sender === "other"
          ? "bg-blue-50/10 dark:bg-neutral-900"
          : "bg-white dark:bg-transparent"
      } py-2 px-4`}
    >
      <div className="max-w-2xl mx-auto flex items-start  gap-3">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            {message.sender === "other" ? (
              user?.imgUrl ? (
                <div className="size-8 text-preset-7 bg-tertiary-text rounded-full flex items-center justify-center">
                  <img src={user.imgUrl} alt="avatar" className="size-full" />
                </div>
              ) : (
                <div className="size-8 text-preset-7 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  {user?.name?.charAt(0)}
                </div>
              )
            ) : (
              <div className="size-8 text-preset-7 bg-rose-500 text-white rounded-full flex items-center justify-center">
                {me?.name?.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <div className="text-preset-9 text-tertiary-text flex items-center justify-between w-full">
            {message.timestamp}
            <MessagePopover {...message} />
          </div>
          {/* Text  */}
          <div className="text-preset-7  text-primary-text">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};
