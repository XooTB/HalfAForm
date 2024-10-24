import useLoginUser from "@/hooks/useLoginUser";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
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
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const response = await useLoginUser(
          credentials.email,
          credentials.password
        );

        if (response.user) {
          return {
            id: response.user.id,
            email: response.user.email,
            name: response.user.name,
            role: response.user.role,
            status: response.user.status,
            accessToken: response.token || "",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.status = user.status;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          role: token.role as "regular" | "admin",
          status: token.status as "active" | "restricted",
        },
        accessToken: token.accessToken as string,
      };
    },
  },
};

export default authOptions;
