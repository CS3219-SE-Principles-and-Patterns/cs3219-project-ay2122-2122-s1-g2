export interface GameUserProps {
    languages: string[];
    ratings: number[];
    resultHistory: boolean[];
    languageHistory: string[];
    username: string;
}

export class GameUser implements GameUserProps {
    languages: string[];
    ratings: number[];
    resultHistory: boolean[];
    languageHistory: string[];
    username: string;
    private constructor(props: GameUserProps) {
        this.languages = props.languages;
        this.ratings = props.ratings;
        this.resultHistory = props.resultHistory;
        this.languageHistory = props.languageHistory;
        this.username = props.username;
    }
    public static create(props: GameUserProps): GameUser {
        return new GameUser(props);
    }
}