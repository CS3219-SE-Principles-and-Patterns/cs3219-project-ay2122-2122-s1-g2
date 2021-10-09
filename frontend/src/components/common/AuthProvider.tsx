import React, { useContext, useState } from "react";
import axios, { AxiosStatic } from "axios";
const PROFILE_PATH = "http://localhost/api/profile/";

export interface authInterface {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
const initialValue = {
  auth: {
    accessToken: "",
    refreshToken: "",
    expiresIn: 0,
  },
  setAuth: (state: authInterface) => {},
};
const initialAxiosValue = () => axios.create();
const AuthContext = React.createContext(initialValue);
const AxiosContext = React.createContext(initialAxiosValue);
export const useAuth = () => {
  return useContext(AuthContext);
};
export const useAxios = () => {
  return useContext(AxiosContext);
};

const AuthProvider: React.FC<{}> = ({ children }) => {
  const [auth, setAuth] = useState<authInterface>({
    accessToken: "",
    refreshToken: "",
    expiresIn: 0,
  });
  const setAxiosHeaders = () => {
    console.log(auth);
    let config = {
      headers: {
        Authorization: "Bearer " + auth.accessToken,
        "x-refresh-token": auth.refreshToken,
      },
    };
    return axios.create(config);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <AxiosContext.Provider value={setAxiosHeaders}>
        {children}
      </AxiosContext.Provider>
    </AuthContext.Provider>
  );
};
export default AuthProvider;
