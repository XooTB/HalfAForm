"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useTemplateBuilderStore } from "@/stores/TemplateBuilderStore";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { z } from "zod";

interface TextQuestionBlockProps {
  blockId?: string;
}

const schema = z.object({
  question: z.string().min(1, "Question is required"),
  description: z.string().optional(),
});

const TextQuestionBlock: React.FC<TextQuestionBlockProps> = ({
  blockId,
}: TextQuestionBlockProps) => {
  const { updateBlock, blocks } = useTemplateBuilderStore();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    if (!blockId) return;
    setError(null);

    const newValue = { [name]: e.target.value };

    if (name === "question") {
      try {
        schema.parse(newValue);
        updateBlock(blockId, newValue);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setError(error.errors[0].message);
        }
      }
    } else {
      updateBlock(blockId, newValue);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    if (!blockId) return;
    updateBlock(blockId, { required: checked });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Input
          name="question"
          type="text"
          placeholder="Enter your question"
          onChange={(e) => handleChange(e, "question")}
        />
        <div className="flex flex-col justify-center items-center gap-2">
          <Switch
            name="required"
            onCheckedChange={handleSwitchChange}
            defaultChecked
          />
          <label className="text-[10px] text-muted-foreground">Required</label>
        </div>
      </div>
      <Textarea
        name="description"
        placeholder="Description (optional)"
        onChange={(e) => handleChange(e, "description")}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default TextQuestionBlock;
