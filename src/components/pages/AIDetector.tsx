"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Check } from "lucide-react";

export default function Component() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<null | {
    percentage: number;
    detectedContent: string;
  }>(null);

  const handleDetect = () => {
    const percentage = Math.floor(Math.random() * 101);
    const words = text.split(" ");
    const detectedWords = words.filter(() => Math.random() > 0.5);
    setResult({
      percentage,
      detectedContent: detectedWords.join(" "),
    });
  };

  return (
    <div className="min-h-[62vh] bg-white dark:bg-black text-white p-8">
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
                {text.split(" ").length}/15000 words
              </div>
            </div>
            <Button
              onClick={handleDetect}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              DETECT AI
            </Button>
          </div>
          {result && (
            <div className="space-y-6">
              <div className="flex justify-center items-center">
                <div className="relative w-48 h-48">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="10"
                      strokeDasharray={`${result.percentage * 2.827}, 282.7`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">
                      {result.percentage}%
                    </span>
                    <span className="text-sm text-green-500">AI Detected</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Human: {100 - result.percentage}%</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                  <span>AI: {result.percentage}%</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Detected AI Content:
                </h3>
                <Textarea
                  value={result.detectedContent}
                  readOnly
                  className="w-full h-32 p-4 bg-white dark:bg-zinc-900 border-green-500 border rounded-lg resize-none"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
