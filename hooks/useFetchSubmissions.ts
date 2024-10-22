"use client";
import { Form } from "@/type/form";
import { useState } from "react";
import { useSession } from "next-auth/react";

const useFetchSubmissions = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Form[]>([]);

  const fetchSubmissions = async (templateId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/forms/template/${templateId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch submissions");
      }

      const data = await response.json();

      setSubmissions(data);
    } catch (error) {
      setError("Failed to fetch submissions");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, fetchSubmissions, submissions };
};

export default useFetchSubmissions;
