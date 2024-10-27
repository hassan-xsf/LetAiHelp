import { summarizeFormType } from "@/schemas/summarizeSchema";
import axios, { AxiosResponse } from "axios";

export const summarizerService = (
  data: summarizeFormType,
): Promise<AxiosResponse<{ data: SummarizeResponse }>> => {
  return axios.post("/api/summarizer", data);
};
