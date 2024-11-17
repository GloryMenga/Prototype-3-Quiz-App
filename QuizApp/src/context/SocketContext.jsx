import React, { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socket = io("http://localhost:4000"); 

export const SocketProvider = ({ children }) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  return useContext(SocketContext);
};

socket.on("connect", () => {
  console.log("Connected to the server with ID:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Connection error:", err.message);
});

socket.on("disconnect", (reason) => {
  console.warn("Disconnected from server:", reason);
});
