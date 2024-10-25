import { z } from "zod";

export const paidTextModels = [
  "gpt-4o",
  "claude-sonnet-3.5",
  "gemini-pro",
] as const;

export const paidTextSchema = z.object({
  prompt: z
    .string()
    .min(0, { message: "Minimum prompt limit is atleast 2" })
    .max(1000, "Maximum prompt words limit is 1000"),
  model: z.enum(paidTextModels),
  max_tokens: z
    .number()
    .int()
    .min(100, { message: "Invalid minimum tokens" })
    .max(5128, { message: "Invalid max tokens" }),
});

export type paidTextFormType = z.infer<typeof paidTextSchema>;
