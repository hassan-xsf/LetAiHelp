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
    <div className="text-white pt-10 grid grid-cols-3 gap-4">
      <div className="col-span-1 row-span-2 bg-white dark:bg-[#1E1E1E] rounded-lg p-6">
        <Bot className="w-8 h-8 text-green-400 mb-4" />
        <DashboardLink href="chat" text="Chat Tools" />

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          One of the best Chat AI Tools for free, Trained according to your
          personal needs.
        </p>
        <div className="space-y-2">
          <Link
            href="/dashboard/chat?type=default"
            className="text-gray-500 dark:text-gray-400 text-sm flex items-center underline"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            AI Chatbot
          </Link>
          <Link
            href="/dashboard/chat?type=pa"
            className="text-gray-500 dark:text-gray-400 text-sm flex items-center underline"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            AI Personal Assistant
          </Link>
          <Link
            href="/dashboard/chat?type=explainer"
            className="text-gray-500 dark:text-gray-400 text-sm flex items-center underline"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            AI Explainer
          </Link>
        </div>
      </div>
      <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-4 row-span-2">
        <GraduationCap className="size-6 text-green-400 mb-2" />
        <DashboardLink href="ai-detector" text="Tools for Learners" />

        <p className="text-gray-500 dark:text-gray-400 text-xs">
          Are you a learner or a student? So am I, Use these AI tools and focus
          on what's needed.
        </p>
        <div className="space-y-2 pt-4">
          <Link
            href="/dashboard/ai-detector"
            className="text-gray-500 dark:text-gray-400 text-sm flex items-cente underline"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            AI Detection Tool
          </Link>
          <Link
            href="/dashboard/paraphraser"
            className="text-gray-500 dark:text-gray-400 text-sm flex items-center underline"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            AI Paraphraser
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            AI Study Helper
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            AI MCQ Quizzer
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-4">
        <RefreshCw className="w-6 h-6 text-green-400 mb-2" />
        <DashboardLink href="summarizer" text="Summarizer Tool" />

        <p className="text-gray-500 dark:text-gray-400 text-xs">
          Who got time to read all the boring stuff ey? Use our summarizer tool
          and learn in minutes!
        </p>
      </div>

      <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-4">
        <Code2Icon className="w-6 h-6 text-green-400 mb-2" />
        <DashboardLink href="chat?type=coder" text="AI Developer" />

        <p className="text-gray-500 dark:text-gray-400 text-xs">
          Looking for a coding buddy? Our AI Tool has got you!
        </p>
        <div className="space-y-2 pt-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Explaining complex topic in seconds
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Resolving your coding issues
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Giving feedback on your code.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-4">
        <Image className="w-6 h-6 text-green-400 mb-2" />
        <DashboardLink href="text-to-image" text="Image Tools" />

        <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">
          Generate all sorts of images in just a few clicks.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {["Realistic", "Anime", "Art", "Scenery", "Avatars", "Games"].map(
            (ext, i) => (
              <div
                key={i}
                className="bg-zinc-950 dark:bg-[#2A2A2A] rounded p-1 text-center text-xs text-white"
              >
                {ext}
              </div>
            )
          )}
        </div>
      </div>
      <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-4">
        <BookA className="w-6 h-6 text-green-400 mb-2" />
        <DashboardLink href="translator" text="AI Translation" />

        <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400 text-xs">
          Experience the power of advanced AI translation. Simply input your
          text, choose your desired target language, and receive accurate
          translations in a matter of seconds. Perfect for breaking language
          barriers effortlessly.
        </p>
      </div>
      <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-4">
        <Frown className="w-6 h-6 text-green-400 mb-2" />
        <h2 className="text-lg font-semibold mb-1 text-black dark:text-white">
          Missing a tool?
        </h2>
        <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400 text-xs">
          No worries, LetAIHelp is still in early progress, Suggest me your
          desired AI tool at <i>hassandev45@gmail.com</i>
        </p>
      </div>
    </div>
  );
};

export default ToolsList;

const DashboardLink = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link
      href={`/dashboard/${href}`}
      className="text-lg font-semibold text-black dark:text-white underline"
    >
      {text}
    </Link>
  );
};
