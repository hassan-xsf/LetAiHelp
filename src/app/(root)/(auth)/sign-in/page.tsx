"use client";

import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import GithubSignIn from "@/components/buttons/GithubButton";
import Logo from "@/components/Logo";

const page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      const data = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (data?.error) {
        if (data.error === "CredentialsSignin") {
          return toast.error("Invalid credentials!");
        }
        return toast.error("There was a problem signing you up!");
      }
      toast.success("You have been logged in!");
      router.push("/tools");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "There was an error logging you in!",
        );
      }
    }
  }
  return (
    <div className="mx-auto max-w-screen-sm pt-20 md:pt-40">
      <Logo type={2} />
      <div className="mb-10 text-center text-sm font-bold">Sign In</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
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
                  <Input
                    placeholder="Enter your password..."
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link className="block" href="/sign-up">
            Don't have an account?
          </Link>

          <Button type="submit" className="bg-green-600">
            Sign In
          </Button>
          <GithubSignIn />
        </form>
      </Form>
    </div>
  );
};

export default page;
