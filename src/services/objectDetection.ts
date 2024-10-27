import { translateFormType } from "@/schemas/translateSchema";
import axios, { AxiosResponse } from "axios";

export const objectDetectionService = (
  data: FormData
): Promise<AxiosResponse<{ data: ObjectDetectionResponse }>> => {
  return axios.post("/api/object-detection", data);
};
