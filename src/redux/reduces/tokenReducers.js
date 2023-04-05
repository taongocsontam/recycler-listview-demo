import { ACCESS_TOKEN } from "../actions/types";

const inittalState = {
  token: "",
};
const tokenReduces = (state = inittalState, actions) => {
  switch (actions.type) {
    case ACCESS_TOKEN:
      return (state = { ...state, token: actions.payload });
    default:
      return state;
  }
};
export default tokenReduces;
