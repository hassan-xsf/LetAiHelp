"use client";

import { Copy, Sparkles } from "lucide-react";
import React, { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Credits } from "@/constants/credits";
import { textLimits } from "@/constants/textLimits";
import {
  paraphraseForm,
  paraphraseSchema,
  paraphraseTones,
} from "@/schemas/paraphraseSchema";
import { paraphraserService } from "@/services/paraphraser";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Paraphraser = () => {
  const [paraphrasedText, setParaphrasedText] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<paraphraseForm>({
    defaultValues: {
      string: "",
      tone: "standard",
    },
    resolver: zodResolver(paraphraseSchema),
  });
  const currentText = watch("string");

  const paraphrase = useMutation({
    mutationFn: paraphraserService,
    onSuccess: (res) => {
      if (!session.data) return;
      toast.success("Your text has been paraphrased!");
      setParaphrasedText(res.data.data.message);
      const newCredits = session.data.user.credits - Credits.Paraphraser;
      session.update({
        credits: newCredits === 0 ? 1 : newCredits,
      });
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }
      toast.error("There was a problem, Error code: 500");
    },
  });
  const session = useSession();
  if (!session.data) return null;

  const copyOutput = () => {
    if (paraphrasedText === "") return;
    navigator.clipboard.writeText(paraphrasedText);
    toast.info("Paraphrased text copied to clipboard");
  };

  const onSubmit = async (data: paraphraseForm) => {
    if (session.data.user.credits < Credits.Paraphraser)
      return toast.error(
        "You don't have enough credits to perform this action",
      );
    if (paraphrase.isPending) return;
    paraphrase.mutate(data);
    toast.info("Paraphrasing, Please wait...");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex max-w-sm flex-col gap-5 pt-10">
        <Select
          defaultValue={paraphraseTones[0]}
          onValueChange={(value: (typeof paraphraseTones)[number]) =>
            setValue("tone", value)
          }
        >
          <span className="text-black dark:text-white">Select Tone: </span>
          <SelectTrigger className="mb-2 w-[360px] border-2 border-green-400 text-black dark:text-white">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {paraphraseTones.map((tone, index) => (
                <SelectItem key={index} value={tone}>
                  {tone[0].toUpperCase() + tone.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="my-10 grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mx-auto -mb-2 flex h-10 w-[99.9%] items-center justify-between rounded-md bg-white pl-2 ring-1 ring-green-400 dark:bg-zinc-800">
            <p className="-mt-2 text-sm text-zinc-400">
              words: {currentText.length}/{textLimits.Paraphraser}
            </p>
          </div>
          <Textarea
            placeholder="Enter text to paraphrase"
            maxLength={textLimits.Paraphraser}
            className="text-md h-96 w-full border-green-400 bg-white p-2 text-black dark:bg-zinc-900 dark:text-white"
            {...register("string")}
          />
          {errors.string && (
            <p className="text-red-500">{errors.string.message}</p>
          )}
        </div>
        <div>
          <div className="mx-auto -mb-2 flex h-10 w-[99.9%] items-center justify-end rounded-md bg-white pr-1 ring-1 ring-green-400 dark:bg-zinc-800">
            <div
              onClick={copyOutput}
              className="-mt-2 flex cursor-pointer items-center justify-center gap-1 rounded-md p-1 text-sm text-zinc-400"
            >
              <Copy size={15} />
              copy
            </div>
          </div>
          <Textarea
            placeholder="Paraphrased text will appear here..."
            value={paraphrasedText}
            readOnly
            className="text-md h-96 w-full border-green-400 bg-white p-2 text-black dark:bg-zinc-900 dark:text-white"
          />
        </div>
      </div>
      <div className="mx-auto w-auto lg:w-1/6">
        <button
          aria-label="Paraphrase"
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-green-500 px-6 py-3 text-lg font-semibold text-white shadow-[6px_6px_0_0_#166534] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-green-600 hover:shadow-[2px_2px_0_0_#166534]"
        >
          <Sparkles className="ml-2 size-2 fill-green-400 text-white lg:size-6" />
          {paraphrase.isPending ? "PARAPHRASING..." : "PARAPHRASE"}
        </button>
      </div>
    </form>
  );
};

export default Paraphraser;
