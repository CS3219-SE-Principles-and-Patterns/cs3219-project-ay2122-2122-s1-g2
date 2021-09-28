import { axiosConfig as axios } from "../utils/auth/auth";

const PROFILE_PATH = "http://localhost:3000/profile/";

export class ProfileInfra {
  public static editProfile = async (data: any) => {
    return await axios.put(PROFILE_PATH, data);
  };
}
