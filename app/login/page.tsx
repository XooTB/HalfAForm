"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";

type Props = {};

const page = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full pt-40">
      <div className="p-8 dark:border border border-gray-200 dark:border-gray-700 rounded-lg shadow-md w-1/3">
        <div className="flex flex-col items-start mb-6">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <p className="text-sm text-gray-500">
            Login to your account to continue
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 dark:bg-blue-800"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-gray-500 mt-3 text-center">Or</p>
        <div className="flex justify-between gap-2 mt-4">
          <Button className="w-1/2 gap-3">
            <SiGithub size={22} /> Sign In with Github
          </Button>
          <Button className="w-1/2 gap-3">
            <SiGoogle size={22} /> Sign In with Google
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-7">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
