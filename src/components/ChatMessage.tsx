import { Bot, Copy, User } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ChatMessage = ({
  type,
  message,
}: {
  type: "bot" | "user";
  message: string;
}) => {
  const copyOutput = (text: string) => {
    if (text === "") return;
    navigator.clipboard.writeText(text);
    toast.info("Text copied to clipboard!");
  };

  return (
    <>
      <div
        key={crypto.randomUUID()}
        className={`flex items-center space-x-3 ${
          type === "bot" ? "justify-start" : "justify-end"
        }`}
      >
        {type === "bot" ? (
          <Bot className="size-6 self-start text-white dark:text-black p-1 bg-green-600 rounded-full mt-1" />
        ) : (
          <User className="size-6 self-start text-white dark:text-black p-1 bg-green-600 rounded-full mt-1" />
        )}
        <div className="bg-gray-100 dark:bg-zinc-900 rounded-lg p-3 max-w-[40%] relative">
          <div className="flex items-center mb-1">
            <span
              className={`text-xs font-semibold ${
                type === "bot" ? "text-green-400" : "text-zinc-500"
              }`}
            >
              {type === "bot" ? "LetAIHelp" : "You"}
            </span>
            {type === "bot" && (
              <Copy
                onClick={() => copyOutput(message)}
                className="size-4 ml-2 text-black dark:text-zinc-500 fill-green-400 cursor-pointer absolute top-2 right-2"
              />
            )}
          </div>
          <div className="text-black dark:text-white">
            <MarkdownParser text={message} />
          </div>
        </div>
      </div>
    </>
  );
};

const MarkdownParser = ({ text }: { text: string }) => {
  const parseText = (input: string) => {
    const lines = input.split("\n");
    // Join the lines with <br> for line breaks
    return lines.join("<br/>");
  };

  return <div dangerouslySetInnerHTML={{ __html: parseText(text) }} />;
};

export default ChatMessage;
