import { textFormType } from "@/schemas/textSchema";
import axios, { AxiosResponse } from "axios";

export const chatService = (
  data: textFormType
): Promise<AxiosResponse<{ data: AITextResponse }>> => {
  return axios.post("/api/chat", data);
};
