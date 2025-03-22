import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { API_URL } from "./constant";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const loginSchema = z.object({
            email: z.string().email(),
            password: z.string(),
          });

          const validatedCredentials = loginSchema.parse(credentials);

          const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedCredentials),
          });

          const data = await response.json();

          if (!response.ok || !data.success) {
            throw new Error(data.message || "Authentication failed");
          }

          // Return user data to be stored in the JWT
          const userData = {
            id: data.data.user.id.toString(),
            name: data.data.user.name,
            email: data.data.user.email,
            role: data.data.user.role,
            token: data.data.token,
          };

          return userData;
        } catch (error) {
          console.log("🚀 ~ authorize ~ error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.token = token.token as string;
      }
      return session;
    },
  },
};
