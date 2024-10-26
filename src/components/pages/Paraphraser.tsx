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
      toast.success("Your text has been paraphrased!");
      setParaphrasedText(res.data.data.message);
      console.log(res.data.data);
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
        "You don't have enough credits to perform this action"
      );
    if (paraphrase.isPending) return;
    paraphrase.mutate(data);
    toast.info("Paraphrasing, Please wait...");

    const newCredits = session.data.user.credits - Credits.Paraphraser;
    session.update({
      credits: newCredits === 0 ? 1 : newCredits,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-10 flex flex-col gap-5 max-w-sm">
        <Select
          defaultValue={paraphraseTones[0]}
          onValueChange={(value: (typeof paraphraseTones)[number]) =>
            setValue("tone", value)
          }
        >
          <span className="text-black dark:text-white">Select Tone: </span>
          <SelectTrigger className="w-[360px] border-green-400 border-2 text-black dark:text-white mb-2">
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
      <div className="grid grid-cols-2 gap-4 my-10">
        <div>
          <div className="w-[99.9%] mx-auto h-10 bg-white dark:bg-zinc-800 ring-green-400 ring-1 rounded-md -mb-2 flex items-center justify-between pl-2">
            <p className="text-zinc-400 text-sm -mt-2">
              words: {currentText.length}/{textLimits.Paraphraser}
            </p>
          </div>
          <Textarea
            placeholder="Enter text to paraphrase"
            maxLength={textLimits.Paraphraser}
            className="w-full h-96 p-2 text-md bg-white text-black dark:bg-zinc-900 dark:text-white border-green-400"
            {...register("string")}
          />
          {errors.string && (
            <p className="text-red-500">{errors.string.message}</p>
          )}
        </div>
        <div>
          <div className="w-[99.9%] mx-auto h-10 bg-white dark:bg-zinc-800 ring-green-400 ring-1 rounded-md -mb-2 flex items-center justify-end pr-1">
            <div
              onClick={copyOutput}
              className="text-zinc-400 rounded-md p-1 text-sm -mt-2 flex items-center justify-center gap-1 cursor-pointer"
            >
              <Copy size={15} />
              copy
            </div>
          </div>
          <Textarea
            placeholder="Paraphrased text will appear here..."
            value={paraphrasedText}
            readOnly
            className="w-full h-96 p-2 text-md bg-white text-black dark:bg-zinc-900 dark:text-white border-green-400"
          />
        </div>
      </div>
      <div className="w-1/6 mx-auto">
        <button className="w-full px-6 py-3 flex items-center justify-center gap-3 bg-green-500 text-white rounded-lg font-semibold text-lg transition-all hover:bg-green-600 shadow-[6px_6px_0_0_#166534] hover:shadow-[2px_2px_0_0_#166534] hover:translate-x-1 hover:translate-y-1">
          <Sparkles className="size-6 ml-2 text-white fill-green-400" />
          {paraphrase.isPending ? "PARAPHRASING..." : "PARAPHRASE"}
        </button>
      </div>
    </form>
  );
};

export default Paraphraser;
