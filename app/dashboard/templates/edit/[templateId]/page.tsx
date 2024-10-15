"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useTemplate from "@/hooks/useTemplate";
import Image from "next/image";
import { QuestionBlock, Template } from "@/type/template";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TextQuestion from "@/components/blocks/TextQuestion";
import ParagraphQuestion from "@/components/blocks/ParagraphQuestion";
import MultipleChoice from "@/components/blocks/MultipleChoice";
import MultiChoice from "@/components/blocks/MultiChoice";
import SortableContext from "@/components/dnd/SortableContext";
import SortableContextWrapper from "@/components/dnd/SortableContext";
import { arrayMove } from "@dnd-kit/sortable";

// Main component for editing a template
const page = () => {
  // Extract templateId from URL params
  const { templateId } = useParams();
  // Custom hook to fetch and manage template data
  const { template, isLoading, error, getTemplate } = useTemplate();
  // Local state to store and modify template data
  const [templateData, setTemplateData] = useState<Template | null>(null);

  console.log(templateData);

  // Fetch template data when component mounts or templateId changes
  useEffect(() => {
    getTemplate(templateId as string);
  }, [templateId]);

  // Update local state when template data is fetched
  useEffect(() => {
    if (template) {
      setTemplateData(template);
    }
  }, [template]);

  // Loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!template) return <div>No template found</div>;

  // Style object for background image
  const style = {
    backgroundImage: template?.imageUrl
      ? `url(${template.imageUrl})`
      : "url(/form_assets/form_bg_1.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  // Handler for input changes in template metadata
  const handleInputChange =
    (key: keyof Template) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTemplateData((prev) => {
        if (prev === null) return null;
        return { ...prev, [key]: e.target.value };
      });
    };

  // Handler for changes in individual question blocks
  const handleBlockChange = (block: QuestionBlock) => {
    setTemplateData((prev) => {
      if (prev === null) return null;
      return {
        ...prev,
        blocks: prev.blocks.map((b) => (b.id === block.id ? block : b)),
      };
    });
  };

  const handleBlocksReorder = (newBlocks: QuestionBlock[]) => {
    setTemplateData((prev) => {
      if (prev === null) return null;
      return { ...prev, blocks: newBlocks };
    });
  };

  const handleBlockDelete = (id: string) => {
    setTemplateData((prev) => {
      if (prev === null) return null;
      return {
        ...prev,
        blocks: prev.blocks.filter((block) => block.id !== id),
      };
    });
  };

  console.log(templateData);

  return (
    <div className="w-full min-h-[70vh] px-10">
      {/* Template header with background image */}
      <div
        style={style}
        className="w-full h-[32vh] flex flex-col justify-end py-5 px-5"
      >
        <div className="bg-black/60 w-full p-5 rounded-md h-[60%]">
          {/* Template name input */}
          <Input
            type="text"
            className={`text-white text-2xl font-bold bg-transparent w-full border-0
               focus-visible:border`}
            defaultValue={templateData?.name}
            onChange={handleInputChange("name")}
          />
          {/* Template description textarea */}
          <Textarea
            className={`text-white text-sm bg-transparent w-full border-0 resize-none
               focus-visible:border`}
            defaultValue={templateData?.description}
            onChange={handleInputChange("description")}
            rows={4}
          />
        </div>
      </div>
      {/* Question blocks */}
      <div className="flex flex-col gap-3 pl-8">
        <SortableContextWrapper
          blocks={templateData?.blocks || []}
          onBlocksReorder={handleBlocksReorder}
          onBlockDelete={handleBlockDelete}
        >
          {templateData?.blocks.map((block) => {
            switch (block.type) {
              case "short":
                return (
                  <TextQuestion
                    key={block.id}
                    block={block}
                    editMode={true}
                    handleBlockChange={handleBlockChange}
                  />
                );
              case "paragraph":
                return (
                  <ParagraphQuestion
                    key={block.id}
                    block={block}
                    editMode={true}
                    handleBlockChange={handleBlockChange}
                  />
                );
              case "multipleChoice":
                return (
                  <MultiChoice
                    key={block.id}
                    block={block}
                    editMode={true}
                    handleBlockChange={handleBlockChange}
                  />
                );
              default:
                return null;
            }
          })}
        </SortableContextWrapper>
      </div>
    </div>
  );
};

export default page;
