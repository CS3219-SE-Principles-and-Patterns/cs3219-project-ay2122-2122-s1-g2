import axios from "axios";
const LOGIN_PATH = "http://localhost:3000/api/login";
// const LOGIN_PATH = "http://localhost:3000";
export const loginUser = async (data) => {
  return await axios.post(LOGIN_PATH + "/login", data);
};
export const registerUser = async (data) => {
  return await axios.post(LOGIN_PATH + "/register", data);
};
export const resetPassword = async (data) => {
  return await axios.put(LOGIN_PATH + "/update", data);
};
export const getNewAccessToken = async (data) => {
  return await axios.post(LOGIN_PATH + "/token", data);
};
