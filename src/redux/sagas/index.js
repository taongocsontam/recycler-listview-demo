import { all, fork } from "redux-saga/effects";
import imageSaga from "./imageSaga";
import getRoomSaga from "./getRoomSaga";
import postDeleteRoomSaga from "./postDeleteRoomSaga";

export default function* rootSaga() {
  yield all([imageSaga(), getRoomSaga(), postDeleteRoomSaga()]);
}
