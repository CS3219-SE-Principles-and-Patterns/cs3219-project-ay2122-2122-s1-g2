import {GameUser, GameUserProps} from "../domain/gameUser";
import { GameInfra } from "../infra/gameUser";

export class GameController {
    public static getUserHistory = async (username: string) => {
        const res = await GameInfra.getUserHistory(username);
        var languages = [];
        var languageHistory = [];
        var ratings = [];
        var resultHistory = [];
        for (let i = 0; i < res.data.ratings.length; i++) {
            languages.push(res.data.ratings["language"]);
            ratings.push(res.data.ratings["rating"]);
        }
        for (let i = 0; i < res.data.history.length; i++) {
            languageHistory.push(res.data.history["language"]);
            resultHistory.push(res.data.history["result"]);
        }
        return GameUser.create({
            languages: languages,
            ratings: ratings,
            resultHistory: resultHistory,
            languageHistory: languageHistory,
            username: username
        });
    }
}
