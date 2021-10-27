export interface GameResultProps {
    language: string,
    result: boolean
}

export interface RatingProps {
    language: string[],
    rating: number[]
}

export interface GameUserProps {
    username: string;
    ratings: RatingProps[];
    history: string[];
}

export class GameUser implements GameUserProps {
    username: string;
    ratings: RatingProps[];
    history: string[];
    private constructor(props: GameUserProps) {
        this.username = props.username;
        this.ratings = props.ratings;
        this.history = props.history;
    }
    public static create(props: GameUserProps): GameUser {
        return new GameUser(props);
    }
}