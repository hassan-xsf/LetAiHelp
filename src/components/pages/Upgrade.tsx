"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Zap,
  Gift,
  Star,
  BadgeDollarSignIcon,
  BadgeIndianRupee,
} from "lucide-react";
import Confetti from "react-confetti";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { upgradeService } from "@/services/upgrade";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import useWindowSize from "@/hooks/useWindowSize";

const page = () => {
  const [redeemCode, setRedeemCode] = useState("");
  const [showConfetti, setshowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const redeemUpgradeCode = useMutation({
    mutationFn: upgradeService,
    onSuccess: (res) => {
      if (!session.data) return;
      const newCredits = session.data.user.credits + res.data.data.credits;

      toast.success("Your code has been redeemed, New Credits: " + newCredits);
      setshowConfetti(true);
      session.update({ credits: newCredits });
      console.log(session.data);
      setTimeout(() => setshowConfetti(false), 5000);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }
      toast.error("There was a problem, Error code: 500");
    },
  });

  const session = useSession();
  if (!session.data) return null;

  const handleRedeem = () => {
    if (redeemUpgradeCode.isPending) return;
    if (redeemCode.length < 4) return toast.error("Invalid Code");
    redeemUpgradeCode.mutate({ code: redeemCode });
    setRedeemCode("");
  };
  return (
    <>
      {showConfetti && <Confetti width={width - 150} height={height - 150} />}
      <div className="flex flex-col rounded-md bg-gray-50 py-32 dark:bg-zinc-900">
        <main className="flex-1">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-green-500 p-3 text-white dark:text-white">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Purchase Credits</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Select the number of credits you want to purchase
                  </p>
                </div>
              </div>
            </div>

            {/* Redeem Code Section */}
            <Card className="mb-12 border border-green-400 bg-white dark:bg-zinc-900">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-green-500">
                  <Gift className="mr-2" />
                  Redeem Credits
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Enter your code to redeem additional credits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Input
                    type="text"
                    placeholder="Enter your code (eg: XXXX-9999)"
                    value={redeemCode}
                    onChange={(e) => setRedeemCode(e.target.value)}
                    className="flex-grow bg-gray-100 dark:bg-zinc-800"
                  />
                  <Button
                    aria-label="Redeem Code"
                    onClick={handleRedeem}
                    disabled={redeemUpgradeCode.isPending}
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    Redeem
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {/* Basic Plan */}
              <Card className="transform border-green-500 bg-white transition-all duration-300 hover:scale-105 hover:border-green-400 dark:bg-zinc-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl font-bold text-green-500">
                    <Star /> Basic
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Perfect for getting started
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4 text-4xl font-bold">1000 Credits</p>
                  <p className="mb-6 text-xl">+100 extra credits</p>
                  <div className="mb-4 flex items-center justify-center text-green-500">
                    <span className="text-xl font-light">$5</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-green-500 text-white hover:bg-green-600"
                    disabled
                  >
                    Currently Unavailable
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Plan (Larger) */}
              <Card className="flex scale-110 transform flex-col border-green-500 bg-white transition-all duration-300 hover:border-green-400 dark:bg-zinc-900 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-3xl font-bold text-green-500">
                    <BadgeDollarSignIcon className="size-8" /> Pro
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Most popular choice
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-grow flex-col justify-center text-center">
                  <p className="mb-6 text-6xl font-bold text-green-500">
                    2000 Credits
                  </p>
                  <p className="mb-8 text-2xl">+600 extra credits</p>
                  <div className="mb-6 flex items-center justify-center text-green-500">
                    <span className="text-2xl font-light">$10</span>
                  </div>
                  <div className="mx-auto inline-block rounded-full bg-green-500 px-4 py-2 text-white">
                    <Zap className="mr-2 inline" />
                    <span className="font-bold">Most Value</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-green-500 py-6 text-lg text-white hover:bg-green-600"
                    disabled
                  >
                    Currently Unavailable
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className="transform border-green-500 bg-white transition-all duration-300 hover:scale-105 hover:border-green-400 dark:bg-zinc-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl font-bold text-green-500">
                    <BadgeIndianRupee /> Premium
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    For power users
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4 text-4xl font-bold">5000 Credits</p>
                  <p className="mb-6 text-xl">+1000 extra credits</p>
                  <div className="mb-4 flex items-center justify-center text-green-500">
                    <span className="text-xl font-light">$30</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-green-500 text-white hover:bg-green-600"
                    disabled
                  >
                    Currently Unavailable
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default page;
