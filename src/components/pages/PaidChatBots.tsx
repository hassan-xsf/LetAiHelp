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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 rounded-md">
      <Card className="mx-auto flex h-[68vh] w-full max-w-full flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 rounded-md bg-green-600 text-white">
          <CardTitle className="flex items-center justify-center text-xl font-bold md:text-2xl">
            <Bot className="mr-2 h-6 w-6 rounded-full bg-white p-1 text-green-600" />
            {paidTextModels[type].toUpperCase()}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden rounded-md p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex w-full flex-col">
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="tokens"
                  className="flex-shrink-0 text-xs sm:text-sm md:text-base"
                >
                  Tokens: {tokens}
                </Label>
                <Slider
                  id="tokens"
                  aria-label="Tokens"
                  defaultValue={[512]}
                  min={512}
                  max={5128}
                  step={20}
                  onValueChange={(value) => setValue("max_tokens", value[0])}
                  className="w-[250px]"
                />
              </div>
              <span className="text-xs text-zinc-600 dark:text-gray-300">
                More tokens takes more time to process but provides longer
                results.
              </span>
            </div>
          </div>
          <ScrollArea
            className="h-[calc(100%-3rem)] w-full rounded-md border p-4"
            ref={messagesEndRef}
          >
            {message.map((msg, indx) => (
              <>
                <ChatMessage
                  role={msg.role}
                  content={msg.content}
                  key={crypto.randomUUID()}
                />
              </>
            ))}
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
            <Button type="submit" size="icon" disabled={paidBot.isPending}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
