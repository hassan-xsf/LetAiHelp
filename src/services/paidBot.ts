import { paidTextFormType } from "@/schemas/paidModelsSchema";
import axios from "axios";

export const paidBotService = (data: paidTextFormType) => {
  return axios.post("/api/paid", data);
};
