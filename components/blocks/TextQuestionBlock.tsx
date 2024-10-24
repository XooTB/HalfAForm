"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { z } from "zod";
import { QuestionBlock } from "@/type/template";
import { useTemplateBuilderStore } from "@/stores/TemplateBuilderStore";
import { Answer } from "@/type/form";

const schema = z.object({
  question: z.string().min(1, "Question is required"),
  description: z.string().optional(),
});

// TextQuestionEdit component
interface TextQuestionEditProps {
  block: QuestionBlock;
  handleBlockChange?: (block: QuestionBlock) => void;
}

const TextQuestionEdit = ({
  block,
  handleBlockChange,
}: TextQuestionEditProps) => {
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
            type="text"
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
      <Input className="h-11 text-base mt-3" disabled />
    </div>
  );
};

// TextQuestionDisplay component
interface TextQuestionDisplayProps {
  block: QuestionBlock;
  onAnswerChange: (answer: Answer) => void;
}

const TextQuestionDisplay = ({
  block,
  onAnswerChange,
}: TextQuestionDisplayProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = {
      questionId: block.id,
      questionType: block.type,
      question: block.question,
      answer: e.target.value,
    };
    onAnswerChange(answer);
  };
  return (
    <div className="border px-5 py-3 rounded-md bg-card dark:bg-dark-card">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary dark:text-dark-primary">
          {block.question}
        </h1>
        <span className="text-xs text-red-500 font-medium">
          {block.required ? "Required" : ""}
        </span>
      </div>
      <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground pb-3">
        {block.description}
      </p>
      <Input
        className="h-11 text-base"
        onChange={handleChange}
        placeholder="Enter your answer"
      />
    </div>
  );
};

// TextQuestionBlock component
interface TextQuestionBlockProps {
  blockId?: string;
}

// TextQuestionBlock component for creating and editing a text question
const TextQuestionBlock = ({ blockId }: TextQuestionBlockProps) => {
  // Use the template builder store to update blocks
  const { updateBlock } = useTemplateBuilderStore();
  // State to hold validation errors
  const [error, setError] = useState<string | null>(null);

  // Handle changes to input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    if (!blockId) return;
    setError(null);

    const newValue = { [name]: e.target.value };
    updateBlock(blockId, newValue);

    // Validate the question field
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

  // Handle changes to the 'required' switch
  const handleSwitchChange = (checked: boolean) => {
    if (!blockId) return;
    updateBlock(blockId, { required: checked });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        {/* Question input field */}
        <Input
          name="question"
          type="text"
          placeholder="Enter your question"
          onChange={(e) => handleChange(e, "question")}
        />
        {/* Required switch */}
        <div className="flex flex-col justify-center items-center gap-2">
          <Switch
            name="required"
            onCheckedChange={handleSwitchChange}
            defaultChecked
          />
          <label className="text-[10px] text-muted-foreground">Required</label>
        </div>
      </div>
      {/* Description input field */}
      <Textarea
        name="description"
        placeholder="Description (optional)"
        onChange={(e) => handleChange(e, "description")}
      />
      {/* Display error message if validation fails */}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export { TextQuestionEdit, TextQuestionDisplay, TextQuestionBlock };
