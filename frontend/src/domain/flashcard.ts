export interface CardProps {
  body: string;
  altText: string;
  notes: string;
}

export class Card implements CardProps {
  body: string;
  altText: string;
  notes: string;

  private constructor(props: CardProps) {
    this.body = props.body;
    this.altText = props.altText;
    this.notes = props.notes;
  }
  public static create(props: CardProps): Card {
    // no validation for flashcard
    return new Card(props);
  }
}

export interface FlashCardSetProps {
  _id: string;
  title: string;
  difficulty: number;
  language: string;
  description: string;
  flashcards: Array<Card>;
}

export class FlashCardSet implements FlashCardSetProps {
  _id: string;
  title: string;
  difficulty: number;
  language: string;
  description: string;
  flashcards: Array<Card>;

  private constructor(props: FlashCardSetProps) {
    this._id = props._id;
    this.title = props.title;
    this.difficulty = props.difficulty;
    this.language = props.language;
    this.description = props.description;
    this.flashcards = props.flashcards;
  }
  public static create(props: FlashCardSetProps): FlashCardSet {
    // no validation for flashcard
    return new FlashCardSet(props);
  }
}