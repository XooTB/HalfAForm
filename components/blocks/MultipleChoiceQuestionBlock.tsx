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

type Props = {};

const choiceTypes = ["Checkbox", "Radio", "Dropdown"];

const MultipleChoiceQuestionBlock = ({}: Props) => {
  const [choiceType, setChoiceType] = useState<string>("");
  const [choices, setChoices] = useState<string[]>([""]);
  const [description, setDescription] = useState<string>("");

  const handleAddChoice = () => {
    setChoices([...choices, ""]);
  };

  const handleRemoveChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleChangeChoice = (index: number, value: string) => {
    setChoices(choices.map((choice, i) => (i === index ? value : choice)));
  };

  const handleChangeChoiceType = (value: string) => {
    setChoiceType(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input placeholder="Question" />
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
};

export default MultipleChoiceQuestionBlock;
