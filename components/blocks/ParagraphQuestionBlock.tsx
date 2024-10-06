import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type Props = {};

const ParagraphQuestionBlock = ({}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Input placeholder="Question" />
      <Textarea placeholder="Description (Optional)" className="h-5" />
    </div>
  );
};

export default ParagraphQuestionBlock;
