import { aiDetectionForm } from "@/schemas/aiDetectionSchema";
import axios, { AxiosResponse } from "axios";

export const aiDetectorService = (
  data: aiDetectionForm,
): Promise<AxiosResponse<AIDetectionResponse>> => {
  return axios.post("/api/ai-detection", data);
};
