import useLoginUser from "@/hooks/useLoginUser";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
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
            token: response.token,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.id && typeof token.id === "string") {
        console.log(token);
      }
      return session;
    },
  },
};

export default authOptions;
