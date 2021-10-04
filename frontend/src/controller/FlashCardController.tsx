import { FlashCard, FlashCardProps } from "../domain/flashcard";
import { FlashCardInfra } from "../infra/flashcard";

export class FlashCardController {
  public static createFlashCard = async (props: FlashCardProps) => {
    const flashCard: FlashCard = FlashCard.create(props);
    return await FlashCardInfra.createFlashCard(flashCard);
  };

  public static getFlashCard = async (id: string): Promise<FlashCard> => {
    return FlashCard.create(await FlashCardInfra.getFlashCard(id));
  };
}
