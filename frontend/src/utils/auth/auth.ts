import axios from "axios";
import { getNewAccessToken } from "../../infra/auth";

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};
export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};
const silentRefresh = (expiresIn: number) => {
  console.log("hello silent refresh", expiresIn);
  var handle = setTimeout(async () => {
    await getNewAccessToken({
      refreshToken: getRefreshToken(),
    })
      .then((res) => {
        const {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          expiresIn: newExpiresIn,
        } = res.data;
        setTokens(newAccessToken, newRefreshToken);
        clearTimeout(handle);
        console.log(res.data);
        silentRefresh(newExpiresIn);
      })
      .catch((err) => {
        console.log(err);
        //clearInterval(handle);
      });
  }, expiresIn);
  console.log("goodbye");
};

interface loginInterface {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export const login = ({
  accessToken,
  expiresIn,
  refreshToken,
}: loginInterface) => {
  console.log(accessToken, refreshToken, expiresIn);
  setTokens(accessToken, refreshToken);
  silentRefresh(expiresIn);
};
