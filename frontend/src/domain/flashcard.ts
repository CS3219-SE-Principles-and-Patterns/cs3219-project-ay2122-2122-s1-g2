export interface FlashCardProps {
  title: string;
  body: string;
  difficulty: number;
  language: string;
  altText: string;
  // or user id
  username: string;
}

export class FlashCard implements FlashCardProps {
  title: string;
  body: string;
  difficulty: number;
  language: string;
  altText: string;
  username: string;

  private constructor(props: FlashCardProps) {
    this.title = props.title;
    this.body = props.body;
    this.difficulty = props.difficulty;
    this.language = props.language;
    this.altText = props.altText;
    this.username = props.username;
  }
  public static create(props: FlashCardProps): FlashCard {
    // no validation for flashcard
    return new FlashCard(props);
  }
}
