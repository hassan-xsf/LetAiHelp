import { imageFormType } from "@/schemas/imageSchema";
import axios from "axios";

export const imageService = (data: imageFormType) => {
  if (data.model === "@cf/black-forest-labs/flux-1-schnell") {
    return axios.post("/api/text-to-image", data);
  } else {
    return axios.post("/api/text-to-image", data, {
      responseType: "blob",
    });
  }
};
