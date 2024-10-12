import React from "react";

import { QuestionBlock } from "@/type/template";
import { Input } from "../ui/input";

type Props = {
  block: QuestionBlock;
};

const TextQuestion = ({ block }: Props) => {
  return (
    <div className="border px-5 py-3 rounded-md">
      <h1 className="text-xl font-bold capitalize">{block.question}</h1>
      <p className="text-xs text-gray-500 pb-3">{block.description}</p>
      <Input className="h-11 text-base" />
    </div>
  );
};

export default TextQuestion;
