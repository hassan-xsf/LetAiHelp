import { z } from 'zod'

const models = [
    "@hf/thebloke/zephyr-7b-beta-awq",
    "@cf/google/gemma-7b-it-lora",
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
    "@cf/fblgit/una-cybertron-7b-v2-bf16"
] as const

export const textSchema = z.object({
    model: z.enum(models)
})