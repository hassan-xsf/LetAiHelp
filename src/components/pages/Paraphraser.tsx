"use client";

import { Copy, Sparkles, Type } from "lucide-react";
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
import { Card } from "../ui/card";
import { Button } from "../ui/button";

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
          <span className="text-xs text-black dark:text-white">
            SELECT TONE:{" "}
          </span>
          <SelectTrigger className="w-full border-green-500/20 bg-white text-xs dark:bg-black">
            <Type className="mr-2 h-4 w-4 text-green-500" />
            <SelectValue placeholder="Select target language" />
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

      <div className="grid grid-cols-1 gap-4 pt-1 tracking-tighter md:grid-cols-2">
        <Card className="relative border-green-500/20 bg-white dark:bg-black">
          <Textarea
            placeholder="Enter text to paraphrase"
            className="min-h-[30vh] resize-none border-0 bg-transparent p-4 text-green-50 placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            maxLength={textLimits.Paraphraser}
            {...register("string")}
          />
          <div className="absolute bottom-2 left-4 text-xs text-green-500/70">
            words: {currentText.length}/{textLimits.Translator}
          </div>
        </Card>
        <Card className="relative border-green-500/20 bg-white dark:bg-black">
          <Textarea
            value={paraphrasedText}
            readOnly
            placeholder="Paraphrased text will appear here"
            className="min-h-[30vh] resize-none border-0 bg-transparent p-4 text-green-50 placeholder:text-muted-foreground/50"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 text-green-500 hover:bg-green-500/10 hover:text-green-400"
            onClick={copyOutput}
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy translation</span>
          </Button>
        </Card>
        {errors.string && (
          <p className="text-xs text-red-500">{errors.string.message}</p>
        )}
      </div>

      <div className="flex justify-center pt-4 tracking-tighter">
        <Button
          disabled={paraphrase.isPending}
          className="text-md bg-green-500 px-6 py-4 font-bold text-white transition-colors hover:bg-green-400 dark:text-black"
        >
          <Sparkles className="mr-2 size-6" />
          {paraphrase.isPending ? "PARAPHRASING..." : "PARAPHRASE"}
        </Button>
      </div>
    </form>
  );
};

export default Paraphraser;
