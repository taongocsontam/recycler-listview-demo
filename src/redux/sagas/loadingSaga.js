import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { UPDATE_LOADING } from "../actions/types";

function* getLoadingSaga(action) {}

function* loadingSaga() {
  yield takeEvery(UPDATE_LOADING, getLoadingSaga);
}

export default loadingSaga;
