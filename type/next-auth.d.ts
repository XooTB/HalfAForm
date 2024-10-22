import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: "regular" | "admin";
    status: "active" | "restricted";
    accessToken: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
    accessToken: string;
    expires: string;
    error: string;
  }
}
