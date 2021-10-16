import { getAxiosInstance as axios } from "../utils/auth/auth";

const FLASHCARD_PATH = "http://localhost:1000/api/flashcard/";

export class FlashCardInfra {
  public static createFlashCard = (data: any): Promise<any> => {
    return axios().post(FLASHCARD_PATH, data);
  };

  public static getFlashCard = (id: string): Promise<any> => {
    return axios().get(`${FLASHCARD_PATH}${id}`);
  };

  public static getAllFlashCards = (): Promise<any> => {
    return axios().get(FLASHCARD_PATH);
  };

  public static editFlashCard = (data: any, id: string): Promise<any> => {
    return axios().put(`${FLASHCARD_PATH}${id}`, data);
  };

  public static deleteFlashCard = (id: string): Promise<any> => {
    return axios().delete(`${FLASHCARD_PATH}${id}`);
  };

  public static getFlashCard2 = (id: string): Promise<any> => {
    return axios().get(`${FLASHCARD_PATH}test/test/${id}`);
  };

  public static getAllFlashCards2 = (): Promise<any> => {
    return axios().get(`${FLASHCARD_PATH}test/test`);
  };

  public static createFlashCard2 = (data: any): Promise<any> => {
    return axios().post(`${FLASHCARD_PATH}test/test`, data);
  };

  public static editFlashCard2 = (data: any): Promise<any> => {
    return axios().put(`${FLASHCARD_PATH}test/test`, data);
  };
}
