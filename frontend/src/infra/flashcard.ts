import { getAxiosInstance as axios } from "../utils/auth/auth";

const FLASHCARD_PATH = "http://localhost/api/flashcard";

export class FlashCardInfra {
  public static createFlashCard = (data: any): Promise<any> => {
    return axios().post(FLASHCARD_PATH + "/", data);
  };

  public static getFlashCard = (id: string): Promise<any> => {
    return axios().get(FLASHCARD_PATH + "/" + id);
  };

  public static editFlashCard = (data: any, id: string): Promise<any> => {
    return axios().put(FLASHCARD_PATH + "/edit/" + id, data);
  };
}
