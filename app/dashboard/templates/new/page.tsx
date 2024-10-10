"use client";

import React from "react";
import TemplateBuilder from "@/components/TemplateBuilder";
import { Button } from "@/components/ui/button";
import { useSaveTemplate } from "@/hooks/useSaveTemplate";

type Props = {};

const page = ({}: Props) => {
  const { saveTemplate, error } = useSaveTemplate();

  return (
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
        <Button onClick={saveTemplate}>Save Template</Button>
      </div>
      <TemplateBuilder />
    </div>
  );
};

export default page;
