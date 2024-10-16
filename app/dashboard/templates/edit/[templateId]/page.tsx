"use client";

import { useCallback, useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { Upload } from "lucide-react";

// Main component for editing a template
const Page = () => {
  const { templateId } = useParams();
  const { template, isLoading, error, getTemplate } = useTemplate();
  const [templateData, setTemplateData] = useState<Template | null>(null);
  const [selectedBlockType, setSelectedBlockType] = useState<string>("");

  const {
    isUploading,
    error: uploadError,
    uploadImage,
    img,
  } = useCloudinaryUpload();

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

  // Update local state when image is uploaded
  useEffect(() => {
    if (img) {
      // @ts-ignore
      setTemplateData((prev) => {
        if (!prev) return { image: img };
        return { ...prev, image: img };
      });
    }
  }, [img]);

  // Loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!template) return <div>No template found</div>;

  // Style object for background image
  const style = {
    backgroundImage: img
      ? `url(${img})`
      : template?.image
      ? `url(${template.image})`
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

  // Handler for reordering blocks within the template
  const handleBlocksReorder = (newBlocks: QuestionBlock[]) => {
    setTemplateData((prev) => {
      if (prev === null) return null;
      // Update the template data with the new block order
      return { ...prev, blocks: newBlocks };
    });
  };

  // Handler for deleting a block from the template
  const handleBlockDelete = (id: string) => {
    setTemplateData((prev) => {
      if (prev === null) return null;
      return {
        ...prev,
        // Filter out the block with the matching id
        blocks: prev.blocks.filter((block) => block.id !== id),
      };
    });
  };

  // Handler for adding a new block to the template
  const handleAddBlock = (type: string) => {
    setSelectedBlockType(type);
    setTemplateData((prev) => {
      if (prev === null) return null;
      const timestamp = Date.now();
      const newBlock: QuestionBlock = {
        id: `${type}_${timestamp}`,
        type: type as "short" | "paragraph" | "multipleChoice",
        question: "",
        required: false,
        options: type === "multipleChoice" ? [] : undefined,
      };
      return {
        ...prev,
        blocks: [...prev.blocks, newBlock],
      };
    });
  };

  // Handler for adding a new block to the template
  const handleAddButtonClick = () => {
    if (selectedBlockType) {
      handleAddBlock(selectedBlockType);
    }
  };

  // Handler for uploading a new image to the template
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
  };

  return (
    <div className="w-full min-h-[70vh] px-10 pb-10">
      {/* Template header with background image */}
      <div
        style={{
          ...style,
          position: "relative",
        }}
        className="w-full h-[32vh] flex flex-col justify-end py-5 px-5"
      >
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="absolute top-2 right-2 cursor-pointer"
        >
          <Button
            variant="secondary"
            size="sm"
            disabled={isUploading}
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Change Image"}
          </Button>
        </label>
        {uploadError && (
          <p className="text-red-500 text-sm mt-2">{uploadError}</p>
        )}
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

        {/* Add new block button with dropdown */}
        <div className="flex items-center gap-2 mt-4">
          <Select onValueChange={handleAddBlock}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Add new block" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short Answer</SelectItem>
              <SelectItem value="paragraph">Paragraph</SelectItem>
              <SelectItem value="multipleChoice">Multiple Choice</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddButtonClick}
            disabled={!selectedBlockType}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
