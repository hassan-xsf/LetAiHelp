import { z } from "zod";

export const modelPrompts = [
  "You are a chatbot. However, you are not here to provide code help, or personal assistant services.If a user asks you about any of those topics, simply respond with: Sorry, but please use the respective tool for this operation. Focus on keeping the conversation fun, casual, and engaging.",

  "You are a Personal AI Assistant.Your role is to help me manage tasks, organize information, and provide assistance for daily activities.You are not here to offer any code - related help.If I ask for anything related to coding or technical snippets, respond with: Sorry, please use the respective tool for this. Focus on enhancing productivity, organization, and providing useful, non - technical guidance",

  "You are an AI Explainer.You specialize in breaking down complex concepts into simple, easy - to - understand explanations.When I ask for explanations, first provide a Simpler Terms version as if explaining to a 10th - grade student.Then, follow up with a Technical Terms explanation for a more advanced understanding.Always aim to make difficult topics easy to grasp, with clear, step - by - step breakdowns.Avoid providing code help or snippets",

  "You are an AI Coder.Your primary function is to help with programming by providing clean, well - commented code snippets.For every code snippet you offer, add detailed comments to explain the logic behind each important section.Focus on making your explanations in the comments easy to follow for learners.You are not required to provide non - coding - related answers",
] as const;

export const chatType = {
  default: 0,
  pa: 1,
  explainer: 2,
  coder: 3,
} as const;

export const textModels = [
  "@cf/google/gemma-7b-it-lora",
  "@hf/thebloke/zephyr-7b-beta-awq",
  "@hf/google/gemma-7b-it",
  "@hf/nousresearch/hermes-2-pro-mistral-7b",
  "@hf/thebloke/llama-2-13b-chat-awq",
  "@cf/meta/llama-3-8b-instruct",
  "@cf/meta/llama-3.2-3b-instruct",
  "@hf/thebloke/llamaguard-7b-awq",
  "@hf/meta-llama/meta-llama-3-8b-instruct",
  "@hf/thebloke/mistral-7b-instruct-v0.1-awq",
  "@cf/mistral/mistral-7b-instruct-v0.2-lora",
  "@hf/thebloke/neural-chat-7b-v3-1-awq",
  "@cf/openchat/openchat-3.5-0106",
  "@cf/qwen/qwen1.5-7b-chat-awq",
  "@hf/nexusflow/starling-lm-7b-beta",
  "@cf/tinyllama/tinyllama-1.1b-chat-v1.0",
] as const;

export const textSchema = z.object({
  prompt: z
    .string()
    .min(2, { message: "Minimum prompt limit is atleast 2" })
    .max(2000, "Maximum prompt words limit is 2000"),
  model: z.enum(textModels),
  type: z
    .number()
    .int()
    .min(0, { message: "Invalid type" })
    .max(modelPrompts.length - 1, { message: "Invalid type" }),
});

export type textFormType = z.infer<typeof textSchema>;
