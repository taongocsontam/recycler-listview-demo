import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  GET_IMAGE,
  UPDATE_LOADING,
  GET_IMAGE_SUCCESS,
  GET_IMAGE_ERROR,
} from "../actions/types";
import { getImage, getImageSuccess, getImageError } from "../actions/index";
import { getData } from "../../until/DataUntil";

function* getImageSaga(action) {
  try {
    const images = yield call(
      getData,
      action.payload.count,
      action.payload.lenght
    );
    yield put(getImageSuccess(images));
  } catch (error) {
    console.log("error:   ", JSON.stringify(error));
  }
}

function* imageSaga() {
  yield takeLatest(GET_IMAGE, getImageSaga);
}

export default imageSaga;
