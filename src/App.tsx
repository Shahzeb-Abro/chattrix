import { AppRouter } from "./routes/AppRouter";
import socket from "./lib/socket";

function App() {
  socket.on("connect", () => {
    console.log("Connected to socket");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket");
  });
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
