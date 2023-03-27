import { combineReducers } from "redux";
import counterReducers from "./counterReducer";

import imageReduces from "./imageReduces";
import loadingReduces from "./loadingReduces";

const rootReducer = combineReducers({
  imageReduces: imageReduces,
  loadingReduces: loadingReduces,
  counterReduces: counterReducers,
});

export default rootReducer;
