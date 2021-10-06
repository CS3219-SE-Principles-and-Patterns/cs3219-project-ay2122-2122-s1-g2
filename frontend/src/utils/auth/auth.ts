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

interface loginInterface {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export const login = ({ accessToken, refreshToken }: loginInterface) => {
  setTokens(accessToken, refreshToken);
};
