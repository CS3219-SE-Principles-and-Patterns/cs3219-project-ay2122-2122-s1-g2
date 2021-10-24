import { getAxiosInstance as axios } from "../utils/auth/auth";

const LOGIN_PATH = "http://localhost:3000/api/login";

export class LoginInfra {
  public static loginUser = async (data: any) => {
    return await axios().post(LOGIN_PATH + "/login", data);
  };
  public static registerUser = async (data: any) => {
    return await axios().post(LOGIN_PATH + "/register", data);
  };
  public static resetPassword = async (data: any) => {
    return await axios().put(LOGIN_PATH + "/update", data);
  };
  public static getNewAccessToken = async (data: any) => {
    return await axios().post(LOGIN_PATH + "/token", data);
  };
}
