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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Zap, Gift, Star, Crown, DollarSign } from "lucide-react";
import Confetti from "react-confetti";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { upgradeService } from "@/services/upgrade";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import useWindowSize from "@/hooks/useWindowSize";

const Upgrade = () => {
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
      <div className="flex flex-col rounded-md py-6 tracking-tighter transition-colors">
        <main className="flex-1">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-green-500 p-3 text-white dark:text-white">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold md:text-3xl">
                    Purchase Credits
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Select the number of credits you want to purchase
                  </p>
                </div>
              </div>
            </div>

            {/* Redeem Code Section */}
            <Card className="mb-12 border border-primary/20 bg-white dark:bg-zinc-950">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-black dark:text-white sm:text-2xl">
                  <Gift className="mr-2 text-green-400" />
                  Redeem Credits
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Enter your code to redeem additional credits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row">
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

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="tracking relative overflow-hidden hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Basic
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Perfect for getting started
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-green-400">
                      1000 Credits
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      +100 extra credits
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-primary">$5</p>
                    <Button className="w-full" variant="outline" disabled>
                      Currently Unavailable
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden transition-colors hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Pro
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      Most popular choice
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Most popular choice
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-5xl font-bold text-green-400">
                      2000 Credits
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      +600 extra credits
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-primary">$10</p>
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary"
                      >
                        <Zap className="mr-1 h-3 w-3" />
                        Most Value
                      </Badge>
                    </div>
                    <Button className="w-full" disabled>
                      Currently Unavailable
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden transition-colors hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-primary" />
                    Premium
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    For power users
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-bold text-green-400">
                      5000 Credits
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      +1000 extra credits
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-primary">$30</p>
                    <Button className="w-full" variant="outline" disabled>
                      Currently Unavailable
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default Upgrade;
