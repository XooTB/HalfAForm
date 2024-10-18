"use client";

import { useState } from "react";
import { Template, TemplateSchema } from "@/type/template";
import { useSession } from "next-auth/react";
import { ZodError } from "zod";
import {
  createMessageBuilder,
  ErrorOptions,
  fromError,
} from "zod-validation-error";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const messageBuilder = createMessageBuilder({
  includePath: false,
  maxIssuesInMessage: 3,
});

const useTemplate = () => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

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
        const error = await res.json();
        throw new Error(error.error);
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

  const validateTemplate = (template: Template): boolean => {
    try {
      const validation = TemplateSchema.safeParse(template);
      if (!validation.success) {
        const errors = fromError(validation.error, { messageBuilder });
        setValidationErrors(
          errors.message
            .split(/[:;]/)
            .slice(1)
            .map((err) => err.trim())
        );
        return false;
      }
      return true;
    } catch (error: any) {
      if (error instanceof ZodError) {
        setValidationErrors(error.errors.map((err) => err.message));
      }
      return false;
    }
  };

  const updateTemplate = async (templateId: string, template: Template) => {
    setIsLoading(true);
    setValidationErrors([]);
    setError(null);

    try {
      const isValid = validateTemplate(template);

      if (!isValid) {
        return;
      }

      const { version, createdAt, updatedAt, author, ...rest } = template;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/templates/update/${templateId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(rest),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
      }

      const data = await res.json();
      data.blocks = JSON.parse(data.blocks);

      setTemplate(data);
      console.log("Template updated successfully:", data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTemplate = async (templateId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/templates/${templateId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
      }

      setTemplate(null);
      toast.success("Template successfully deleted!");
      router.push("/dashboard/templates");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    template,
    isLoading,
    error,
    validationErrors,
    getTemplate,
    updateTemplate,
    deleteTemplate,
  };
};

export default useTemplate;
