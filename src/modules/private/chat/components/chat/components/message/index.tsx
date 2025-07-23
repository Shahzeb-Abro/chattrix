import { MessagePopover } from "../messagePopover";
import { useParams } from "react-router-dom";
import { getUserById } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { CheckCheck } from "lucide-react";
import type { IMessage } from "@/types/global";
import { differenceInMinutes, format } from "date-fns";

export const Message = ({
  message,
  previousMessage,
}: {
  message: IMessage;
  previousMessage: IMessage;
}) => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id,
  });

  const user = data?.data;
  const me = JSON.parse(localStorage.getItem("user") || "{}");

  const isSameDay =
    message?.createdAt &&
    previousMessage?.createdAt &&
    format(new Date(message?.createdAt), "MMM d, yyyy") ===
      format(new Date(previousMessage?.createdAt), "MMM d, yyyy");

  const isEnoughDifference =
    message?.createdAt &&
    previousMessage?.createdAt &&
    differenceInMinutes(
      new Date(message?.createdAt),
      new Date(previousMessage?.createdAt)
    ) >= 1;

  const isSameUser =
    message?.sender?._id === previousMessage?.sender?._id &&
    message?.receiver?._id === previousMessage?.receiver?._id;

  return (
    <div>
      {!isSameDay && (
        <div className="flex items-center gap-2 ">
          <div className="flex-1 w-full h-[1px] bg-tertiary-text/20"></div>
          <div className="text-preset-8 font-semibold text-tertiary-text">
            {format(new Date(message?.createdAt), "MMM d, yyyy")}
          </div>
          <div className="flex-1 w-full h-[1px] bg-tertiary-text/20"></div>
        </div>
      )}
      <div
        className={`${
          isSameUser && !isEnoughDifference ? "py-0" : "py-2"
        } px-4 hover:bg-tertiary-text/10 transition-colors duration-300 relative`}
      >
        <div className="max-w-2xl flex items-start group  gap-3">
          <div className="flex items-center gap-2 justify-between">
            {(isEnoughDifference || (!isEnoughDifference && !isSameUser)) && (
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
            )}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="text-preset-9 text-tertiary-text flex items-center justify-between w-full">
              {(isEnoughDifference || (!isEnoughDifference && !isSameUser)) && (
                <div className="flex items-center gap-1">
                  <span className="text-preset-7 text-primary-text">
                    {message.sender?._id === me?._id
                      ? me?.name
                      : message.sender.name}
                  </span>
                  &bull;
                  <span>{format(new Date(message.createdAt), "h:mm a")}</span>
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
              )}
              <span
                className={`${
                  isSameUser && !isEnoughDifference && "hidden"
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              >
                <MessagePopover {...message} />
              </span>
            </div>
            {/* Text  */}
            <div
              className={`text-preset-7  text-secondary-text ${
                isSameUser &&
                !isEnoughDifference &&
                "ml-8 flex items-start gap-2 justify-between"
              }`}
            >
              {message.content}
              {isSameUser && !isEnoughDifference && (
                <span
                  className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  <MessagePopover {...message} />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
