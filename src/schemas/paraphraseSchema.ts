import { z } from "zod";

export const paraphraseTones = [
  "standard",
  "academic",
  "fluent",
  "normal",
  "simple",
  "creative",
  "engineer",
  "doctor",
  "lawyer",
  "teenager",
] as const;

export const paraphraseSchema = z.object({
  string: z
    .string()
    .min(10, { message: "Text must be atleast of 10 characters" })
    .max(900, { message: "Text must be atmost of 900 characters" }),
  tone: z.enum(paraphraseTones),
});

export type paraphraseForm = z.infer<typeof paraphraseSchema>;
