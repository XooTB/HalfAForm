"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useSignup from "@/hooks/useSignup";

type Props = {};

const page = ({}: Props) => {
  const { data: session } = useSession();
  const { signup, isLoading, error, success } = useSignup();
  const [matchError, setMatchError] = useState<string | null>(null);

  if (session) {
    return redirect("/dashboard");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      setMatchError("Passwords do not match");
      return;
    }

    await signup(
      data.name as string,
      data.email as string,
      data.password as string
    );
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="border rounded-md w-1/3 flex flex-col gap-4 mt-40 px-8 py-7">
        <div className="pb-3">
          <h1 className="text-3xl font-bold">Signup</h1>
          <p className="text-sm text-gray-500 pt-1">Signup with your email</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-md w-full flex flex-col gap-2"
        >
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            type="text"
            placeholder="Full Name"
            name="name"
            className="h-11"
            required
          />
          <label htmlFor="email" className="text-sm font-medium pt-2">
            Email
          </label>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            className="h-11"
            required
          />
          <label htmlFor="password" className="text-sm font-medium pt-2">
            Password
          </label>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            className="h-11"
            required
          />
          <label htmlFor="confirmPassword" className="text-sm font-medium pt-2">
            Confirm Password
          </label>
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="h-11"
            required
          />
          {matchError && <p className="text-red-500 text-xs">{matchError}</p>}
          <Button type="submit" className="mt-4" variant="default">
            Register
          </Button>
        </form>
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-sm text-gray-500">or with</p>
          <div className="flex gap-5 text-sm w-full justify-center">
            <Button className="w-1/2">Google</Button>
            <Button className="w-1/2">Github</Button>
          </div>
        </div>
        <p className="text-sm text-gray-500 pt-5">
          Already have an account?{" "}
          <Link href="/login" className="font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
