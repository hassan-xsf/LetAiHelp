import { Bot, User } from "lucide-react";
import React from "react";

const ChatMessage = ({
  type,
  message,
}: {
  type: "bot" | "user";
  message: string;
}) => {
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
    // Replace "**text**" with "<b>text</b>"
    let formattedText = input.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Replace ``` with <code> (open and close tags)
    formattedText = formattedText.replace(
      /```([\s\S]*?)```/g,
      "<div class = 'testBG'><code class = 'test'>$1</code></div>"
    );

    const lines = formattedText.split("\n");
    return lines.join("<br/>");
  };

  return <div dangerouslySetInnerHTML={{ __html: parseText(text) }} />;
};

export default ChatMessage;
