"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Trash2, Upload } from "lucide-react";
import { QuestionBlock, Template } from "@/type/template";
import useTemplate from "@/hooks/useTemplate";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TextQuestionEdit } from "@/components/blocks/TextQuestionBlock";
import { ParagraphQuestionEdit } from "@/components/blocks/ParagraphQuestionBlock";
import MultiChoice from "@/components/blocks/MultiChoice";
import SortableContextWrapper from "@/components/dnd/SortableContext";
import AddBlockButton from "@/components/sections/AddBlockSection";
import StatusToggle from "@/components/StatusToggle";
import DeleteDialogue from "@/components/sections/DeleteDialogue";

// Main component for editing a template
const Page = () => {
  const { templateId } = useParams();
  const {
    template,
    isLoading,
    error,
    getTemplate,
    updateTemplate,
    deleteTemplate,
    validationErrors,
  } = useTemplate();
  const [templateData, setTemplateData] = useState<Template | null>(null);

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

  // Handler for uploading a new image to the template
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
  };

  const handleUpdateTemplate = () => {
    if (templateData) {
      updateTemplate(templateId as string, templateData);
    }
  };

  const handleStatusChange = (status: string) => {
    setTemplateData((prev) => {
      if (prev === null) return null;
      return { ...prev, status: status as "draft" | "published" | undefined };
    });
  };

  const handleDeleteTemplate = async () => {
    await deleteTemplate(templateId as string);
  };

  if (templateData)
    return (
      <>
        <div className="flex justify-between items-center w-full px-10 py-5">
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold">Edit Template</p>
            <div className="flex flex-col text-xs">
              {validationErrors.map((error, index) => (
                <p className="text-red-500" key={index}>
                  {error}
                </p>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <StatusToggle
              status={templateData.status}
              setStatus={handleStatusChange}
            />
            <Button onClick={handleUpdateTemplate}>Update Template</Button>
            <Button
              variant="outline"
              className="hover:bg-red-500 hover:text-white px-1"
              size="icon"
            >
              <DeleteDialogue
                trigger={<Trash2 />}
                onDelete={handleDeleteTemplate}
              />
            </Button>
          </div>
        </div>
        <div className="w-full min-h-[70vh] px-10 pb-10">
          {/* Template header with background image */}
          <div
            style={{
              ...style,
            }}
            className="w-full h-[32vh] flex flex-col justify-end py-5 px-5 relative"
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
                      <TextQuestionEdit
                        key={block.id}
                        block={block}
                        handleBlockChange={handleBlockChange}
                      />
                    );
                  case "paragraph":
                    return (
                      <ParagraphQuestionEdit
                        key={block.id}
                        block={block}
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
            <AddBlockButton onAddBlock={handleAddBlock} />
          </div>
        </div>
      </>
    );
};

export default Page;
