import { axiosConfig as axios } from "../utils/auth/auth";

const PROFILE_PATH = "http://localhost/api/profile/";
// const PROFILE_PATH = "http://localhost:3000/profile/";

export class ProfileInfra {
  public static editProfile = (data: any): Promise<any> => {
    return axios.put(PROFILE_PATH, data);
  };
  public static getProfile = (): Promise<any> => {
    return axios.get(PROFILE_PATH);
  };
}
