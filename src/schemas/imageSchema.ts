import { z } from 'zod'

const imageModels =
    [
        "@cf/black-forest-labs/flux-1-schnell",
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        "@cf/bytedance/stable-diffusion-xl-lightning"
    ] as const

export const imageSchema = z.object({
    model: z.enum(imageModels),
    text: z.string().min(10, { message: "Min length of the prompt should be atleast 10" }).max(1000, { message: "Maximum length of the prompt should be 1000" })
})

