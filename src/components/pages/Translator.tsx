"use client";

import { Copy, Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { languageCodes } from "@/constants/allLanguages";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { translateFormType, translateSchema } from "@/schemas/translateSchema";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { translatorService } from "@/services/translator";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Credits } from "@/constants/credits";
import { textLimits } from "@/constants/textLimits";
const Translator = () => {
  const [translatedText, setTranslatedText] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<translateFormType>({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(translateSchema),
  });
  const currentText = watch("text");

  const translation = useMutation({
    mutationFn: translatorService,
    onSuccess: (res) => {
      if (!session.data) return null;
      toast.success("Your translation is ready");
      setTranslatedText(res.data.data.result.translated_text);
      const newCredits = session.data.user.credits - Credits.Translator;
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
    if (translatedText === "") return;
    navigator.clipboard.writeText(translatedText);
    toast.info("Translation copied to clipboard");
  };
  const onSubmit = async (data: translateFormType) => {
    if (session.data.user.credits < Credits.Translator)
      return toast.error(
        "You don't have enough credits to perform this action",
      );

    if (translation.isPending) return;
    translation.mutate(data);
    toast.info("Translating, Please wait...");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-5 pt-10">
        <Select onValueChange={(value) => setValue("sr_lang", value)}>
          <SelectTrigger className="w-[240px] border-green-400">
            <SelectValue placeholder="Select source language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Source Language</SelectLabel>
              {Object.entries(languageCodes).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {key}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.sr_lang && (
          <p className="text-red-500">{errors.sr_lang.message}</p>
        )}
        <Select onValueChange={(value) => setValue("tr_lang", value)}>
          <SelectTrigger className="w-[240px] border-green-400">
            <SelectValue placeholder="Select target language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Resulting Language</SelectLabel>
              {Object.entries(languageCodes).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {key}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.tr_lang && (
          <p className="text-red-500">{errors.tr_lang.message}</p>
        )}
      </div>
      <div className="my-10 grid grid-cols-2 gap-4">
        <div>
          <div className="mx-auto -mb-2 flex h-10 w-[99.9%] items-center justify-between rounded-md bg-white pl-2 ring-1 ring-green-400 dark:bg-zinc-800">
            <p className="-mt-2 text-sm text-zinc-400">
              words: {currentText.length}/{textLimits.Translator}
            </p>
          </div>
          <Textarea
            placeholder="Enter text to translate"
            className="text-md h-96 w-full border-green-400 bg-white p-2 text-black dark:bg-zinc-900 dark:text-white"
            maxLength={textLimits.Translator}
            {...register("text")}
          />
          {errors.text && <p className="text-red-500">{errors.text.message}</p>}
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
            placeholder="Translation will appear here"
            value={translatedText}
            readOnly
            className="text-md h-96 w-full border-green-400 bg-white p-2 text-black dark:bg-zinc-900 dark:text-white"
          />
        </div>
      </div>
      <div className="mx-auto w-1/6">
        <button
          aria-label="Translate"
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-green-500 px-6 py-3 text-lg font-semibold text-white shadow-[6px_6px_0_0_#166534] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-green-600 hover:shadow-[2px_2px_0_0_#166534]"
        >
          {translation.isPending ? (
            <Loader2 className="ml-2 size-7 animate-spin text-white" />
          ) : (
            <Sparkles className="ml-2 size-6 fill-green-400 text-white" />
          )}
          {translation.isPending ? "TRANSLATING..." : "AI TRANSLATE"}
        </button>
      </div>
    </form>
  );
};

export default Translator;
