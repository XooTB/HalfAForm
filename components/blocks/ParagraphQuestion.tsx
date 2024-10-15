import React from "react";
import { QuestionBlock } from "@/type/template";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

type Props = {
  block: QuestionBlock;
  editMode?: boolean;
  handleBlockChange?: (block: QuestionBlock) => void;
};

const ParagraphQuestion = ({
  block,
  editMode = false,
  handleBlockChange,
}: Props) => {
  return (
    <div className="border px-2 py-3 rounded-md">
      {editMode ? (
        <div className="flex flex-col gap-0">
          <Input
            className="text-xl font-bold capitalize border-0 shadow-none"
            defaultValue={block.question}
            placeholder="Enter question"
            onChange={(e) =>
              handleBlockChange &&
              handleBlockChange({ ...block, question: e.target.value })
            }
          />
          <Textarea
            className="text-xs text-gray-500 border-0 resize-none"
            defaultValue={block.description}
            placeholder="Enter description"
            onChange={(e) =>
              handleBlockChange &&
              handleBlockChange({ ...block, description: e.target.value })
            }
            rows={2}
          />
        </div>
      ) : (
        <>
          <h1 className="text-xl font-bold pb-3">{block.question}</h1>
          <p className="text-xs text-gray-500 pb-3">{block.description}</p>
        </>
      )}
      <Textarea className="h-24 text-base" disabled={editMode} />
    </div>
  );
};

export default ParagraphQuestion;
