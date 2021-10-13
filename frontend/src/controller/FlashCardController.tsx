import { FlashCard, FlashCardProps } from "../domain/flashcard";
import { FlashCardInfra } from "../infra/flashcard";

export class FlashCardController {
  public static createFlashCard = async (props: FlashCardProps) => {
    const flashCard: FlashCard = FlashCard.create(props);
    return await FlashCardInfra.createFlashCard(flashCard);
  };

  public static getFlashCard = async (id: string): Promise<FlashCard> => {
    const res = await FlashCardInfra.getFlashCard(id);
    return FlashCard.create(res.data.data);
  };
  public static getAllFlashCards = async (): Promise<FlashCard[]> => {
    const res = await FlashCardInfra.getAllFlashCards();
    const flashcards: [] = res.data.data;
    return flashcards.map((flashcard) => FlashCard.create(flashcard));
  };

  public static editFlashCard = async (props: FlashCardProps, id: string) => {
    const flashCard: FlashCard = FlashCard.create(props);
    return await FlashCardInfra.editFlashCard(flashCard, id);
  };
}
