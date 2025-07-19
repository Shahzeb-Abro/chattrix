// socket.js or in your component
import { io } from "socket.io-client";

// Use your VPS domain or IP
const socket = io("http://localhost:3017", {
  withCredentials: true,
  transports: ["websocket"], // Optional: forces WebSocket
});

socket.on("connect", () => {
  console.log("✅ Connected to Socket.IO server");
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from Socket.IO server");
});

// You can export this socket instance
export default socket;
