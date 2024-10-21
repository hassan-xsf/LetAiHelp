"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
      >
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
