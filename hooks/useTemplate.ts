"use client";

import { useState } from "react";
import { Template } from "@/type/template";
import { useSession } from "next-auth/react";

const useTemplate = () => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const getTemplate = async (templateId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/templates/${templateId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch template");
      }

      const data = await res.json();
      data.blocks = JSON.parse(data.blocks);

      setTemplate(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { template, isLoading, error, getTemplate };
};

export default useTemplate;
