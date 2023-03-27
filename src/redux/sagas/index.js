import { all, fork } from "redux-saga/effects";
import imageSaga from "./imageSaga";
import loadingSaga from "./loadingSaga";

export default function* rootSaga() {
  yield all([fork(imageSaga, loadingSaga)]);
}
