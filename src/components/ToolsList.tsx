import React from "react";
import {
  RefreshCw,
  Bot,
  Image,
  GraduationCap,
  BookA,
  Code2Icon,
  Frown,
} from "lucide-react";
import Link from "next/link";

const ToolsList = () => {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-4 pt-10 text-white sm:w-auto md:grid-cols-2 lg:grid-cols-3">
      <div className="row-span-2 rounded-lg bg-white p-4 dark:bg-[#1E1E1E]">
        <Bot className="mb-2 size-6 text-green-400" />
        <DashboardLink href="chat" text="Chat Tools" />
        <p className="mb-4 pt-4 text-xs text-gray-500 dark:text-gray-400">
          One of the best Chat AI Tools for free, Trained according to your
          personal needs.
        </p>
        <div className="space-y-2">
          <Link
            href="/tools/paid?type=gpt-4o"
            className="flex items-center text-xs text-gray-500 underline dark:text-gray-400"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
            Chat GPT 4.0
          </Link>
          <Link
            href="/tools/paid?type=claude-sonnet-3.5"
            className="flex items-center text-xs text-gray-500 underline dark:text-gray-400"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
            Claude Sonnet 3.5
          </Link>
          <Link
            href="/tools/chat?type=default"
            className="flex items-center text-xs text-gray-500 underline dark:text-gray-400"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
            AI Chatbot
          </Link>
          <Link
            href="/tools/chat?type=pa"
            className="flex items-center text-xs text-gray-500 underline dark:text-gray-400"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
            AI Personal Assistant
          </Link>
          <Link
            href="/tools/chat?type=explainer"
            className="flex items-center text-xs text-gray-500 underline dark:text-gray-400"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
            AI Explainer
          </Link>
        </div>
      </div>
      <div className="row-span-2 rounded-lg bg-white p-4 dark:bg-[#1E1E1E]">
        <GraduationCap className="mb-2 size-6 text-green-400" />
        <DashboardLink href="ai-detector" text="Tools for Learners" />
        <p className="pt-4 text-xs text-gray-500 dark:text-gray-400">
          Are you a learner or a student? So am I,Use these AI tools and focus
          on what's needed.
        </p>
        <div className="space-y-2 pt-4">
          <Link
            href="/tools/ai-detector"
            className="flex items-center text-xs text-gray-500 underline dark:text-gray-400"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
            AI Detection Tool
          </Link>
          <Link
            href="/tools/paraphraser"
            className="flex items-center text-xs text-gray-500 underline dark:text-gray-400"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
            AI Paraphraser
          </Link>
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 dark:bg-[#1E1E1E]">
        <RefreshCw className="mb-2 h-6 w-6 text-green-400" />
        <DashboardLink href="summarizer" text="Summarizer Tool" />

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Who got time to read all the boring stuff ey? Use our summarizer tool
          and learn in minutes!
        </p>
      </div>

      <div className="rounded-lg bg-white p-4 dark:bg-[#1E1E1E]">
        <Code2Icon className="mb-2 h-6 w-6 text-green-400" />
        <DashboardLink href="chat?type=coder" text="AI Developer" />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Looking for a coding buddy? Our AI Tool has got you!
        </p>
        <div className="space-y-2 pt-4">
          <p className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
            Explaining complex topic in seconds
          </p>
          <p className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
            Resolving your coding issues
          </p>
          <p className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
            Giving feedback on your code.
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-white p-4 dark:bg-[#1E1E1E]">
        <Image className="mb-2 h-6 w-6 text-green-400" />
        <DashboardLink href="text-to-image" text="Image Tools" />

        <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
          Generate all sorts of images in just a few clicks.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {["Realistic", "Anime", "Art", "Scenery", "Avatars", "Games"].map(
            (ext, i) => (
              <div
                key={i}
                className="rounded bg-zinc-950 p-1 text-center text-xs text-white dark:bg-[#2A2A2A]"
              >
                {ext}
              </div>
            ),
          )}
        </div>
      </div>
      <div className="rounded-lg bg-white p-4 dark:bg-[#1E1E1E]">
        <BookA className="mb-2 h-6 w-6 text-green-400" />
        <DashboardLink href="translator" text="AI Translation" />

        <p className="pt-2 text-xs text-gray-500 dark:text-gray-400">
          Experience the power of advanced AI translation. Simply input your
          text, choose your desired target language, and receive accurate
          translations.
        </p>
      </div>
      <div className="rounded-lg bg-white p-4 dark:bg-[#1E1E1E]">
        <Frown className="mb-2 h-6 w-6 text-green-400" />
        <h2 className="mb-1 text-lg font-semibold text-black dark:text-white">
          Missing a tool?
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          No worries, LetAIHelp is still in early progress, Suggest me your
          desired AI tool at{" "}
          <i>
            <b>hassandev45@gmail.com</b>
          </i>
        </p>
      </div>
    </div>
  );
};

export default ToolsList;

const DashboardLink = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link
      href={`/tools/${href}`}
      className="text-lg font-semibold text-black underline dark:text-white"
    >
      {text}
    </Link>
  );
};
