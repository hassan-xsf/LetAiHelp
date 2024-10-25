"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function SimpleAIStream() {
  const [streamData, setStreamData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStream = async () => {
    setIsLoading(true);
    setStreamData("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "Hello, world!",
          model: "@hf/thebloke/zephyr-7b-beta-awq",
          type: 0,
        }),
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
          console.log(line);
          if (line.trim() === "data: [DONE]") {
            continue;
          }
          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(5).trim();
            try {
              const parsed = JSON.parse(jsonStr);
              setStreamData(
                (prevData) =>
                  prevData + (parsed.response || "").replace("</s>", "")
              );
            } catch (error) {
              console.error("Error parsing JSON:", error, jsonStr);
            }
          } else if (line.trim() !== "") {
            try {
              const parsed = JSON.parse(line);
              setStreamData(
                (prevData) =>
                  prevData + (parsed.response || "").replace("</s>", "")
              );
            } catch (error) {
              console.error("Error parsing non-data line:", error, line);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching stream:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div>
        <div>Simple AI Stream</div>
      </div>
      <div>
        <Button onClick={handleStream} disabled={isLoading}>
          {isLoading ? "Streaming..." : "Start Stream"}
        </Button>
        <div className="mt-4 p-4 bg-gray-100 rounded-md min-h-[100px] whitespace-pre-wrap">
          {streamData || "Stream will appear here..."}
        </div>
      </div>
    </div>
  );
}
