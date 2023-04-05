import { combineReducers } from "redux";
import appReduces from "./appReduces";
import counterReducers from "./counterReducer";

import imageReduces from "./imageReduces";
import loadingReduces from "./loadingReduces";
import useReduces from "./useReduces";
import tokenReduces from "./tokenReducers";

const rootReducer = combineReducers({
  imageReduces: imageReduces,
  loadingReduces: loadingReduces,
  counterReduces: counterReducers,
  useReduces: useReduces,
  tokenReduces: tokenReduces,
});

export default rootReducer;
