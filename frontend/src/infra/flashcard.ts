import { getAxiosInstance as axios } from "../utils/auth/auth";
const FLASHCARD_PATH = "http://localhost/api/flashcard";

export class FlashCardInfra {
  public static createFlashCard = (data: any): Promise<any> => {
    return axios().post(FLASHCARD_PATH + "/", data);
  };
}
