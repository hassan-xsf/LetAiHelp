"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  return (
    <Button
      className="bg-green-600 text-white font-semibold hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-sm p-2 rounded-md cursor-pointer z-10"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
    >
      Sign Out
    </Button>
  );
};

export default LogoutBtn;
