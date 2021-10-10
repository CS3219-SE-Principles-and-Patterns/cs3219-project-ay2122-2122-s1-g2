import { getAxiosInstance as axios } from "../utils/auth/auth";

export const PROFILE_PATH = "http://localhost:5000/api/profile/";

export class ProfileInfra {
  public static editProfile = (data: any): Promise<any> => {
    return axios().put(PROFILE_PATH, data);
  };
  public static createProfile = (data: any): Promise<any> => {
    return axios().post(PROFILE_PATH, data);
  };
  public static getProfile = (): Promise<any> => {
    return axios().get(PROFILE_PATH);
  };
}
