import { getData, postDataApi } from "..";

export const API_BASE_URL = "https://api.videosdk.live/v2";
export const VIDEOSDK_TOKEN = "";
export const API_AUTH_URL = "http://192.168.2.234:3000";

export const getTokenVideoSDK = async () => {
  try {
    if (VIDEOSDK_TOKEN && API_AUTH_URL) {
      console.error(
        "Error: Provide only ONE PARAMETER - either Token or Auth API"
      );
    } else if (VIDEOSDK_TOKEN) {
      return VIDEOSDK_TOKEN;
    } else if (API_AUTH_URL) {
      const res = await getData(`${API_AUTH_URL}/get-token`);
      const token = res.data.token;
      return token;
    } else {
      console.error("Error: ", Error("Please add a token or Auth Server URL"));
    }
  } catch (error) {
    console.log("error:  ", JSON.stringify(error));
  }
};

export const createMeeting = async ({ token }) => {
  try {
    const url = `${API_BASE_URL}/rooms`;
    const response = await postDataApi(url, token, true);
    const roomId = response.data.roomId;
    return roomId;
  } catch (error) {
    console.log("error create meetting:  ", JSON.stringify(error));
  }
};

export const validateMeeting = async ({ meetingId, token }) => {
  const url = `${API_BASE_URL}/rooms/validate/${meetingId}`;
  const response = await getData(url, null, true, token);
  console.log("response:  ", JSON.stringify(response));
  return response ? response.data.roomId === meetingId : false;
};
