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

type Props = {
  blockId?: string;
};

const choiceTypes = ["Checkbox", "Radio", "Dropdown"];

const MultipleChoiceQuestionBlock = ({ blockId }: Props) => {
  const { updateBlock } = useTemplateBuilderStore();

  const [choiceType, setChoiceType] = useState<string>("");
  const [choices, setChoices] = useState<string[]>([""]);

  const handleChange = (e: any, name: string) => {
    if (!blockId) return;
    updateBlock(blockId, { [name]: e.target.value });
  };

  const handleAddChoice = () => {
    if (!blockId) return;
    setChoices([...choices, ""]);
    updateBlock(blockId, {
      options: [...choices, ""],
    });
  };

  const handleRemoveChoice = (index: number) => {
    if (!blockId) return;
    setChoices(choices.filter((_, i) => i !== index));
    updateBlock(blockId, {
      options: choices.filter((_, i) => i !== index),
    });
  };

  const handleChangeChoice = (index: number, value: string) => {
    if (!blockId) return;
    setChoices(choices.map((choice, i) => (i === index ? value : choice)));
    updateBlock(blockId, {
      options: choices.map((choice, i) => (i === index ? value : choice)),
    });
  };

  const handleChangeChoiceType = (value: string) => {
    if (!blockId) return;
    setChoiceType(value);
    updateBlock(blockId, {
      optionsType: value as "checkbox" | "radio" | "dropdown",
    });
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
              <SelectItem key={choice} value={choice}>
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
    </div>
  );
};

export default MultipleChoiceQuestionBlock;
