import { create } from "zustand";
import type { IMessage } from "@/types/global";

const useMessages = create<{
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  addMessage: (message: IMessage) => void;
  updateMessage: (message: IMessage) => void;
  deleteMessage: (message: IMessage) => void;
}>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  updateMessage: (message) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m._id === message._id ? message : m
      ),
    })),
  deleteMessage: (message) =>
    set((state) => ({
      messages: state.messages.filter((m) => m._id !== message._id),
    })),
}));

export default useMessages;
