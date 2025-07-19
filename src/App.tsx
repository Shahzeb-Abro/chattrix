import { AppRouter } from "./routes/AppRouter";
import socket from "./lib/socket";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();
  socket.on("connect", () => {
    console.log("Connected to socket");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket");
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ReactQueryDevtools initialIsOpen={false} position="top" />
      </QueryClientProvider>
    </>
  );
}

export default App;
