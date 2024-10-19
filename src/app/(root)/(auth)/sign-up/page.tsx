"use client"

import { signUpSchema } from '@/schemas/signUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios, { AxiosError } from 'axios'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import GithubSignIn from '@/components/ui/GithubSignIn'


const page = () => {

    const router = useRouter();
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            password: "",
            email: ""
        }
    });
    async function onSubmit(values: z.infer<typeof signUpSchema>) {

        try {
            const data = await axios.post('/api/sign-up', values)
            if (!data.data.success) {
                toast.error(data.data.message)
            }
            else {
                toast.success("Your account has been registered!")
                router.push("/sign-in")
            }

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message || "There was an error signing you up!")
            }
        }
    }
    return (
        <div className="w-1/3 mx-auto mt-40">
            <div className="mb-10 text-xl font-bold">Sign Up</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your username..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your password..." {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Link className="block" href="/sign-in">Already have an account?</Link>
                    <Button type="submit">Sign Up</Button>
                    <GithubSignIn />
            </form>
        </Form>
        </div >
    )
}

export default page