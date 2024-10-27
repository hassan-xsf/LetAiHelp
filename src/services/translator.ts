import { translateFormType } from "@/schemas/translateSchema";
import axios, { AxiosResponse } from "axios";

export const translatorService = (
  data: translateFormType,
): Promise<AxiosResponse<{ data: TranslationResponse }>> => {
  return axios.post("/api/translator", { data });
};
