import { axiosConfig as axios } from "../utils/auth/auth";

// const LOGIN_PATH = "http://localhost/api/login";
const LOGIN_PATH = "http://localhost:3000";
export const loginUser = async (data) => {
  return await axios.post(LOGIN_PATH + "/login", data);
};
