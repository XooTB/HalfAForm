"use client";

import { useTemplateBuilderStore } from "@/stores/TemplateBuilderStore";
import { Template } from "@/type/template";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { TemplateSchema } from "@/type/template";
import {
  createMessageBuilder,
  ErrorOptions,
  fromError,
} from "zod-validation-error";

const messageBuilder = createMessageBuilder({
  includePath: false,
  maxIssuesInMessage: 3,
});

export const useSaveTemplate = () => {
  const [error, setError] = useState<string[]>([]);

  const { name, description, blocks } = useTemplateBuilderStore();
  const { data: session } = useSession();

  const saveTemplate = async () => {
    if (!session) return;
    setError([]);

    try {
      const validation = TemplateSchema.safeParse({
        name,
        description,
        blocks,
      });

      if (!validation.success) {
        const errors = fromError(validation.error, { messageBuilder });
        setError(
          errors.message
            .split(/[:;]/)
            .slice(1)
            .map((err) => err.trim())
        );
        return;
      }

      const Blocks = blocks.map((block) => {
        // @ts-ignore
        const { content, icon, ...rest } = block;
        return rest;
      });

      const template: Template = {
        name,
        description,
        blocks: Blocks,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/templates/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify(template),
        }
      );

      const data = await response.json();
      data.blocks = JSON.parse(data.blocks);

      return data;
    } catch (err: any) {
      if (err instanceof Error) {
        setError((prev) => [...prev, err.message]);
      } else {
        setError((prev) => [...prev, "An unexpected error occurred"]);
      }
      return null;
    }
  };

  return { saveTemplate, error };
};
