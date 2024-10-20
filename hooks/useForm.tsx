"use client";

import { useState } from "react";
import { Answer, FormCreate, FormCreateSchema } from "@/type/form";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { useSession } from "next-auth/react";

interface UseForm {
  templateId: string;
}

const useForm = ({ templateId }: UseForm) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const createForm = async (answers: Answer[]) => {
    setIsLoading(true);
    setError(null);

    if (!session?.accessToken) {
      setError("Please login to create a form");
      setIsLoading(false);
      return;
    }

    const form: FormCreate = {
      templateId,
      answers,
    };

    try {
      FormCreateSchema.parse(form);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/forms/new`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create form");
      }

      const data = await response.json();

      router.push(`/dashboard/forms`);
    } catch (error: any | ZodError) {
      if (error instanceof ZodError) {
        setError("Please fill in all required fields");
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, createForm };
};

export default useForm;
