import React, { useState } from "react";

import { QuestionBlock } from "@/type/template";
import { Checkbox } from "../ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Answer } from "@/type/form";

interface CheckBoxItemProps {
  option: string;
  handleCheck?: (option: string) => void;
}

interface MultipleChoiceDisplayProps {
  block: QuestionBlock;
  onAnswerChange: (answer: Answer) => void;
}

const CheckBoxItem = ({ option, handleCheck }: CheckBoxItemProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox onCheckedChange={() => handleCheck?.(option)} />
      <Label className="text-base">{option}</Label>
    </div>
  );
};

const MultipleChoiceDisplay = ({
  block,
  onAnswerChange,
}: MultipleChoiceDisplayProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleOptionChange = (option: string) => {
    onAnswerChange({
      questionId: block.id,
      questionType: block.type,
      question: block.question,
      answer: option,
    });
  };

  const handleCheck = (option: string) => {
    const currentCheckedItems = checkedItems.includes(option)
      ? checkedItems.filter((item) => item !== option)
      : [...checkedItems, option];

    setCheckedItems(currentCheckedItems);
    onAnswerChange({
      questionId: block.id,
      questionType: block.type,
      question: block.question,
      answer: currentCheckedItems,
    });
  };

  return (
    <div className="border px-5 py-3 rounded-md bg-card dark:bg-dark-card">
      <div className="flex flex-col gap-1 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold capitalize text-primary dark:text-dark-primary">
            {block.question}
          </h2>
          <span className="text-xs text-red-500 font-medium">
            {block.required ? "Required" : ""}
          </span>
        </div>
        <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">
          {block.description}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        {block.optionsType === "checkbox" ? (
          <>
            {block.options?.map((option) => (
              <CheckBoxItem
                key={option}
                option={option}
                handleCheck={handleCheck}
              />
            ))}
          </>
        ) : null}
        {block.optionsType === "radio" ? (
          <>
            <RadioGroup onValueChange={handleOptionChange}>
              {block.options?.map((option) => (
                <div className="flex gap-2 items-center" key={option}>
                  <RadioGroupItem key={option} value={option} id={option} />
                  <Label htmlFor={option} className="text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </>
        ) : null}
        {block.optionsType === "dropdown" ? (
          <Select onValueChange={handleOptionChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {block.options?.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="capitalize hover:cursor-pointer"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}
      </div>
    </div>
  );
};

export { MultipleChoiceDisplay };
