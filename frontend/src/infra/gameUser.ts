import { getAxiosInstance as axios } from "../utils/auth/auth";

const GAME_PATH = "http://localhost:4000/api/matchmaking"

export class GameInfra {
    public static getAllUsers = (): Promise<any> => {
        return axios().get(GAME_PATH);
    }
    public static getUserHistory = (username: any): Promise<any> => {
        return axios().get(`${GAME_PATH}/${username}`);
    }
}
