"use client";

import { Form, FormWithTemplate } from "@/type/form";
import { useSession } from "next-auth/react";
import { useState } from "react";

const useGetForms = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forms, setForms] = useState<FormWithTemplate[]>([]);

  const getForms = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/forms/user`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch forms");
      }

      const data = await response.json();
      const parsedForms = data.map((form: Form) => {
        // @ts-ignore
        form.answers = JSON.parse(form.answers);
        return form;
      });

      setForms(parsedForms);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, getForms, forms };
};

export default useGetForms;
