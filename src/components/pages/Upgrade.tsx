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

const page = () => {
  const [redeemCode, setRedeemCode] = useState("");
  const [showConfetti, setshowConfetti] = useState(false);

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
      <div className="flex flex-col py-32 bg-gray-50 dark:bg-zinc-900 rounded-md">
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
        <main className="flex-1">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center space-x-4">
                <div className="rounded-full p-3 text-white bg-green-500 dark:text-white">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Purchase Credits</h1>
                  <p className="text-sm text-gray-600  dark:text-gray-400">
                    Select the number of credits you want to purchase
                  </p>
                </div>
              </div>
            </div>

            {/* Redeem Code Section */}
            <Card className="mb-12 bg-white dark:bg-zinc-900 border-green-400 border">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-500 flex items-center">
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
                    onClick={handleRedeem}
                    disabled={redeemUpgradeCode.isPending}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Redeem
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Basic Plan */}
              <Card className="bg-white dark:bg-zinc-900 border-green-500 hover:border-green-400 transition-all duration-300 transform hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-green-500 flex items-center gap-2">
                    <Star /> Basic
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Perfect for getting started
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-4xl font-bold mb-4">1000 Credits</p>
                  <p className="text-xl mb-6">+100 extra credits</p>
                  <div className="flex items-center justify-center text-green-500 mb-4">
                    <span className="text-xl font-light">$5</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    disabled
                  >
                    Currently Unavailable
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Plan (Larger) */}
              <Card className="bg-white dark:bg-zinc-900 border-green-500 scale-110 hover:border-green-400 transition-all duration-300 transform md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-green-500 flex items-center gap-2">
                    <BadgeDollarSignIcon className="size-8" /> Pro
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Most popular choice
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center flex-grow flex flex-col justify-center">
                  <p className="text-6xl font-bold mb-6 text-green-500">
                    2000 Credits
                  </p>
                  <p className="text-2xl mb-8">+600 extra credits</p>
                  <div className="flex items-center justify-center text-green-500 mb-6">
                    <span className="text-2xl font-light">$10</span>
                  </div>
                  <div className="bg-green-500 text-white rounded-full py-2 px-4 inline-block mx-auto">
                    <Zap className="inline mr-2" />
                    <span className="font-bold">Most Value</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6"
                    disabled
                  >
                    Currently Unavailable
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className="bg-white dark:bg-zinc-900 border-green-500 hover:border-green-400 transition-all duration-300 transform hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-green-500 flex items-center gap-2">
                    <BadgeIndianRupee /> Premium
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    For power users
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-4xl font-bold mb-4">5000 Credits</p>
                  <p className="text-xl mb-6">+1000 extra credits</p>
                  <div className="flex items-center justify-center text-green-500 mb-4">
                    <span className="text-xl font-light">$30</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
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
