"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Check, Loader2 } from "lucide-react";
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
        "You don't have enough credits to perform this action"
      );

    if (aiDetection.isPending) return;
    if (text.length < 100)
      return toast.error("Text must be at least 100 characters");
    if (text.length > 15000)
      return toast.error("Text must be at most 15000 characters");
    aiDetection.mutate({ input_text: text });
  };
  return (
    <div className="min-h-[62vh] bg-white dark:bg-black text-white p-8 mt-5">
      <Card className="max-w-7xl p-10 mx-auto bg-transparent border">
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to analyze (100-15000 words)"
                className="w-full h-64 p-4 bg-white dark:bg-zinc-900 border-green-500 border rounded-lg resize-none"
              />
              <div className="absolute bottom-2 right-2 text-sm text-green-500">
                {text.length}/15000 characters
              </div>
            </div>
            <Button
              area-label="Detect AI"
              onClick={handleDetect}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
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
              <span className="text-green-500 font-semibold text-xl">
                {result.data.feedback.toUpperCase()}
              </span>
              <div className="flex justify-center items-center">
                <div className="relative w-48 h-48">
                  <svg
                    className="w-full h-full transform -rotate-90"
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
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Human: {100 - result.data.fakePercentage}%</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                  <span>AI: {result.data.fakePercentage}%</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Detected AI Content:
                </h3>
                <div className="w-full min-h-32 p-4 bg-white dark:bg-zinc-900 border-green-500 border rounded-lg resize-none">
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
                    )
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
