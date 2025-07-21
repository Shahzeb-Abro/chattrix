import { AppRouter } from "./routes/AppRouter";
import socket from "./lib/socket";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";

const queryClient = new QueryClient(); // ✅ move outside component so it persists

function App() {
  useEffect(() => {
    const handleConnect = () => {
      console.log("✅ Connected to socket");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?._id) {
        socket.emit("setup", user._id);
      }
    };

    const handleDisconnect = () => {
      console.log("❌ Disconnected from socket");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    // Optional: handle reconnection to re-setup
    socket.on("reconnect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("reconnect", handleConnect);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      {/* <ReactQueryDevtools initialIsOpen={false} position="top" /> */}
    </QueryClientProvider>
  );
}

export default App;
