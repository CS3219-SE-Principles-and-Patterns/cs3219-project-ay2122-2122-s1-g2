import { getAxiosInstance as axios } from "../utils/auth/auth";

const LOGIN_PATH = "http://35.240.188.57/api/login";

export const loginUser = async (data) => {
  return await axios().post(LOGIN_PATH + "/login", data);
};
export const registerUser = async (data) => {
  return await axios().post(LOGIN_PATH + "/register", data);
};
export const resetPassword = async (data) => {
  return await axios().put(LOGIN_PATH + "/update", data);
};
export const getNewAccessToken = async (data) => {
  return await axios().post(LOGIN_PATH + "/token", data);
};
