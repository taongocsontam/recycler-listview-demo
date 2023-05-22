import {
  GET_IMAGE,
  GET_IMAGE_ERROR,
  GET_IMAGE_SUCCESS,
  UPDATE_LOADING,
  USER_STORE,
  ACCESS_TOKEN,
  GET_ROOM_CHAT,
  GET_ROOM_CHAT_SUSCCESS,
  GET_ROOM_CHAT_ERROR,
} from "../actions/types";
const inittialState = {
  isLoading: false,
  images: [],
  messageError: "",
  token: null,
  userState: {
    signIn: false,
    userToken: null,
    user: null,
  },
  listRoom: [],
};
const appReduces = (state = inittialState, actions) => {
  switch (actions.type) {
    case UPDATE_LOADING:
      return { ...state, isLoading: actions.payload };
    case GET_IMAGE:
      return { ...state };
    case GET_IMAGE_SUCCESS:
      return { ...state, images: actions.payload };
    case GET_IMAGE_ERROR:
      return { ...state, messageError: actions.payload };
    case USER_STORE:
      state = { ...state, userState: actions.payload };
      break;
    case ACCESS_TOKEN:
      return { ...state, token: actions.payload };
    case GET_ROOM_CHAT:
      return { ...state };
    case GET_ROOM_CHAT_SUSCCESS:
      return { ...state, listRoom: actions.payload };
    case GET_ROOM_CHAT_ERROR:
      return { ...state, messageError: actions.payload };
    default:
      return state;
  }
};

export default appReduces;
