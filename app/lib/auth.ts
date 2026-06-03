import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) return null;
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isCorrectPassword) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      issuer: "https://www.linkedin.com",                                 //have to use this as nextauth v4 is depreceated
      userinfo: "https://api.linkedin.com/v2/userinfo",
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },                                     //needs to have NEXTAUTH_SECRET in .env
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {                 //runs everytime jwt is created or updated
      if (user) {
        token.id = user.id;                      //attach
        token.email = user.email;                //attach
      }
      return token;
    },
    async session({ session, token }) {          // runs everytime when client calls useSession() in frontend
      if (session.user) {
        (session.user as any).id = token.id;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
