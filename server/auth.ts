import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../lib/prisma.server"; 
import authConfig from "../auth";

export const { auth, handlers, signIn, signOut  } = NextAuth({
  session: {
    strategy: "jwt",
  },

  adapter: PrismaAdapter(prisma),
  ...authConfig,
});
