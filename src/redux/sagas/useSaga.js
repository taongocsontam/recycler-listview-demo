import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { USER_STORE } from "../actions/types";
import { getData } from "../../until/DataUntil";

function* updateUser(action) {
  try {
  } catch (error) {
    console.log("error:   ", JSON.stringify(error));
  }
}

function* useSaga() {
  yield takeEvery(USER_STORE, updateUser);
}

export default useSaga;
