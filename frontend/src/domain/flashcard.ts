export interface FlashCardProps {
  title: string;
  body: string;
  difficulty: number;
  language: string;
  altText: string;
  notes: string;
  _id: string;
}

export class FlashCard implements FlashCardProps {
  title: string;
  body: string;
  difficulty: number;
  language: string;
  altText: string;
  notes: string;
  _id: string;

  private constructor(props: FlashCardProps) {
    this.title = props.title;
    this.body = props.body;
    this.difficulty = props.difficulty;
    this.language = props.language;
    this.altText = props.altText;
    this.notes = props.notes;
    this._id = props._id;
  }
  public static create(props: FlashCardProps): FlashCard {
    // no validation for flashcard
    return new FlashCard(props);
  }
}

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