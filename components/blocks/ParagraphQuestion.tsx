import React from "react";
import { QuestionBlock } from "@/type/template";
import { Textarea } from "../ui/textarea";

type Props = {
  block: QuestionBlock;
};

const ParagraphQuestion = ({ block }: Props) => {
  return (
    <div className="border px-2 py-3 rounded-md">
      <h1 className="text-xl font-bold pb-3">{block.question}</h1>
      <Textarea className="h-24 text-base" />
    </div>
  );
};

export default ParagraphQuestion;
