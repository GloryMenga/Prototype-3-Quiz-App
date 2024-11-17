import React, { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socket = io("http://localhost:4000"); // Connect to server

export const SocketProvider = ({ children }) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  return useContext(SocketContext);
};
