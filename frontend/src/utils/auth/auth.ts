import axios from "axios";
export const getAxiosInstance = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  let config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "x-refresh-token": refreshToken,
    },
  };
  return axios.create(config);
};
