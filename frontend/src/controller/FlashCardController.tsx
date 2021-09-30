import { FlashCard, FlashCardProps } from "../domain/flashcard";
import { FlashCardInfra } from "../infra/flashcard";

export class FlashCardController {
  public static createFlashCard = async (props: FlashCardProps) => {
    const flashCard: FlashCard = FlashCard.create(props);
    return await FlashCardInfra.createFlashCard(flashCard);
  };
}
