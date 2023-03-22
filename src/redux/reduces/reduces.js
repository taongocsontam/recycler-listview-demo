import {
  UPDATE_LOADING,
  GET_IMAGE,
  GET_IMAGE_SUCCESS,
  GET_IMAGE_ERROR,
} from "../actions/types";
import { updateLoading } from "../actions/index";

const initialState = {
  isLoading: false,
  images: [],
};

const ImageReduces = (state = initialState, actions) => {
  return state;
};

export default ImageReduces;
