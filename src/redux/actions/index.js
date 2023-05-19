import {
  UPDATE_LOADING,
  GET_IMAGE,
  GET_IMAGE_SUCCESS,
  GET_IMAGE_ERROR,
  INCREMENT,
  DECREMENT,
  ACCESS_TOKEN,
  USER_STORE,
  GET_ROOM_CHAT,
  GET_ROOM_CHAT_SUSCCESS,
  GET_ROOM_CHAT_ERROR,
} from "./types";

export const updateToken = (token) => {
  return {
    type: ACCESS_TOKEN,
    payload: token,
  };
};

export const updateUser = (user) => {
  return {
    type: USER_STORE,
    payload: user,
  };
};

export const updateLoading = (loading) => {
  return {
    type: UPDATE_LOADING,
    payload: loading,
  };
};

export const getDataImage = (count, lenght) => {
  return {
    type: GET_IMAGE,
    payload: {
      count: count,
      lenght: lenght,
    },
  };
};

export const getImageSuccess = (image) => {
  return {
    type: GET_IMAGE_SUCCESS,
    payload: image,
  };
};

export const getImageError = (error) => {
  return {
    type: GET_IMAGE_ERROR,
    payload: error,
  };
};

export const getRoomchatAction = () => {
  return {
    type: GET_ROOM_CHAT,
    payload: "",
  };
};

export const getRoomChatSuccess = (listRoom) => {
  return {
    type: GET_ROOM_CHAT_SUSCCESS,
    payload: listRoom,
  };
};

export const getRoomChatFail = (error) => {
  return {
    type: GET_ROOM_CHAT_ERROR,
    payload: error,
  };
};
