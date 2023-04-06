import { combineReducers } from "redux";
import appReduces from "./appReduces";

const rootReducer = combineReducers({
  appReduces: appReduces,
});

export default rootReducer;
