import { imageModels, imageTypes } from "@/constants/image";
import { z } from "zod";

export const imageSchema = z.object({
  model: z.enum(imageModels),
  type: z.enum(imageTypes),
  text: z
    .string()
    .min(5, { message: "Min length of the prompt should be atleast 5" })
    .max(1000, { message: "Maximum length of the prompt should be 1000" }),
});

export type imageFormType = z.infer<typeof imageSchema>;
