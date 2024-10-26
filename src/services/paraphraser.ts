import { paraphraseForm } from "@/schemas/paraphraseSchema";
import axios, { AxiosResponse } from "axios";

export const paraphraserService = (
  data: paraphraseForm
): Promise<AxiosResponse<ParaphraseResponse>> => {
  return axios.post("/api/paraphrase", data);
};
