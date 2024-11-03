import { z } from "zod";

export const paidTextModels = [
  "gpt-4o",
  "claude-sonnet-3.5",
  "gemini-pro",
] as const;

export const paidTextSchema = z.object({
  // prompt: z
  //   .string()
  //   .min(0, { message: "Minimum prompt limit is atleast 2" })
  //   .max(1000, "Maximum prompt words limit is 1000"),
  messages: z.array(z.object({ role: z.string(), content: z.string() })),
  model: z.enum(paidTextModels),
});

export type paidTextFormType = z.infer<typeof paidTextSchema>;

export const updatedPaidTextSchema = paidTextSchema
  .omit({ messages: true })
  .extend({
    prompt: z
      .string()
      .min(2, { message: "Minimum prompt limit is at least 2" })
      .max(1000, { message: "Maximum prompt words limit is 1000" }),
  });

export type UpdatedPaidTextFormType = z.infer<typeof updatedPaidTextSchema>;
