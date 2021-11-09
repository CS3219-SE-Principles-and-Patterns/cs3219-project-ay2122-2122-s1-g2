import { getAxiosInstance as axios } from "../utils/auth/auth";

const LOGIN_PATH = "http://35.240.188.57/api/login";

export class AuthInfra {
  public static loginUser = async (data: any): Promise<any> => {
    return await axios().post(LOGIN_PATH + "/login", data);
  };
  public static registerUser = async (data: any): Promise<any> => {
    return await axios().post(LOGIN_PATH + "/register", data);
  };
  public static resetPassword = async (data: any): Promise<any> => {
    return await axios().put(LOGIN_PATH + "/update", data);
  };
  public static getNewAccessToken = async (data: any): Promise<any> => {
    return await axios().post(LOGIN_PATH + "/token", data);
  };
  public static verifyToken = async (data: any): Promise<any> => {
    return await axios().post(LOGIN_PATH + "/verify", data);
  };
}
