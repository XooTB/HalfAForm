import React from "react";

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

type Props = {
  block: QuestionBlock;
};

const CheckBoxItem = ({ option }: { option: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <Checkbox />
      <label className="capitalize">{option}</label>
    </div>
  );
};

const MultipleChoice = ({ block }: Props) => {
  return (
    <div className="border px-5 py-3 rounded-md">
      <h1 className="text-xl font-bold pb-2 capitalize">{block.question}</h1>
      <p className="text-xs text-gray-500">{block.description}</p>
      <div className="py-4 px-3">
        {block.optionsType === "checkbox" ? (
          <>
            <div className="flex flex-col gap-1">
              {block.options?.map((option) => (
                <CheckBoxItem key={option} option={option} />
              ))}
            </div>
          </>
        ) : null}
        {block.optionsType === "radio" ? (
          <>
            <RadioGroup defaultValue={block.options?.[0]}>
              {block.options?.map((option) => (
                <div className="flex gap-2 items-center">
                  <RadioGroupItem key={option} value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </>
        ) : null}
        {block.optionsType === "dropdown" ? (
          <Select>
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

export default MultipleChoice;
