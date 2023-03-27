import {
  UPDATE_LOADING,
  GET_IMAGE,
  GET_IMAGE_SUCCESS,
  GET_IMAGE_ERROR,
  INCREMENT,
  DECREMENT,
} from "./types";

export const updateLoading = (loading) => {
  return {
    type: UPDATE_LOADING,
    payload: loading,
  };
};

export const getDataImage = (count, lenght) => {
  return {
    type: GET_IMAGE,
    payload: {
      count: count,
      lenght: lenght,
    },
  };
};

export const getImageSuccess = (image) => {
  return {
    type: GET_IMAGE_SUCCESS,
    payload: image,
  };
};

export const getImageError = (error) => {
  return {
    type: GET_IMAGE_ERROR,
    payload: error,
  };
};

export const increaseAction = (step) => {
  return {
    type: INCREMENT,
    step: step,
  };
};

export const decreaseAction = (step) => {
  return {
    type: DECREMENT,
    step: step,
  };
};
