import { combineReducers } from "redux";
import produce from "immer";

import ImageReduces from "./reduces";

const appReduces = combineReducers({
  ImageReduces,
});

const rootReducer = () => {
  return appReduces();
};

export default rootReducer;
