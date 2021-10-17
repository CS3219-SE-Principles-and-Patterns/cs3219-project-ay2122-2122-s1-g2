import { getAxiosInstance as axios } from "../utils/auth/auth";

const FLASHCARD_PATH = "http://localhost:1000/api/flashcard";

export class FlashCardInfra {
  public static getFlashCard = (id: string): Promise<any> => {
    return axios().get(`${FLASHCARD_PATH}/${id}`);
  };

  public static getAllFlashCards = (): Promise<any> => {
    return axios().get(`${FLASHCARD_PATH}`);
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
