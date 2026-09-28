import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");

export const socket = io(SOCKET_URL, { autoConnect: false });

export const connectStaffSocket = (token) => {
    socket.auth = { token };
    if (socket.connected) socket.disconnect(); 
    socket.connect();
};

export const connectPublicSocket = () => {
    if (!socket.connected) socket.connect();
};

export const disconnectSocket = () => socket.disconnect();