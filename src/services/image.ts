import { imageFormType } from "@/schemas/imageSchema";
import axios, { AxiosResponse } from "axios";

export const imageService = (data: imageFormType) => {
  return axios.post("/api/text-to-image", data);
};
