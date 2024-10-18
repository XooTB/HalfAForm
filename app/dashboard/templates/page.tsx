"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useGetTemplates from "@/hooks/useGetTemplates";
import Link from "next/link";
import TemplateCard from "@/components/cards/TemplateCard";

const page = () => {
  const { templates, isLoading, error, fetchTemplates } = useGetTemplates();
  console.log(templates);

  useEffect(() => {
    fetchTemplates();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full px-20">
      <div className="w-full flex flex-col gap-5 py-5">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold">Templates</h1>
            <p className="text-xs text-gray-500">
              Browse, Modify or create new templates
            </p>
          </div>
          <Link href="/dashboard/templates/new">
            <Button>New Template</Button>
          </Link>
        </div>
        <div className="w-full min-h-32 flex justify-center items-center border rounded-md px-3 py-3">
          {templates.length === 0 ? (
            <p>No templates found</p>
          ) : (
            <div className="w-full grid grid-cols-3 gap-3">
              {templates.map((template, index) => (
                // @ts-ignore
                <TemplateCard key={index} template={template} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
