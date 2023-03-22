import {
  UPDATE_LOADING,
  GET_IMAGE,
  GET_IMAGE_SUCCESS,
  GET_IMAGE_ERROR,
} from "../actions/types";

const initialState = {
  isLoading: false,
  images: [],
};

export default function ImageReduces(state = initialState, actions) {
  console.log("action: ", JSON.stringify(actions));
  // switch (actions.type) {
  //   case UPDATE_LOADING:
  //     state = { ...state, isLoading: actions.payload };
  //     break;

  //   default:
  //     state = { ...state };
  //     break;
  // }

  return state;
}
