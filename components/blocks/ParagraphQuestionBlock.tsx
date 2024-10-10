"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useTemplateBuilderStore } from "@/stores/TemplateBuilderStore";
import { Switch } from "../ui/switch";
import { z } from "zod";

type Props = {
  blockId?: string;
};

const schema = z.object({
  question: z.string().min(1, "Question is required"),
  description: z.string().optional(),
});

const ParagraphQuestionBlock = ({ blockId }: Props) => {
  const { updateBlock } = useTemplateBuilderStore();
  const [error, setError] = useState<string | null>(null);

  const handleSwitchChange = (checked: boolean) => {
    if (!blockId) return;
    updateBlock(blockId, { required: checked });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    if (!blockId) return;
    setError(null);

    const newValue = { [name]: e.target.value };
    updateBlock(blockId, newValue);

    if (name === "question") {
      try {
        schema.parse({ question: e.target.value });
      } catch (error) {
        if (error instanceof z.ZodError) {
          setError(error.errors[0].message);
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Input
          name="question"
          placeholder="Question"
          onChange={(e) => handleChange(e, "question")}
        />
        <div className="flex flex-col items-center gap-2">
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
        placeholder="Description (Optional)"
        onChange={(e) => handleChange(e, "description")}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default ParagraphQuestionBlock;
