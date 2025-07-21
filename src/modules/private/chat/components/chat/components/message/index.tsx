import { MessagePopover } from "../messagePopover";
import { useParams } from "react-router-dom";
import { getUserById } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { CheckCheck } from "lucide-react";
import type { IMessage } from "@/types/global";

export const Message = ({ message }: { message: IMessage }) => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id,
  });

  const user = data?.data;
  const me = JSON.parse(localStorage.getItem("user") || "{}");

  // ${
  //   message.sender._id === me._id
  //     ? "bg-blue-50/30 dark:bg-neutral-900"
  //     : "bg-white dark:bg-transparent"
  // }

  return (
    <div className={` py-2 px-4`}>
      <div className="max-w-2xl flex items-start group  gap-3">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            {message.sender._id !== me._id ? (
              user?.imgUrl ? (
                <div className="size-8 text-preset-7 bg-tertiary-text rounded-full flex items-center justify-center">
                  <img
                    src={user?.imgUrl}
                    alt="avatar"
                    className="size-full rounded-full"
                  />
                </div>
              ) : (
                <div className="size-8 text-preset-7 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  {user?.name?.charAt(0)}
                </div>
              )
            ) : me.imgUrl ? (
              <div className="size-8 text-preset-7 bg-tertiary-text rounded-full flex items-center justify-center">
                <img
                  src={me.imgUrl}
                  alt="avatar"
                  className="size-full rounded-full"
                />
              </div>
            ) : (
              <div className="size-8 text-preset-7 bg-rose-500 text-white rounded-full flex items-center justify-center">
                {me?.name?.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <div className="text-preset-9 text-tertiary-text flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <span className="text-preset-7 text-primary-text">
                {message.sender?._id === me?._id
                  ? me?.name
                  : message.sender.name}
              </span>
              &bull;
              <span>{message.createdAt}</span>
              {message.sender._id === me._id && (
                <>
                  &bull;
                  <div className="flex items-center gap-1 justify-end">
                    <CheckCheck
                      className={`size-4  ${
                        message.isRead
                          ? "text-blue-600"
                          : "text-tertiary-text/50"
                      }`}
                    />
                  </div>
                </>
              )}
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <MessagePopover {...message} />
            </span>
          </div>
          {/* Text  */}
          <div className="text-preset-7  text-secondary-text">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};
