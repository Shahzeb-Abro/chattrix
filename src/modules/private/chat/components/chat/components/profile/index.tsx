import { avatarJenny } from "@/constants/images";
import { ProfilePopover } from "../profilePopover";

export const Profile = () => {
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
