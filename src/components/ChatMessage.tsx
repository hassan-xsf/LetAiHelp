import { Bot, User } from "lucide-react";
import React from "react";

import MarkdownIt from "markdown-it";
import markdownItHighlightJs from "markdown-it-highlightjs";
import "highlight.js/styles/vs2015.css";

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
          <Bot className="size-6 self-start text-white dark:text-black p-1 bg-green-600 rounded-full mt-1" />
        ) : (
          <User className="size-6 self-start text-white dark:text-black p-1 bg-green-600 rounded-full mt-1" />
        )}
        <div className="bg-gray-100 dark:bg-zinc-900 rounded-lg p-3 max-w-[40%] relative">
          <div className="flex items-center mb-1">
            <span
              className={`text-xs font-semibold ${
                role === "assistant" ? "text-green-400" : "text-zinc-500"
              }`}
            >
              {role === "assistant" ? "LetAIHelp" : "You"}
            </span>
          </div>
          <div className="text-black dark:text-white">
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
      className="markdown-body leading-7"
    />
  );
};

export default ChatMessage;
