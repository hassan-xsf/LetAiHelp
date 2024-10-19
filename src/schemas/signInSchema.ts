import { z } from 'zod'

export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, { message: "Please enter a valid password!" })
})