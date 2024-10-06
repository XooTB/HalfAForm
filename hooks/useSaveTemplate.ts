"use client";

import { useTemplateBuilderStore } from "@/stores/TemplateBuilderStore";
import { Template } from "@/types/template";
import { useSession } from "next-auth/react";

export const useSaveTemplate = () => {
  const { name, description, blocks } = useTemplateBuilderStore();
  const { data: session } = useSession();

  const saveTemplate = async () => {
    if (!session) return;

    const Blocks = blocks.map((block) => {
      //@ts-ignore
      const { content, icon, ...rest } = block;
      return rest;
    });

    const template: Template = {
      name,
      description,
      blocks: Blocks,
      author: session?.user?.name || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(template);
  };

  return { saveTemplate };
};
