import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface User {
    id: string;
    credits: number;
  }
  interface Session {
    user: User & {
      credits: number;
    };
    token: {
      credits: number;
    };
  }
}
