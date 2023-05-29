import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { GET_ROOM_CHAT } from "../actions/types";
import { getRoomChat } from "../../api/socket";
import { getRoomChatFail, getRoomChatSuccess } from "../actions";

function* getRoomChatSaga() {
  try {
    const listRoomChat = yield call(getRoomChat);
    if (listRoomChat.status == 200) {
      yield put(getRoomChatSuccess(listRoomChat.data));
    }
  } catch (error) {
    yield put(getRoomChatFail(error));
    console.log("error:  ", JSON.stringify(error));
  }
}

function* getRoomSaga() {
  yield takeLatest(GET_ROOM_CHAT, getRoomChatSaga);
}

export default getRoomSaga;
