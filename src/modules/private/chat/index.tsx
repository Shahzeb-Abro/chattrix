import { Sidebar, Chat } from "./components";

export const ChatModule = () => {
  return (
    <main className="w-full  flex  h-dvh ">
      <Sidebar />
      <Chat />
    </main>
  );
};
