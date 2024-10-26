import { z } from "zod";

export const aiDetectionSchema = z.object({
  input_text: z
    .string()
    .min(50, { message: "Text must be atleast of 50 characters" })
    .max(15000, { message: "Text must be atmost of 15000 characters" }),
});

export type aiDetectionForm = z.infer<typeof aiDetectionSchema>;
