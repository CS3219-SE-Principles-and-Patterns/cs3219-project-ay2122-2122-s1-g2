import { GameUser } from "../domain/gameUser";
import { GameInfra } from "../infra/gameUser";

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
