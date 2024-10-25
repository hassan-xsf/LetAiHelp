"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Credits } from "@/constants/credits";
import { Textarea } from "../ui/textarea";
import { Bot, Send, User } from "lucide-react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  chatType,
  textFormType,
  textModels,
  textSchema,
} from "@/schemas/textSchema";
import { useSearchParams } from "next/navigation";
import ChatMessage from "../ChatMessage";

export default function TextToImage() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState<ChatType[]>([]);

  const { register, handleSubmit, setValue, getValues, reset } =
    useForm<textFormType>({
      defaultValues: {
        prompt: "",
        model: textModels[0],
        type: chatValue,
      },
      resolver: zodResolver(textSchema),
    });
  useEffect(() => {
    scrollToBottom();
  }, [message]);

  const handleStream = async (data: textFormType) => {
    setIsLoading(true);

    setMessage((prev) => [
      ...prev,
      {
        type: "bot",
        message: "",
      },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("Failed to get reader from response");
      }

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim() === "data: [DONE]") {
            continue;
          }
          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(5).trim();

            try {
              const parsed = JSON.parse(jsonStr);

              // Append new data to the last bot message
              setMessage((prev) => {
                const updatedMessages = [...prev];
                const lastBotMessageIndex = updatedMessages
                  .slice()
                  .reverse()
                  .findIndex((msg) => msg.type === "bot");

                if (lastBotMessageIndex !== -1) {
                  const indexToUpdate =
                    updatedMessages.length - 1 - lastBotMessageIndex;
                  updatedMessages[indexToUpdate] = {
                    ...updatedMessages[indexToUpdate],
                    message:
                      updatedMessages[indexToUpdate].message +
                      (parsed.response || "").replace("</s>", ""),
                  };
                }
                return updatedMessages;
              });
            } catch (error) {
              console.error("Error parsing JSON:", error, jsonStr);
            }
          }
        }
      }
    } catch (error) {
      toast.error("There was a problem generating the text.");
    } finally {
      setIsLoading(false);
    }
  };

  const session = useSession();
  if (!session.data) return null;

  const onSubmit = async (data: textFormType) => {
    if (session.data.user.credits < Credits.Chat)
      return toast.error(
        "You don't have enough credits to perform this action"
      );

    if (isLoading) return;
    setMessage((prev) => [...prev, { type: "user", message: data.prompt }]);
    handleStream(data);
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
            {chatTypeNames[chatValue]}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-black dark:text-white">AI MODEL: </p>
          <Select
            value={getValues("model")}
            onValueChange={(value: (typeof textModels)[number]) =>
              setValue("model", value)
            }
          >
            <SelectTrigger className="w-[300px] text-black dark:text-white bg-white dark:bg-black border border-green-400 my-3">
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
            disabled={isLoading}
            rows={3}
            placeholder="Ask any questions..."
            className="flex-grow bg-transparent outline-none border-none text-black dark:text-white placeholder-zinc-500 text-sm"
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-green-600 hover:bg-green-500 transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
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
