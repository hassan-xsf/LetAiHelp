import { SparklesIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = ({ type = 1 }: { type?: number }) => {
  return (
    <Link
      className={`flex items-center justify-center tracking-tight ${
        type === 1 ? "flex-row" : "flex-col"
      }`}
      href="/"
    >
      <SparklesIcon
        className={`fill-green-400 text-green-400 dark:text-green-400 ${
          type === 1 ? "size-6" : "size-8"
        }`}
      />
      <span
        className={`ml-2 text-2xl font-bold text-gray-900 dark:text-white ${
          type === 1 && "hidden sm:block"
        }`}
      >
        LetAiHelp
        <span className="text-xs font-extrabold text-green-400">.me</span>
      </span>
    </Link>
  );
};

export default Logo;
