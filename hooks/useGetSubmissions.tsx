"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Submission } from "@/type/form";

const useGetSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/forms/submissions`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch submissions");
      }

      const data = await res.json();

      setSubmissions(data);
    } catch (error) {
      setError("Failed to fetch submissions");
    } finally {
      setIsLoading(false);
    }
  };

  return { submissions, isLoading, error, fetchSubmissions };
};

export default useGetSubmissions;
