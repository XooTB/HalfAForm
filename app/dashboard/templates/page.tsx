"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useGetTemplates from "@/hooks/useGetTemplates";
import Link from "next/link";
import TemplateCard from "@/components/cards/TemplateCard";

const page = () => {
  const { templates, isLoading, error, fetchTemplates } = useGetTemplates();

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
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20">
      <div className="w-full flex flex-col gap-5 py-5">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex flex-col justify-center mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Templates
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Browse, Modify or create new templates
            </p>
          </div>
          <Link href="/dashboard/templates/new">
            <Button className="w-full sm:w-auto">New Template</Button>
          </Link>
        </div>
        <div className="w-full min-h-32 flex justify-center items-center border rounded-md shadow-sm bg-white p-4 sm:p-6">
          {templates.length === 0 ? (
            <p className="text-gray-500 text-lg">No templates found</p>
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {templates?.map((template, index) => (
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
