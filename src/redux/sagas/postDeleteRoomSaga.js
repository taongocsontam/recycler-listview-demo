import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { POST_DELETE_ROOM } from "../actions/types";
import { postDeleteRoom } from "../../api/socket";
import { getRoomChatFail, getRoomChatSuccess } from "../actions";

function* postDeleteRooms(action) {
  try {
    const response = yield call(postDeleteRoom, action.payload);
    if (response.status == 200) {
      yield put(getRoomChatSuccess(response.data));
    }
  } catch (error) {
    yield put(getRoomChatFail(error));
  }
}

function* postDeleteRoomSaga() {
  yield takeLatest(POST_DELETE_ROOM, postDeleteRooms);
}

export default postDeleteRoomSaga;
