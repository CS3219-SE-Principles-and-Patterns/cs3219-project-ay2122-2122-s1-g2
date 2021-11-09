import { getAxiosInstance as axios } from "../utils/auth/auth";

const GAME_PATH = "http://localhost:4000/api/matchmaking";

export class GameInfra {
  public static getAllUsers = (): Promise<any> => {
    return axios().get(`${GAME_PATH}/getall`);
  };

  public static getUser = (): Promise<any> => {
    return axios().get(`${GAME_PATH}`);
  };

  public static updateUser = (): Promise<any> => {
    return axios().post(`${GAME_PATH}`);
  };
}
