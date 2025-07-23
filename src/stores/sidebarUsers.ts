import type { IUser } from "@/types/global";
import { create } from "zustand";

const useSidebarUsers = create<{
  sidebarUsers: IUser[];
  setSidebarUsers: (users: IUser[]) => void;
}>((set) => ({
  sidebarUsers: [],
  setSidebarUsers: (users) => set({ sidebarUsers: users }),
}));

export default useSidebarUsers;
