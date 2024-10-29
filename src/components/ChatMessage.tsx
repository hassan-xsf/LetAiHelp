import { Bot, User } from "lucide-react";
import React from "react";

import MarkdownIt from "markdown-it";
import markdownItHighlightJs from "markdown-it-highlightjs";
import "@/app/vs2015.css";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
}).use(markdownItHighlightJs);

const ChatMessage = ({ role, content }: ChatType) => {
  return (
    <>
      <div
        key={crypto.randomUUID()}
        className={`flex items-center space-x-3 ${
          role === "assistant" ? "justify-start" : "justify-end"
        }`}
      >
        {role === "assistant" ? (
          <Bot className="mt-1 size-6 self-start rounded-full bg-green-600 p-1 text-white dark:text-black" />
        ) : (
          <User className="mt-1 size-6 self-start rounded-full bg-green-600 p-1 text-white dark:text-black" />
        )}
        <div className="relative max-w-[80%] rounded-lg bg-gray-100 p-3 dark:bg-zinc-900 md:max-w-[40%]">
          <div className="mb-1 flex items-center">
            <span
              className={`text-xs font-semibold md:text-xs ${
                role === "assistant" ? "text-green-400" : "text-zinc-500"
              }`}
            >
              {role === "assistant" ? "LetAIHelp" : "You"}
            </span>
          </div>
          <div className="text-sm text-black dark:text-white">
            <MarkdownParser text={content} />
          </div>
        </div>
      </div>
    </>
  );
};

const MarkdownParser = ({ text }: { text: string }) => {
  const parsedText = md.render(text);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: parsedText }}
      className="markdown-body leading-7 tracking-tighter"
    />
  );
};

export default ChatMessage;
