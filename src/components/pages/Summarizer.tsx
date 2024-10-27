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
import { Slider } from "../ui/slider";
import { summarizeFormType, summarizeSchema } from "@/schemas/summarizeSchema";
import { summarizerService } from "@/services/summarizer";
import { textLimits } from "@/constants/textLimits";

const Summarizer = () => {
  const [summarizedText, setSummarizedText] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<summarizeFormType>({
    defaultValues: {
      max_length: 10,
      input_text: "",
    },
    resolver: zodResolver(summarizeSchema),
  });
  const selectedLength = watch("max_length");
  const currentText = watch("input_text");

  const translation = useMutation({
    mutationFn: summarizerService,
    onSuccess: (res) => {
      if (!session.data) return null;
      const newCredits = session.data.user.credits - Credits.Summarizer;
      session.update({
        credits: newCredits === 0 ? 1 : newCredits,
      });
      toast.success("Your text has been summarized!");
      setSummarizedText(res.data.data.result.summary);
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
    if (summarizedText === "") return;
    navigator.clipboard.writeText(summarizedText);
    toast.info("Summarization copied to clipboard");
  };

  const onSubmit = async (data: summarizeFormType) => {
    if (session.data.user.credits < Credits.Summarizer)
      return toast.error(
        "You don't have enough credits to perform this action",
      );
    if (translation.isPending) return;
    translation.mutate(data);
    toast.info("Summarizing, Please wait...");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex max-w-sm flex-col gap-5 pt-10">
        <Slider
          defaultValue={[10]}
          min={10}
          max={300}
          step={10}
          onValueChange={(value) => setValue("max_length", value[0])}
        />
        <span>Maximum Words: {selectedLength}</span>
      </div>
      <div className="my-10 grid grid-cols-2 gap-4">
        <div>
          <div className="mx-auto -mb-2 flex h-10 w-[99.9%] items-center justify-between rounded-md bg-white pl-2 ring-1 ring-green-400 dark:bg-zinc-800">
            <p className="-mt-2 text-sm text-zinc-400">
              words: {currentText.length}/{textLimits.Summarizer}
            </p>
          </div>
          <Textarea
            placeholder="Enter text to summarize"
            maxLength={textLimits.Summarizer}
            className="text-md h-96 w-full border-green-400 bg-white p-2 text-black dark:bg-zinc-900 dark:text-white"
            {...register("input_text")}
          />
          {errors.input_text && (
            <p className="text-red-500">{errors.input_text.message}</p>
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
            placeholder="Summarized text will appear here..."
            value={summarizedText}
            readOnly
            className="text-md h-96 w-full border-green-400 bg-white p-2 text-black dark:bg-zinc-900 dark:text-white"
          />
        </div>
      </div>
      <div className="mx-auto w-1/6">
        <button
          aria-label="Summarize"
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-green-500 px-6 py-3 text-lg font-semibold text-white shadow-[6px_6px_0_0_#166534] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-green-600 hover:shadow-[2px_2px_0_0_#166534]"
        >
          <Sparkles className="ml-2 size-6 fill-green-400 text-white" />
          {translation.isPending ? "SUMMARIZING..." : "SUMMARIZE"}
        </button>
      </div>
    </form>
  );
};

export default Summarizer;
