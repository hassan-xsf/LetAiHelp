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
        "You don't have enough credits to perform this action"
      );
    if (translation.isPending) return;
    translation.mutate(data);
    toast.info("Summarizing, Please wait...");

    const newCredits = session.data.user.credits - Credits.Summarizer;
    session.update({
      credits: newCredits === 0 ? 1 : newCredits,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-10 flex flex-col gap-5 max-w-sm">
        <Slider
          defaultValue={[10]}
          min={10}
          max={300}
          step={10}
          onValueChange={(value) => setValue("max_length", value[0])}
        />
        <span>Maximum Words: {selectedLength}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 my-10">
        <div>
          <div className="w-[99.9%] mx-auto h-10 bg-white dark:bg-zinc-800 ring-green-400 ring-1 rounded-md -mb-2 flex items-center justify-between pl-2">
            <p className="text-zinc-400 text-sm -mt-2">
              words: {currentText.length}/{textLimits.Summarizer}
            </p>
          </div>
          <Textarea
            placeholder="Enter text to summarize"
            maxLength={textLimits.Summarizer}
            className="w-full h-96 p-2 text-md bg-white text-black dark:bg-zinc-900 dark:text-white border-green-400"
            {...register("input_text")}
          />
          {errors.input_text && (
            <p className="text-red-500">{errors.input_text.message}</p>
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
            placeholder="Summarized text will appear here..."
            value={summarizedText}
            readOnly
            className="w-full h-96 p-2 text-md bg-white text-black dark:bg-zinc-900 dark:text-white border-green-400"
          />
        </div>
      </div>
      <div className="w-1/6 mx-auto">
        <button className="w-full px-6 py-3 flex items-center justify-center gap-3 bg-green-500 text-white rounded-lg font-semibold text-lg transition-all hover:bg-green-600 shadow-[6px_6px_0_0_#166534] hover:shadow-[2px_2px_0_0_#166534] hover:translate-x-1 hover:translate-y-1">
          <Sparkles className="size-6 ml-2 text-white fill-green-400" />
          {translation.isPending ? "SUMMARIZING..." : "SUMMARIZE"}
        </button>
      </div>
    </form>
  );
};

export default Summarizer;
