import {z} from 'zod'


export const translateSchema = z.object({
    text: z.string().min(2 , {message: "Text must be atleast of 2 characters"}),
    tr_lang: z.string().min(2 , {message: "Target language must be atleast of 2 characters"}),
    sr_lang: z.string().min(2 , {message: "Source language must be atleast of 2 characters"}),
})

