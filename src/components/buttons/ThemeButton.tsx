"use client";

import { Sun, Moon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ThemeBtn = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Button
        aria-label="Theme Button"
        variant="ghost"
        className="animate-pulse bg-gray-200 dark:bg-zinc-900"
        size="icon"
      >
        <Loader2 className="size-2 animate-spin" />
      </Button>
    );
  return (
    <Button
      aria-label="Theme Button"
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
};

export default ThemeBtn;
