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

export default function ImageReduces(state = initialState, actions) {
  console.log("action: ", JSON.stringify(actions));
  return state;
}
