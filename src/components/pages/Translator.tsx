"use client";

import { Copy, Languages, Loader2, Sparkles } from "lucide-react";
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
import { Card } from "../ui/card";
import { Button } from "../ui/button";
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
      <div className="grid grid-cols-1 gap-4 pt-10 tracking-tighter sm:grid-cols-2">
        {errors.sr_lang && (
          <p className="text-xs text-red-500">{errors.sr_lang.message}</p>
        )}
        {errors.sr_lang && (
          <p className="text-xs text-red-500">{errors.sr_lang.message}</p>
        )}
        <Select onValueChange={(value) => setValue("sr_lang", value)}>
          <SelectTrigger className="w-full border-green-500/20 bg-white text-xs dark:bg-black">
            <Languages className="mr-2 h-4 w-4 text-green-500" />
            <SelectValue placeholder="Select source language" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(languageCodes).map(([key, value]) => (
              <SelectItem key={key} value={value} className="text-xs">
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setValue("tr_lang", value)}>
          <SelectTrigger className="w-full border-green-500/20 bg-white text-xs dark:bg-black">
            <Languages className="mr-2 h-4 w-4 text-green-500" />
            <SelectValue placeholder="Select target language" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(languageCodes).map(([key, value]) => (
              <SelectItem key={key} value={value} className="text-xs">
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 pt-1 tracking-tighter md:grid-cols-2">
        <Card className="relative border-green-500/20 bg-white dark:bg-black">
          <Textarea
            placeholder="Enter text to translate"
            className="min-h-[30vh] resize-none border-0 bg-transparent p-4 text-green-50 placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            maxLength={textLimits.Translator}
            {...register("text")}
          />
          <div className="absolute bottom-2 left-4 text-xs text-green-500/70">
            words: {currentText.length}/{textLimits.Translator}
          </div>
        </Card>
        <Card className="relative border-green-500/20 bg-white dark:bg-black">
          <Textarea
            value={translatedText}
            readOnly
            placeholder="Translation will appear here"
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
        {errors.text && (
          <p className="text-xs text-red-500">{errors.text.message}</p>
        )}
      </div>

      <div className="flex justify-center pt-4 tracking-tighter">
        <Button
          disabled={translation.isPending}
          className="text-md bg-green-500 px-6 py-4 font-bold text-white transition-colors hover:bg-green-400 dark:text-black"
        >
          <Sparkles className="mr-2 size-6" />
          {translation.isPending ? "TRANSLATING..." : "AI TRANSLATE"}
        </Button>
      </div>
    </form>
  );
};

export default Translator;
