import axios from "axios";

export const getData = (urlApi, param = null, isAuth = false, token) =>
  axios({
    method: "GET",
    url: urlApi,
    headers: isAuth
      ? {
          Accept: "application/json",
          Authorization: `${token}`,
        }
      : {
          Accept: "application/json",
        },
    params: param,
  });

export const postDataApi = (urlApi, bodyData = null, isAuth = false) => {
  return axios({
    method: "POST",
    url: urlApi,
    headers: isAuth
      ? {
          Authorization: bodyData,
          "Content-Type": "application/json",
        }
      : {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    data: bodyData,
  });
};

export const postDataApiMultipart = (urlApi, bodyData = null, isAuth = false) =>
  axios({
    method: "POST",
    url: urlApi,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
    data: bodyData,
  });

export const putData = (urlApi, bodyData = null, isAuth = false) =>
  axios({
    method: "PUT",
    url: urlApi,
    headers: {
      Accept: "application/json",
    },
    params: bodyData,
  });

export const deleteData = (urlApi, bodyData = null, isAuth = false) =>
  axios({
    method: "DELETE",
    url: urlApi,
    headers: {
      Accept: "application/json",
    },
    params: bodyData,
  });

export const postDataApiPush = async (urlApi, bodyData = null, key) => {
  try {
    let response = await axios({
      method: "POST",
      url: urlApi,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `key=${key}`,
      },
      data: bodyData,
    });
    return response;
  } catch (e) {
    return e.response;
  }
};
