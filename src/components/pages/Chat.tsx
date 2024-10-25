"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { dataTagSymbol, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Credits } from "@/constants/credits";
import { Textarea } from "../ui/textarea";
import { Bot, Send, User } from "lucide-react";
import { Blend, Copy, Download, ImageIcon, Link, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  imageFormType,
  imageModels,
  imageSchema,
  imageTypes,
} from "@/schemas/imageSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageService } from "@/services/image";

import {
  chatType,
  textFormType,
  textModels,
  textSchema,
} from "@/schemas/textSchema";
import { useSearchParams } from "next/navigation";
import { chatService } from "@/services/chat";

export default function TextToImage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const chatValue: (typeof chatType)[keyof typeof chatType] =
    typeParam && chatType[typeParam as keyof typeof chatType] !== undefined
      ? chatType[typeParam as keyof typeof chatType]
      : chatType.default;

  const chatTypeNames = [
    "Chat Bot",
    "Personal AI Assistant",
    "AI Explainer",
    "AI Coder",
  ];

  const [message, setMessage] = useState<ChatType[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<textFormType>({
    defaultValues: {
      prompt: "",
      model: textModels[0],
      type: chatValue,
    },
    resolver: zodResolver(textSchema),
  });

  const generateText = useMutation({
    mutationFn: chatService,
    onSuccess: (res) => {
      toast.success("Your text has been generated!");
      console.log(res.data.data);
      setMessage((prev) => [
        ...prev,
        { type: "bot", message: res.data.data.result },
      ]);
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

  const onSubmit = async (data: textFormType) => {
    if (session.data.user.credits < Credits.Chat)
      toast.error("You don't have enough credits to perform this action");

    if (generateText.isPending) return;
    generateText.mutate(data);
    setMessage((prev) => [...prev, { type: "user", message: data.prompt }]);

    toast.info("AI is thinking....");
    reset();
    const newCredits = session.data.user.credits - Credits.TextToImage;
    session.update({
      credits: newCredits === 0 ? 1 : newCredits,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-[68vh] bg-black px-8 pt-8 mt-10 text-white overflow-hidden flex flex-col rounded-lg"
    >
      <div className="border-b border-zinc-800">
        <div className="flex items-center mb-2">
          <Bot className="w-6 h-6 mr-2 text-green-400" />
          <h1 className="text-xl font-bold">{chatTypeNames[chatValue]}</h1>
        </div>
        <div className="flex items-center gap-4">
          <p>AI Model: </p>
          <Select
            value={getValues("model")}
            onValueChange={(value: (typeof textModels)[number]) =>
              setValue("model", value)
            }
          >
            <SelectTrigger className="w-[300px] bg-white dark:bg-black border border-green-400 my-3">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {textModels.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {message.map((msg) => (
          <>
            <ChatMessage type={msg.type} message={msg.message} />
          </>
        ))}
      </div>
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center bg-zinc-900 rounded-lg p-2 gap-2">
          <Textarea
            {...register("prompt")}
            disabled={generateText.isPending}
            rows={3}
            placeholder="Ask Jake about coding..."
            className="flex-grow bg-transparent outline-none text-white placeholder-zinc-500 text-sm"
          />
          <button
            className="p-2 rounded-full bg-green-600 hover:bg-green-500 transition-colors duration-200"
            disabled={generateText.isPending}
          >
            {generateText.isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Send className="size-5" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
const ChatMessage = ({
  type,
  message,
}: {
  type: "bot" | "user";
  message: string;
}) => {
  return (
    <>
      <div
        className={`flex items-center space-x-3 ${
          type === "bot" ? "justify-start" : "justify-end"
        }`}
      >
        {type === "bot" ? (
          <Bot className="w-8 h-8 text-black p-1 bg-green-600 rounded-full mt-1" />
        ) : (
          <User className="w-8 h-8 text-black p-1 bg-green-600 rounded-full mt-1" />
        )}
        <div className="bg-zinc-900 rounded-lg p-3 max-w-[80%]">
          <div className="flex items-center mb-1">
            <span
              className={`text-xs font-semibold ${
                type === "bot" ? "text-green-400" : "text-zinc-600"
              }`}
            >
              {type === "bot" ? "LetAIHelp" : "You"}
            </span>
          </div>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </>
  );
};
