"use client";

import { Template } from "@/type/template";
import { TextQuestionDisplay } from "../blocks/TextQuestionBlock";
import { ParagraphQuestionDisplay } from "../blocks/ParagraphQuestionBlock";
import { MultipleChoiceDisplay } from "../blocks/MultipleChoice";
import { ScrollArea } from "../ui/scroll-area";
import { Answer } from "@/type/form";

interface FormViewProps {
  template: Template;
  onAnswerChange: (answer: Answer) => void;
}

export default function FormView({ template, onAnswerChange }: FormViewProps) {
  const style = {
    backgroundImage: template.image
      ? `url(${template.image})`
      : "url('/form_assets/form_bg_1.jpg')",
  };

  const handleAnswerChange = (answer: Answer) => {
    onAnswerChange(answer);
  };

  return (
    <div className="w-full h-full">
      <ScrollArea className="h-[95%]">
        <div
          style={style}
          className="flex flex-col justify-end gap-2 bg-cover bg-center bg-no-repeat h-[300px] px-5 py-5 rounded-t-md"
        >
          <div className="flex flex-col gap-1 bg-black/50 p-3 rounded-md">
            <h1 className="text-3xl font-bold text-white pb-2">
              {template.name}
            </h1>
            <p className="text-xs text-white font-medium leading-4">
              {template.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {template.blocks &&
            template.blocks.map((block) => {
              switch (block.type) {
                case "short":
                  return (
                    <TextQuestionDisplay
                      key={block.id}
                      block={block}
                      onAnswerChange={handleAnswerChange}
                    />
                  );
                case "paragraph":
                  return (
                    <ParagraphQuestionDisplay
                      key={block.id}
                      block={block}
                      onAnswerChange={handleAnswerChange}
                    />
                  );
                case "multipleChoice":
                  return (
                    <MultipleChoiceDisplay
                      key={block.id}
                      block={block}
                      onAnswerChange={handleAnswerChange}
                    />
                  );
              }
            })}
        </div>
      </ScrollArea>
    </div>
  );
}
