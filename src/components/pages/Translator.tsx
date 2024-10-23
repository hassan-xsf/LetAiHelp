"use client";

import { Sparkles } from "lucide-react";
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

const Translator = () => {
  const [translatedText, setTranslatedText] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<translateFormType>({
    resolver: zodResolver(translateSchema),
  });

  const translation = useMutation({
    mutationFn: translatorService,
    onSuccess: (res) => {
      toast.success("Your translation is ready");
      setTranslatedText(res.data.data.result.translated_text);
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

  const onSubmit = async (data: translateFormType) => {
    if (session.data.user.credits < Credits.Translator)
      return toast.error(
        "You don't have enough credits to perform this action"
      );

    if (translation.isPending) return;
    translation.mutate(data);
    toast.info("Translating, Please wait...");
    session.data.user.credits -= Credits.Translator;
    session.update({
      credits: session.data.user.credits,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-10 flex items-center gap-5">
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
      <div className="grid grid-cols-2 gap-4 my-10">
        <div>
          <Textarea
            placeholder="Enter text to translate"
            className="w-full h-96 p-2 text-md bg-white text-black dark:bg-zinc-900 dark:text-white border-green-400"
            {...register("text")}
          />
          {errors.text && <p className="text-red-500">{errors.text.message}</p>}
        </div>
        <Textarea
          placeholder="Translation will appear here"
          value={translatedText}
          readOnly
          className="w-full h-96 p-2 text-md bg-white text-black dark:bg-zinc-900 dark:text-white border-green-400"
        />
      </div>
      <div className="w-1/6 mx-auto">
        <button className="w-full px-6 py-3 flex items-center justify-center gap-3 bg-green-500 text-white rounded-lg font-semibold text-lg transition-all hover:bg-green-600 shadow-[6px_6px_0_0_#166534] hover:shadow-[2px_2px_0_0_#166534] hover:translate-x-1 hover:translate-y-1">
          <Sparkles className="size-6 ml-2 text-white fill-green-400" />
          {translation.isPending ? "TRANSLATING..." : "AI TRANSLATE"}
        </button>
      </div>
    </form>
  );
};

export default Translator;
