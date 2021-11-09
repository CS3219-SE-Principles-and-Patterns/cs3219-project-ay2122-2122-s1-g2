import { getAxiosInstance as axios } from "../utils/auth/auth";

const FLASHCARD_PATH = "35.247.179.81:90/api/flashcard";

export class FlashCardInfra {
  public static getFlashCard = (id: string): Promise<any> => {
    return axios().get(`${FLASHCARD_PATH}/${id}`);
  };

  public static getAllFlashCards = (): Promise<any> => {
    return axios().get(`${FLASHCARD_PATH}`);
  };

  public static getDefaultFlashcards = (language: string): Promise<any> => {
    return axios().get(`${FLASHCARD_PATH}/default/${language}`);
  };

  public static deleteFlashCard = (id: string): Promise<any> => {
    return axios().delete(`${FLASHCARD_PATH}/${id}`);
  };

  public static createFlashCard = (data: any): Promise<any> => {
    return axios().post(`${FLASHCARD_PATH}`, data);
  };

  public static editFlashCard = (data: any): Promise<any> => {
    return axios().put(`${FLASHCARD_PATH}`, data);
  };
}
