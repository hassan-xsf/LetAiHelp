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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";

export default function TextToImage() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
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
        role: "assistant",
        content: "",
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
      if (!session.data) return;
      const newCredits = session.data.user.credits - Credits.Chat;
      session.update({
        credits: newCredits === 0 ? 1 : newCredits,
      });
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
                  .findIndex((msg) => msg.role === "assistant");

                if (lastBotMessageIndex !== -1) {
                  const indexToUpdate =
                    updatedMessages.length - 1 - lastBotMessageIndex;
                  updatedMessages[indexToUpdate] = {
                    ...updatedMessages[indexToUpdate],
                    content:
                      updatedMessages[indexToUpdate].content +
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
        "You don't have enough credits to perform this action",
      );

    if (isLoading) return;
    setMessage((prev) => [...prev, { role: "user", content: data.prompt }]);

    handleStream(data);
    reset();
    const newCredits = session.data.user.credits - Credits.TextToImage;
    session.update({
      credits: newCredits === 0 ? 1 : newCredits,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 rounded-md">
      <Card className="mx-auto flex h-[68vh] w-full max-w-full flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 rounded-md bg-green-600 text-white">
          <CardTitle className="flex items-center justify-center text-xl font-bold md:text-2xl">
            <Bot className="mr-2 h-6 w-6 rounded-full bg-white p-1 text-green-600" />
            {chatTypeNames[chatValue]}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden rounded-md p-4">
          <div className="flex w-full flex-col">
            <div className="flex items-center space-x-2">
              <p className="text-nowrap text-[10px] text-black dark:text-white sm:text-xs">
                AI MODEL:
              </p>
              <Select
                value={getValues("model")}
                onValueChange={(value: (typeof textModels)[number]) =>
                  setValue("model", value)
                }
              >
                <SelectTrigger className="my-3 w-[120px] border border-green-400 bg-white text-[10px] text-black dark:bg-black dark:text-white sm:text-xs md:w-[300px]">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {textModels.map((model) => (
                    <SelectItem
                      key={model}
                      value={model}
                      className="text-[10px] sm:text-xs"
                    >
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <ScrollArea className="h-[calc(100%-3rem)] w-full rounded-md border p-4">
            {message.map((msg) => (
              <>
                <ChatMessage
                  role={msg.role}
                  content={msg.content}
                  key={crypto.randomUUID()}
                />
              </>
            ))}
            <span ref={messagesEndRef}></span>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-0">
          <div className="flex w-full items-center space-x-2 p-4 pt-0">
            <Input
              type="text"
              placeholder="Type your message..."
              {...register("prompt")}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSubmit(onSubmit)()
              }
              className="flex-grow text-xs"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
