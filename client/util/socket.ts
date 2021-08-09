import io from "socket.io-client";
import { WS_DOMAIN } from "./constants";

const socket = io(`${WS_DOMAIN}`, {
  reconnection: true,
  reconnectionDelay: 200,
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
