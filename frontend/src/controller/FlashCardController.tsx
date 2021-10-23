import { Card, CardProps, FlashCardSet, FlashCardSetProps } from "../domain/flashcard";
import { FlashCardInfra } from "../infra/flashcard";

export class FlashCardController {
  public static getFlashCard = async (id: string): Promise<FlashCardSet> => {
    const res = await FlashCardInfra.getFlashCard(id);
    return FlashCardSet.create(res.data.data);
  };

  public static getAllFlashCards = async (): Promise<FlashCardSet[]> => {
    const res = await FlashCardInfra.getAllFlashCards();
    const flashcards: [] = res.data.data;
    return flashcards.map((flashcard) => FlashCardSet.create(flashcard));
  };

  public static getDefaultFlashCards = async (language: string): Promise<FlashCardSet[]> => {
    const res = await FlashCardInfra.getDefaultFlashcards(language);
    const flashcards: [] = res.data.data;
    return flashcards.map((flashcard) => FlashCardSet.create(flashcard));
  };

  public static deleteFlashCard = async (id: string): Promise<FlashCardSet> => {
    return await FlashCardInfra.deleteFlashCard(id);
  };

  public static createFlashCard = async (props: FlashCardSetProps) => {
    const flashCard: FlashCardSet = FlashCardSet.create(props);
    return await FlashCardInfra.createFlashCard(flashCard);
  };

  public static editFlashCard = async (props: FlashCardSetProps) => {
    const flashCard: FlashCardSet = FlashCardSet.create(props);
    return await FlashCardInfra.editFlashCard(flashCard);
  };
}
