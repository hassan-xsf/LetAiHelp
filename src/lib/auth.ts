import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const findUser = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!findUser) return null;
        if (findUser.password) {
          const matchPass = await bcrypt.compare(
            credentials.password,
            findUser.password,
          );
          if (!matchPass) return null;
        }

        return {
          id: String(findUser.id),
          name: findUser.name,
          email: findUser.email,
          credits: findUser.credits,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ trigger, token, user, session }) {
      if (trigger === "update" && session?.credits) {
        token.credits = session.credits;
      }
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          credits: user.credits,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            name: token.name,
            credits: token.credits,
          },
        };
      }
      return session;
    },
  },
};
