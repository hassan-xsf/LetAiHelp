"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Credits } from "@/constants/credits";
import { Bot, Send, User } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSearchParams } from "next/navigation";
import ChatMessage from "../ChatMessage";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import {
  paidTextFormType,
  paidTextModels,
  UpdatedPaidTextFormType,
  updatedPaidTextSchema,
} from "@/schemas/paidModelsSchema";
import { Textarea } from "../ui/textarea";

export default function TextToImage() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
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
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState<ChatType[]>([]);

  const { register, handleSubmit, reset } = useForm<UpdatedPaidTextFormType>({
    defaultValues: {
      prompt: "",
      model: paidTextModels[type],
    },
    resolver: zodResolver(updatedPaidTextSchema),
  });
  useEffect(() => {
    scrollToBottom();
  }, [message]);

  const handleStream = async (data: paidTextFormType) => {
    setIsLoading(true);
    setMessage((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Thinking....",
      },
    ]);

    try {
      const response = await fetch("/api/paid", {
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
        const body = await reader.read();
        const { done, value } = body;
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        console.log(buffer);
        if (buffer.trim()) {
          const message = buffer.trim();
          console.log(message);
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
                content: message,
              };
            } else {
              updatedMessages.push({
                role: "assistant",
                content: message,
              });
            }
            return updatedMessages;
          });
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

  const onSubmit = async (data: UpdatedPaidTextFormType) => {
    if (session.data.user.credits < Credits.Chat)
      return toast.error(
        "You don't have enough credits to perform this action",
      );

    if (isLoading) return;
    setMessage((prev) => [...prev, { role: "user", content: data.prompt }]);

    handleStream({
      messages: [...message, { role: "user", content: data.prompt }],
      model: data.model,
    });
    reset();
    const newCredits = session.data.user.credits - Credits.Chat;
    session.update({
      credits: newCredits === 0 ? 1 : newCredits,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 rounded-md">
      <Card className="mx-auto flex h-[68vh] w-full max-w-full flex-col">
        <CardTitle className="flex items-center justify-center rounded-md bg-green-600 p-3 text-xl font-bold md:text-2xl">
          <Bot className="mr-2 h-6 w-6 rounded-full bg-white p-1 text-green-600" />
          {paidTextModels[type].toUpperCase()}
        </CardTitle>
        <CardContent className="flex-grow overflow-hidden rounded-md p-4">
          <ScrollArea className="h-full w-full rounded-md border p-4">
            {message.map((msg) => (
              <>
                <ChatMessage
                  role={msg.role}
                  content={msg.content}
                  key={msg.role + msg.content}
                />
              </>
            ))}
            <span ref={messagesEndRef}></span>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-0">
          <div className="flex w-full items-center space-x-2 p-4 pt-0">
            <Textarea
              placeholder={
                !isLoading ? "Type your message..." : "AI is typing..."
              }
              disabled={isLoading}
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
