import { FlashCard, FlashCardProps, Card, CardProps, FlashCardSet, FlashCardSetProps } from "../domain/flashcard";
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

  public static deleteFlashCard = async (id: string): Promise<FlashCard> => {
    return await FlashCardInfra.deleteFlashCard(id);
  };

    public static getFlashCard2 = async (id: string): Promise<FlashCardSet> => {
    const res = await FlashCardInfra.getFlashCard2(id);
    return FlashCardSet.create(res.data.data);
  };

  public static createFlashCard2 = async (props: FlashCardSetProps) => {
    const flashCard: FlashCardSet = FlashCardSet.create(props);
    return await FlashCardInfra.createFlashCard2(flashCard);
  };

  public static editFlashCard2 = async (props: FlashCardSetProps, id: string) => {
    const flashCard: FlashCardSet = FlashCardSet.create(props);
    return await FlashCardInfra.editFlashCard2(flashCard, id);
  };

  public static getAllFlashCards2 = async (): Promise<FlashCardSet[]> => {
    const res = await FlashCardInfra.getAllFlashCards2();
    const flashcards: [] = res.data.data;
    return flashcards.map((flashcard) => FlashCardSet.create(flashcard));
  };
}
