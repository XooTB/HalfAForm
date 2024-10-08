"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useTemplateBuilderStore } from "@/stores/TemplateBuilderStore";
import { z } from "zod";

type Props = {
  blockId?: string;
};

const choiceTypes = ["Checkbox", "Radio", "Dropdown"];

const schema = z.object({
  question: z.string().min(1, "Question is required"),
  description: z.string().optional(),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(1, "At least one option is required"),
  optionsType: z.enum(["checkbox", "radio", "dropdown"], {
    errorMap: () => ({ message: "Invalid option type selected" }),
  }),
});

const MultipleChoiceQuestionBlock = ({ blockId }: Props) => {
  const { updateBlock } = useTemplateBuilderStore();

  const [question, setQuestion] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [choiceType, setChoiceType] = useState<string>("");
  const [choices, setChoices] = useState<string[]>([""]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    if (!blockId) return;
    setErrors([]);

    const newValue = { [name]: e.target.value };

    if (name === "question") {
      validateAndUpdateBlock({
        ...newValue,
        options: choices,
        optionsType: choiceType,
      });
      setQuestion(e.target.value);
    } else {
      updateBlock(blockId, newValue);
      setDescription(e.target.value);
    }
  };

  const handleAddChoice = () => {
    if (!blockId) return;
    const updatedChoices = [...choices, ""];
    setChoices(updatedChoices);
    validateAndUpdateBlock({
      options: updatedChoices,
      optionsType: choiceType,
      question,
      description,
    });
  };

  const handleRemoveChoice = (index: number) => {
    if (!blockId) return;
    const updatedChoices = choices.filter((_, i) => i !== index);
    setChoices(updatedChoices);
    validateAndUpdateBlock({
      options: updatedChoices,
      optionsType: choiceType,
      question,
      description,
    });
  };

  const handleChangeChoice = (index: number, value: string) => {
    if (!blockId) return;
    const updatedChoices = choices.map((choice, i) =>
      i === index ? value : choice
    );
    setChoices(updatedChoices);
    validateAndUpdateBlock({
      options: updatedChoices,
      optionsType: choiceType,
      question,
      description,
    });
  };

  const handleChangeChoiceType = (value: string) => {
    if (!blockId) return;
    setChoiceType(value);
    validateAndUpdateBlock({
      options: choices,
      optionsType: value as "checkbox" | "radio" | "dropdown",
      question,
      description,
    });
  };

  const validateAndUpdateBlock = (data: any) => {
    if (!blockId) return;
    setErrors([]);

    try {
      schema.parse(data);
      updateBlock(blockId, data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.errors.map((error) => error.message));
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          name="question"
          placeholder="Question"
          onChange={(e) => handleChange(e, "question")}
        />
        <Select onValueChange={handleChangeChoiceType}>
          <SelectTrigger>
            <SelectValue placeholder="Select a choice type" />
          </SelectTrigger>
          <SelectContent>
            {choiceTypes.map((choice) => (
              <SelectItem key={choice} value={choice.toLowerCase()}>
                {choice}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        {choiceType && (
          <>
            {choices.map((choice, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Choice ${index + 1}`}
                  value={choice}
                  onChange={(e) => handleChangeChoice(index, e.target.value)}
                />
                <Button
                  onClick={() => handleRemoveChoice(index)}
                  className="hover:bg-red-500"
                >
                  <Trash />{" "}
                </Button>
              </div>
            ))}
            <Button onClick={handleAddChoice} className="">
              Add Choice
            </Button>
          </>
        )}
      </div>
      <Textarea
        placeholder="Description (Optional)"
        className="h-5"
        name="description"
        onChange={(e) => handleChange(e, "description")}
      />
      {errors.map((error, index) => (
        <p key={index} className="text-xs text-red-500">
          {error}
        </p>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestionBlock;
