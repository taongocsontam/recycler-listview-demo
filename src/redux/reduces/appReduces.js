import {
  GET_IMAGE,
  GET_IMAGE_ERROR,
  GET_IMAGE_SUCCESS,
  UPDATE_LOADING,
} from "../actions/types";
const inittialState = {
  isLoading: false,
  images: [],
  messageError: "",
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
    default:
      return state;
  }
};

export default appReduces;
    