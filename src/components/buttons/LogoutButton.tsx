"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  return (
    <button
      aria-label="Sign Out"
      className="z-10 cursor-pointer rounded-md bg-green-600 p-1 text-[10px] font-semibold text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 sm:p-2 sm:text-sm"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
    >
      Sign Out
    </button>
  );
};

export default LogoutBtn;
