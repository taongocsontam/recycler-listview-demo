import { all, fork } from "redux-saga/effects";
import imageSaga from "./imageSaga";
import loadingSaga from "./loadingSaga";
import useSaga from "./useSaga";
import getRoomSaga from "./getRoomSaga";

export default function* rootSaga() {
  yield all([fork( getRoomSaga)]);
}
