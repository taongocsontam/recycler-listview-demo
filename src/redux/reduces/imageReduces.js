import {
  UPDATE_LOADING,
  GET_IMAGE,
  GET_IMAGE_SUCCESS,
  GET_IMAGE_ERROR,
} from "../actions/types";

const initialState = {
  images: [],
};

const imageReduces = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_IMAGE_SUCCESS:
      state = { ...state, images: actions.payload };
      break;
    case GET_IMAGE_ERROR:
      state = { ...state };
      break;
    default:
      state = { ...state };
      break;
  }

  return state;
};

export default imageReduces;
