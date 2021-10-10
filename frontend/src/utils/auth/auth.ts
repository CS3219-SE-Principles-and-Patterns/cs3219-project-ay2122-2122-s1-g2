import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/tokens";

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};
export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};
export const getAxiosInstance = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  let config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "x-refresh-token": refreshToken,
    },
  };
  return axios.create(config);
};
