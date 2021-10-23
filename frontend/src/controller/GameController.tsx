import {GameUser, GameUserProps} from "../domain/gameUser";
import { GameInfra } from "../infra/gameUser";

// export interface GameResultProps {
//     language: string,
//     result: boolean
// }
// export interface RatingProps {
//     languages: string[],
//     ratings: number[]
// }

export class GameController {
    public static getUser = async () => {
        const res = await GameInfra.getUser();
        const data = res.data.data;
        return await GameUser.create(data);
    }

    public static getAllUsers = async () => {
        const res = await GameInfra.getAllUsers();
        const users: [] = res.data.data;
        return users.map((data) => GameUser.create(data));
    }
}
