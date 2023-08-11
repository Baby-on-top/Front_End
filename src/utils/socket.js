import { createContext } from "react";
import socketIo from "socket.io-client";

export const socket = socketIo(process.env.REACT_APP_SOCKET_API_URL, {
  path: "/socket.io",
});
export const SocketContext = createContext(socket);

socket.on("connect", () => {
  console.log("socket server connected.");
});

socket.on("disconnect", () => {
  console.log("socket server disconnected.");
});
