"use client";

import { QuestionBlock } from "@/type/template";
import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

type Props = {
  block: QuestionBlock;
  editMode?: boolean;
  handleBlockChange?: (block: QuestionBlock) => void;
};

const MultiChoice = ({ block, editMode = false, handleBlockChange }: Props) => {
  // Function to delete an option from the list
  const handleDeleteOption = (index: number) => {
    if (handleBlockChange && block.options) {
      const updatedOptions = [...block.options];
      updatedOptions.splice(index, 1);
      handleBlockChange({
        ...block,
        options: updatedOptions,
      });
    }
  };

  // Function to add a new empty option to the list
  const handleAddOption = () => {
    handleBlockChange &&
      handleBlockChange({
        ...block,
        options: [...(block.options || []), ""],
      });
  };

  // Render the edit mode view if editMode is true and handleBlockChange is provided
  if (editMode && handleBlockChange) {
    return (
      <div className="flex flex-col border p-2 gap-2 rounded-lg">
        {/* Input for the question */}
        <Input
          defaultValue={block.question}
          onChange={(e) =>
            handleBlockChange({ ...block, question: e.target.value })
          }
          className="border-0 shadow-none text-xl font-bold capitalize"
        />
        {/* Textarea for the description */}
        <Textarea
          defaultValue={block.description}
          onChange={(e) =>
            handleBlockChange({ ...block, description: e.target.value })
          }
          className="border-0 shadow-none text-xs text-gray-500 resize-none"
          rows={2}
        />
        <div>
          {/* Option type selector and required switch */}
          <div className="flex gap-2 w-full justify-between items-center border rounded-md px-2 py-1">
            <p className="text-base font-semibold w-fit">Option Type: </p>
            <Select
              defaultValue={block.optionsType}
              onValueChange={(value) =>
                handleBlockChange({
                  ...block,
                  optionsType: value as "checkbox" | "radio" | "dropdown",
                })
              }
            >
              <SelectTrigger className="w-[60%]">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="w-[60%]">
                <SelectItem value="dropdown">Dropdown</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="radio">Radio</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 items-center">
              <Switch
                checked={block.required}
                onCheckedChange={(checked) =>
                  handleBlockChange({ ...block, required: checked })
                }
              />
              <p className="text-sm font-semibold">Required</p>
            </div>
          </div>
        </div>
        {/* Options list */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Options</p>
          {block.options?.map((option, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={option}
                onChange={(e) =>
                  handleBlockChange({
                    ...block,
                    options: block.options?.map((opt, i) =>
                      i === index ? e.target.value : opt
                    ),
                  })
                }
              />
              <Button
                onClick={() => handleDeleteOption(index)}
                variant={"destructive"}
              >
                <Trash2 />{" "}
              </Button>
            </div>
          ))}
          {/* Button to add a new option */}
          <Button onClick={() => handleAddOption()}>Add Option</Button>
        </div>
      </div>
    );
  }

  // If not in edit mode, return null (no rendering)
  return null;
};

export default MultiChoice;
