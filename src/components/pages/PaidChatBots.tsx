"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Credits } from "@/constants/credits";
import { Textarea } from "../ui/textarea";
import { Bot, Send, User } from "lucide-react";
import { Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSearchParams } from "next/navigation";
import ChatMessage from "../ChatMessage";
import { useMutation } from "@tanstack/react-query";
import { paidBotService } from "@/services/paidBot";
import { AxiosError } from "axios";
import {
  paidTextFormType,
  paidTextModels,
  paidTextSchema,
} from "@/schemas/paidModelsSchema";
import { Slider } from "../ui/slider";

export default function TextToImage() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  let type = 0;

  switch (typeParam) {
    case "gpt-4o":
      type = 0;
      break;
    case "claude-sonnet-3.5":
      type = 1;
      break;
    case "gemini-pro":
      type = 2;
      break;
    default:
      type = 0;
  }

  const [message, setMessage] = useState<ChatType[]>([]);

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<paidTextFormType>({
      defaultValues: {
        prompt: "",
        model: paidTextModels[type],
        max_tokens: 512,
      },
      resolver: zodResolver(paidTextSchema),
    });
  const tokens = watch("max_tokens");
  useEffect(() => {
    scrollToBottom();
  }, [message]);

  const paidBot = useMutation({
    mutationFn: paidBotService,
    onSuccess: (res) => {
      toast.success("Your message has been responded!");
      setMessage((prev) => [...prev, { type: "bot", message: res.data }]);
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

  const onSubmit = async (data: paidTextFormType) => {
    if (session.data.user.credits < Credits.Chat)
      return toast.error(
        "You don't have enough credits to perform this action"
      );

    if (paidBot.isPending) return;
    setMessage((prev) => [...prev, { type: "user", message: data.prompt }]);
    paidBot.mutate(data);
    reset();
    const newCredits = session.data.user.credits - Credits.TextToImage;
    session.update({
      credits: newCredits === 0 ? 1 : newCredits,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-[68vh] bg-white dark:bg-black border-green-400 border px-8 pt-8 mt-10 text-white overflow-hidden flex flex-col rounded-lg"
    >
      <div className="border-b border-zinc-800">
        <div className="flex items-center mb-2">
          <Bot className="w-6 h-6 mr-2 text-green-400" />
          <h1 className="text-xl text-black dark:text-white font-bold">
            {paidTextModels[type].toUpperCase()}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-black dark:text-white">Tokens: {tokens}</p>
          <Slider
            className="w-[230px]"
            defaultValue={[512]}
            min={100}
            max={5128}
            step={20}
            onValueChange={(value) => setValue("max_tokens", value[0])}
          />
        </div>
        <p className="text-red-500 py-1">
          More tokens takes more time for the AI Model to process..
        </p>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {message.map((msg, indx) => (
          <>
            <ChatMessage
              type={msg.type}
              message={msg.message}
              key={crypto.randomUUID()}
            />
          </>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="pb-4 border-t border-zinc-800">
        <div className="flex items-center bg-gray-100 dark:bg-zinc-900 rounded-lg p-2 gap-2">
          <Textarea
            {...register("prompt")}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSubmit(onSubmit)()
            }
            disabled={paidBot.isPending}
            rows={3}
            placeholder="Ask any questions..."
            className="flex-grow bg-transparent outline-none border-none text-black dark:text-white placeholder-zinc-500 text-sm"
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-green-600 hover:bg-green-500 transition-colors duration-200"
            disabled={paidBot.isPending}
          >
            {paidBot.isPending ? (
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
