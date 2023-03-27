import { UPDATE_LOADING } from "../actions/types";

const loadingReduces = (state = false, actions) => {
  switch (actions.type) {
    case UPDATE_LOADING:
      return (state = { ...state, isloading: actions.payload });
    default:
      return state;
  }
};
export default loadingReduces;
