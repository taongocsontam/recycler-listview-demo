import React from "react";
import { USER_STORE } from "../actions/types";

const initalState = {
  user: {},
};

const useReduces = (state = initalState, action) => {
  switch (action.type) {
    case USER_STORE:
      state = { ...state, user: action.payload };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default useReduces;
