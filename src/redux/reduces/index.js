import { combineReducers } from "redux";

import ImageReduces from "./reduces";

const appReduces = combineReducers({
  imageReduces: ImageReduces,
});

const rootReducer = () => {
  return appReduces();
};

export default rootReducer;
