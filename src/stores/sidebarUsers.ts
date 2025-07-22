import { create } from "zustand";

interface IUser {
  _id: string;
  name: string;
  lastMessage: {
    content: string;
    createdAt: string;
    sender: string;
  };
  imgUrl: string;
  unreadCount: number;
}

const useSidebarUsers = create<{
  sidebarUsers: IUser[];
  setSidebarUsers: (users: IUser[]) => void;
}>((set) => ({
  sidebarUsers: [],
  setSidebarUsers: (users) => set({ sidebarUsers: users }),
}));

export default useSidebarUsers;
