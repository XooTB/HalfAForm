"use client";

import { useState } from "react";
import { Answer, FormCreate, FormCreateSchema } from "@/type/form";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

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
      setError("Please login first to submit a form!");
      toast.error("Please login first to submit a form!");
      setIsLoading(false);
      return;
    }

    const form: FormCreate = { templateId, answers };

    try {
      FormCreateSchema.parse(form);

      await submitForm(form);

      router.push(`/dashboard/forms`);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitForm = async (form: FormCreate) => {
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

    return await response.json();
  };

  const handleError = (error: unknown) => {
    if (error instanceof ZodError) {
      setError("Invalid form data");
    } else if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("An unknown error occurred");
    }
  };

  return { isLoading, error, createForm };
};

export default useForm;
