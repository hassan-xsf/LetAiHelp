import {z} from 'zod'

export const signUpSchema = z.object({
    name: z.string().min(3 , {message: "Username must be atleast of 3 characters"}).max(10, {message: "Username cannot be more than 10 characters"}),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be greater than 6 characters")
})