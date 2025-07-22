import { Phone, User2, Video } from "lucide-react";

interface IUser {
  _id: string;
  name: string;
  imgUrl?: string;
  createdAt: string;
  email: string;
  __v: number;
}

export const Header = ({
  isProfileShown,
  setIsProfileShown,
  isTyping,
  user,
  typingUser,
}: {
  isProfileShown: boolean;
  setIsProfileShown: (isProfileShown: boolean) => void;
  isTyping: boolean;
  user: IUser;
  typingUser: string | null;
}) => {
  console.log(typingUser, user?._id);
  return (
    <div className=" border-b border-neutral-200 dark:border-neutral-800 p-3 px-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div>
          {user?.imgUrl ? (
            <img
              src={user.imgUrl}
              alt="avatar"
              className="size-10 rounded-full"
            />
          ) : (
            <div className="size-10 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-preset-7 font-semibold text-primary-text">
            {user?.name}
          </div>
          <div className="text-preset-8 font-medium text-blue-600 dark:text-blue-400">
            {isTyping && typingUser === user?._id ? "Typing..." : "Online"}
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
  );
};
