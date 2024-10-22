"use client";

import React, { useState } from "react";
import TemplateBuilder from "@/components/TemplateBuilder";
import { Button } from "@/components/ui/button";
import { useSaveTemplate } from "@/hooks/useSaveTemplate";
import PreviewModal from "@/components/sections/PreviewModal";
import TemplateSettings from "@/components/sections/TemplateSettings";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {};

const page = ({}: Props) => {
  const { saveTemplate, error, isLoading } = useSaveTemplate();
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const router = useRouter();

  const handleSaveTemplate = async () => {
    const savedTemplate = await saveTemplate();
    if (savedTemplate) {
      toast.success("Template created successfully");
      router.push(`/dashboard/templates`);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full px-28 flex flex-col justify-center items-center">
        <div className="w-full pb-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Build a new Template</h1>
            <p className="text-xs text-gray-500">
              Design your form by dragging and dropping elements from the left.
            </p>
            {error && (
              <div className="text-red-500 text-sm flex flex-col">
                {error.map((err, index) => (
                  <p className="text-xs font-medium" key={index}>
                    {err}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsPreviewModalOpen(true)}
              variant={"secondary"}
            >
              Preview
            </Button>
            <Button variant={"outline"}>
              <TemplateSettings />
            </Button>
            <Button onClick={handleSaveTemplate} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Template"}
            </Button>
          </div>
        </div>
        <TemplateBuilder />
      </div>
      <PreviewModal
        open={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
      ></PreviewModal>
    </>
  );
};

export default page;
