import { Bot, User } from "lucide-react";
import React from "react";

import markdownit from "markdown-it";
import "markdown-it-prism";
import "../app/prism-vsc-dark-plus.css";

const md = new markdownit({
  html: true,
  linkify: true,
  typographer: true,
}).use(require("markdown-it-prism"));

md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  return `<div class = "simpleCodeBG"><code>${md.utils.escapeHtml(
    token.content
  )}</code></div>`;
};

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
  const parsedText = md.render(text);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: parsedText }}
      className="markdown-body leading-7"
    />
  );
};

export default ChatMessage;
