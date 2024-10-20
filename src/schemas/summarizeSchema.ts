import {z} from 'zod'


export const summarizeSchema = z.object({
    input_text: z.string().min(2 , {message: "Text must be atleast of 2 characters"}).max(2000, {message: "Text must be atmost of 2000 characters"}),
    max_length: z.number().int().min(10 , {message: "Min length of the summarized output should be atleast 10"}).max(1000  , {message: "Maximum length of the summarized output should be 1000"})
})

