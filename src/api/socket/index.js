import SocketIOClient, { io } from "socket.io-client";
import { API_AUTH_URL } from "../videosdk/api";
import { getData } from "..";
import { API_GET_ALL_ROOM_CHAT } from "./api";

export const socketIO = io.connect(API_AUTH_URL);

export const getRoomChat = async () => {
  try {
    const responses = await getData(API_GET_ALL_ROOM_CHAT, null, false);
    return responses;
  } catch (error) {
    console.log("get room error:  ", JSON.stringify(error));
  }
};
