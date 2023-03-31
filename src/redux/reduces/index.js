import { combineReducers } from "redux";
import appReduces from "./appReduces";
import counterReducers from "./counterReducer";

import imageReduces from "./imageReduces";
import loadingReduces from "./loadingReduces";

const rootReducer = combineReducers({
  imageReduces: imageReduces,
  loadingReduces: loadingReduces,
  counterReduces: counterReducers,
  // appReduces: appReduces,
});

export default rootReducer;
