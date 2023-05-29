import { call, takeEvery, takeLatest } from "redux-saga/effects";
import { POST_DELETE_ROOM } from "../actions/types";
import { postDeleteRoom } from "../../api/socket";

function* postDeleteRooms(action) {
  try {
    yield call(postDeleteRoom, action.payload);
  } catch (error) {}
}

function* postDeleteRoomSaga() {
  yield takeLatest(POST_DELETE_ROOM, postDeleteRooms);
}

export default postDeleteRoomSaga;
