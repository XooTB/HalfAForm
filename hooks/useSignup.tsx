"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorMessage = await res.json();
        setError(errorMessage.error);
        return;
      }

      const data = await res.json();

      setSuccess(true);
      toast.success("Signup successful, please login");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to signup, please try again");
      setSuccess(false);
      setError("Failed to signup");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, success };
};

export default useSignup;
