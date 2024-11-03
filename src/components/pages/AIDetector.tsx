"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Bot, Check, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { aiDetectorService } from "@/services/aidetector";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Credits } from "@/constants/credits";

export default function Component() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AIDetectionResponse | null>(null);

  const aiDetection = useMutation({
    mutationFn: aiDetectorService,
    onSuccess: (res) => {
      if (!session.data) return;
      toast.success("Your AI detection report is ready");
      setResult(res.data);
      const newCredits = session.data.user.credits - Credits.TextToImage;
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

  const handleDetect = () => {
    if (session.data.user.credits < Credits.AIDetector)
      return toast.error(
        "You don't have enough credits to perform this action",
      );

    if (aiDetection.isPending) return;
    if (text.length < 100)
      return toast.error("Text must be at least 100 characters");
    if (text.length > 15000)
      return toast.error("Text must be at most 15000 characters");
    aiDetection.mutate({ input_text: text });
  };
  return (
    <div className="mt-5 min-h-[62vh] rounded-md bg-white tracking-tighter text-white dark:bg-zinc-950">
      <div className="flex items-center justify-center rounded-md bg-green-600 p-3 text-xl font-bold md:text-2xl">
        <Bot className="mr-2 h-6 w-6 rounded-full bg-white p-1 text-green-600" />
        AI DETECTOR
      </div>
      <Card className="mx-auto border-none bg-transparent p-2 lg:max-w-7xl xl:p-10">
        <CardContent className="space-y-6 p-2 xl:p-6">
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                value={text}
                placeholder="Enter text to analyze (100-15000 words)"
                className="min-h-[25vh] resize-none border-green-400/30 bg-black p-4 text-green-50 placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) => setText(e.target.value)}
              />
              <div className="absolute bottom-2 right-2 text-[10px] text-green-500 md:text-sm">
                {text.length}/15000 characters
              </div>
            </div>
            <Button
              area-label="Detect AI"
              onClick={handleDetect}
              className="w-full rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
            >
              {aiDetection.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "DETECT AI"
              )}
            </Button>
          </div>
          {result?.data && result.data.fakePercentage >= 0 && (
            <div className="space-y-6 text-center">
              <span className="text-xl font-semibold text-green-500">
                {result.data.feedback.toUpperCase()}
              </span>
              <div className="flex items-center justify-center">
                <div className="relative h-48 w-48">
                  <svg
                    className="h-full w-full -rotate-90 transform"
                    viewBox="0 0 100 100"
                  >
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "#FF8C00", stopOpacity: 1 }}
                        />{" "}
                        <stop
                          offset="50%"
                          style={{ stopColor: "#FFA500", stopOpacity: 1 }}
                        />{" "}
                        <stop
                          offset="100%"
                          style={{ stopColor: "#FF4500", stopOpacity: 1 }}
                        />{" "}
                      </linearGradient>
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                    />
                    <circle
                      className="text-green-500"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="10"
                      strokeDasharray={`${
                        result.data.fakePercentage * 2.827
                      }, 282.7`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">
                      {result.data.fakePercentage}%
                    </span>
                    <span className="text-sm text-green-500">AI Detected</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>
                    Human: {(100 - result.data.fakePercentage).toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
                  <span>AI: {result.data.fakePercentage}%</span>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Detected AI Content:
                </h3>
                <div className="min-h-[20vh] resize-none border border-green-400/30 bg-black p-4 text-start text-green-50">
                  {result.data.originalParagraph.split(" ").map((word, i) =>
                    result.data.h
                      .map((h) => h.split(" "))
                      .flat()
                      .includes(word) ? (
                      <span key={word + i} className="text-red-500">
                        {word + " "}
                      </span>
                    ) : (
                      <span key={word + i}>{word + " "}</span>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
