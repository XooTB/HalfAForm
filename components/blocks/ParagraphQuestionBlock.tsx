"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { z } from "zod";
import { QuestionBlock } from "@/type/template";
import { useTemplateBuilderStore } from "@/stores/TemplateBuilderStore";

const schema = z.object({
  question: z.string().min(1, "Question is required"),
  description: z.string().optional(),
});

// ParagraphQuestionEdit component
interface ParagraphQuestionEditProps {
  block: QuestionBlock;
  handleBlockChange?: (block: QuestionBlock) => void;
}

const ParagraphQuestionEdit = ({
  block,
  handleBlockChange,
}: ParagraphQuestionEditProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    setError(null);
    const newValue = { ...block, [name]: e.target.value };
    handleBlockChange && handleBlockChange(newValue);

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

  const handleSwitchChange = (checked: boolean) => {
    const newValue = { ...block, required: checked };
    handleBlockChange && handleBlockChange(newValue);
  };

  return (
    <div className="border px-5 py-3 rounded-md">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <Input
            name="question"
            className="text-xl font-bold capitalize border-0 shadow-none"
            placeholder="Enter question"
            defaultValue={block.question}
            onChange={(e) => handleChange(e, "question")}
          />
          <div className="flex flex-col justify-center items-center gap-2">
            <Switch
              name="required"
              onCheckedChange={handleSwitchChange}
              defaultChecked={block.required}
            />
            <label className="text-[10px] text-muted-foreground">
              Required
            </label>
          </div>
        </div>
        <Textarea
          name="description"
          className="text-xs text-gray-500 border-0 resize-none"
          placeholder="Enter description"
          defaultValue={block.description}
          onChange={(e) => handleChange(e, "description")}
          rows={2}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
      <Textarea className="h-24 text-base mt-3" disabled />
    </div>
  );
};

// ParagraphQuestionDisplay component
interface ParagraphQuestionDisplayProps {
  block: QuestionBlock;
}

const ParagraphQuestionDisplay = ({ block }: ParagraphQuestionDisplayProps) => {
  return (
    <div className="border px-5 py-3 rounded-md">
      <h1 className="text-xl font-bold pb-3">{block.question}</h1>
      <p className="text-xs text-gray-500 pb-3">{block.description}</p>
      <Textarea className="h-24 text-base" disabled />
    </div>
  );
};

// ParagraphQuestionBlock component
interface ParagraphQuestionBlockProps {
  blockId?: string;
}

const ParagraphQuestionBlock = ({ blockId }: ParagraphQuestionBlockProps) => {
  const { updateBlock } = useTemplateBuilderStore();
  const [error, setError] = useState<string | null>(null);

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

  const handleSwitchChange = (checked: boolean) => {
    if (!blockId) return;
    updateBlock(blockId, { required: checked });
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

export {
  ParagraphQuestionEdit,
  ParagraphQuestionDisplay,
  ParagraphQuestionBlock,
};
