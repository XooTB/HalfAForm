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
      <ScrollArea className="h-[95%] sm:h-full">
        <div
          style={style}
          className="flex flex-col justify-end gap-2 bg-cover bg-center bg-no-repeat h-[200px] sm:h-[300px] px-3 sm:px-5 py-3 sm:py-5 rounded-t-md"
        >
          <div className="flex flex-col gap-1 bg-black/50 p-2 sm:p-3 rounded-md">
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary dark:text-primary pb-1 sm:pb-2">
              {template.name}
            </h1>
            <p className="text-xs sm:text-sm text-primary-foreground dark:text-primary font-medium leading-4 sm:leading-5">
              {template.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-3 sm:px-5 py-3 sm:py-5">
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
