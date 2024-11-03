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
import { Card } from "../ui/card";
import { Button } from "../ui/button";

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
        <span className="text-sm text-green-400">
          Maximum Words: {selectedLength}
        </span>
      </div>
      <div className="trac grid gap-4 pt-4 tracking-tighter md:grid-cols-2">
        <Card className="group relative border-green-600/30 bg-white dark:bg-black">
          <Textarea
            {...register("input_text")}
            placeholder="Enter text to summarize"
            className="min-h-[400px] resize-none border-0 bg-transparent p-4 text-black placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-white"
            maxLength={textLimits.Summarizer}
          />
          {errors.input_text && (
            <p className="text-red-500">{errors.input_text.message}</p>
          )}
          <div className="absolute bottom-2 left-4 text-xs text-muted-foreground">
            words: {currentText.length}/{textLimits.Summarizer}
          </div>
        </Card>
        <Card className="group relative border-green-600/30 bg-white p-0 dark:bg-black">
          <Textarea
            value={summarizedText}
            readOnly
            placeholder="Summarized text will appear here..."
            className="min-h-[400px] resize-none border-0 bg-transparent p-4 text-black placeholder:text-muted-foreground/50 dark:text-white"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 text-emerald-500 opacity-0 transition-opacity hover:bg-emerald-500/10 hover:text-emerald-400 group-hover:opacity-100"
            onClick={copyOutput}
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy summary</span>
          </Button>
        </Card>
      </div>
    </form>
  );
};

export default Summarizer;
