"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Credits } from "@/constants/credits";
import { Textarea } from "../ui/textarea";
import { Bot, Send } from "lucide-react";
import { Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSearchParams } from "next/navigation";
import ChatMessage from "../ChatMessage";
import { useMutation } from "@tanstack/react-query";
import { paidBotService } from "@/services/paidBot";
import { AxiosError } from "axios";
import {
  paidTextModels,
  UpdatedPaidTextFormType,
  updatedPaidTextSchema,
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
    useForm<UpdatedPaidTextFormType>({
      defaultValues: {
        prompt: "",
        model: paidTextModels[type],
        max_tokens: 1012,
      },
      resolver: zodResolver(updatedPaidTextSchema),
    });
  const tokens = watch("max_tokens");
  useEffect(() => {
    scrollToBottom();
  }, [message]);

  const paidBot = useMutation({
    mutationFn: paidBotService,
    onSuccess: (res) => {
      if (!session.data) return;
      const newCredits = session.data.user.credits - Credits.Chat;
      session.update({
        credits: newCredits === 0 ? 1 : newCredits,
      });
      toast.success("Your message has been responded!");
      setMessage((prev) => [...prev, { role: "assistant", content: res.data }]);
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

  const onSubmit = async (data: UpdatedPaidTextFormType) => {
    if (session.data.user.credits < Credits.Chat)
      return toast.error(
        "You don't have enough credits to perform this action",
      );

    if (paidBot.isPending) return;
    setMessage((prev) => [...prev, { role: "user", content: data.prompt }]);

    paidBot.mutate({
      messages: [...message, { role: "user", content: data.prompt }],
      model: data.model,
      max_tokens: data.max_tokens,
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 flex h-[68vh] flex-col overflow-hidden rounded-lg border border-green-400 bg-white px-8 pt-8 text-white dark:bg-black"
    >
      <div className="border-b border-zinc-800">
        <div className="mb-2 flex items-center">
          <Bot className="mr-2 h-6 w-6 text-green-400" />
          <h1 className="text-xl font-bold text-black dark:text-white">
            {paidTextModels[type].toUpperCase()}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-black dark:text-white">Tokens: {tokens}</p>
          <Slider
            aria-label="Tokens"
            className="w-[230px]"
            defaultValue={[512]}
            min={100}
            max={5128}
            step={20}
            onValueChange={(value) => setValue("max_tokens", value[0])}
          />
        </div>
        <p className="py-1 text-red-500">
          More tokens increase the reply length but takes more time for the AI
          Model to process..
        </p>
      </div>
      <div className="flex-grow space-y-4 overflow-y-auto p-4">
        {message.map((msg, indx) => (
          <>
            <ChatMessage
              role={msg.role}
              content={msg.content}
              key={crypto.randomUUID()}
            />
          </>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="border-t border-zinc-800 pb-4">
        <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-2 dark:bg-zinc-900">
          <Textarea
            {...register("prompt")}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSubmit(onSubmit)()
            }
            disabled={paidBot.isPending}
            rows={3}
            placeholder="Ask any questions..."
            className="flex-grow border-none bg-transparent text-sm text-black placeholder-zinc-500 outline-none dark:text-white"
          />
          <button
            aria-label="Send"
            type="submit"
            className="rounded-full bg-green-600 p-2 transition-colors duration-200 hover:bg-green-500"
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
