"use client";

import { Template } from "@/type/template";
import TextQuestion from "../blocks/TextQuestion";
import ParagraphQuestion from "../blocks/ParagraphQuestion";
import MultipleChoice from "../blocks/MultipleChoice";
import { ScrollArea } from "../ui/scroll-area";

interface FormViewProps {
  template: Template;
}

export default function FormView({ template }: FormViewProps) {
  const style = {
    backgroundImage: template.imageUrl
      ? `url(${template.imageUrl})`
      : "url('/form_assets/form_bg_1.jpg')",
  };

  return (
    <div className="w-full h-full">
      <ScrollArea className="h-[95%]">
        <div
          style={style}
          className="flex flex-col justify-end gap-2 bg-cover bg-center bg-no-repeat h-[200px] px-5 py-5"
        >
          <h1 className="text-2xl font-bold text-white">{template.name}</h1>
          <p className="text-sm text-gray-500">{template.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          {template.blocks &&
            template.blocks.map((block) => {
              switch (block.type) {
                case "short":
                  return <TextQuestion key={block.id} block={block} />;
                case "paragraph":
                  return <ParagraphQuestion key={block.id} block={block} />;
                case "multipleChoice":
                  return <MultipleChoice key={block.id} block={block} />;
              }
            })}
        </div>
      </ScrollArea>
    </div>
  );
}