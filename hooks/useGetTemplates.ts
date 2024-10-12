"use client";

import { useState } from "react";
import { Template } from "@/type/template";
import { useSession } from "next-auth/react";

const useGetTemplates = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/templates/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      const data = await res.json();

      setTemplates(data);
    } catch (error) {
      setError("Failed to fetch templates");
    } finally {
      setIsLoading(false);
    }
  };

  return { templates, isLoading, error, fetchTemplates };
};

export default useGetTemplates;
