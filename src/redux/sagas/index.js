import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  GET_IMAGE,
  UPDATE_LOADING,
  GET_IMAGE_SUCCESS,
  GET_IMAGE_ERROR,
} from "../actions/types";
import { getImage, getImageSuccess, getImageError } from "../actions/index";

function* getImageSaga(action) {
  try {
    const image = yield call(getImage);
    yield put(getImageSuccess(image));
  } catch (error) {
    yield put(getImageError(error));
  }
}

function* mySaga() {
  // yield takeEvery(GET_IMAGE, getImageSaga);
  console.log("My saga run");
}

export default mySaga;
