import { translateFormType } from "@/schemas/translateSchema";
import axios from "axios";

export const translatorService = (data: translateFormType) => {
  return axios.post("/api/translator", { data });
};
