import {
  UPDATE_LOADING,
  GET_IMAGE,
  GET_IMAGE_SUCCESS,
  GET_IMAGE_ERROR,
} from "./types";

export const updateLoading = (loading) => {
  return {
    type: UPDATE_LOADING,
    payload: loading,
  };
};

export const getImage = () => {
  return {
    type: GET_IMAGE,
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
