import { ProfilePopover } from "../profilePopover";

interface IUser {
  _id: string;
  name: string;
  imgUrl?: string;
  createdAt: string;
  email: string;
  __v: number;
}

export const Profile = ({ user }: { user: IUser }) => {
  return (
    <div className="max-w-[350px] w-full h-full flex flex-col  items-center border-l border-neutral-200 dark:border-neutral-800">
      <div className="p-4 bg-white dark:bg-neutral-900 flex items-center justify-between w-full border-b border-neutral-200 dark:border-neutral-800">
        <span>{user?.name}</span>
        <ProfilePopover />
      </div>
      <div className="flex flex-col items-center gap-4 mt-8 px-4">
        <div>
          {user?.imgUrl ? (
            <img
              src={user.imgUrl}
              alt="avatar"
              className="size-20 rounded-full"
            />
          ) : (
            <div className="size-20 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex flex-col text-center">
          <span className="text-preset-6 font-semibold text-primary-text">
            {user?.name}
          </span>
          <span className="text-preset-7 font-medium text-secondary-text">
            {user?.email}
          </span>
        </div>
      </div>
    </div>
  );
};
