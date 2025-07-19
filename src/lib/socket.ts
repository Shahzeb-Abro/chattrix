// socket.js or in your component
import { io } from "socket.io-client";

// Use your VPS domain or IP
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
  transports: ["websocket"], // Optional: forces WebSocket
});

socket.on("connect", () => {
  console.log("✅ Connected to Socket.IO server");
});

socket.emit("setup", localStorage.getItem("senderId"));

socket.on("disconnect", () => {
  console.log("❌ Disconnected from Socket.IO server");
});

// You can export this socket instance
export default socket;
