import TemplateDisplayCard from "@/components/cards/TemplateDisplayCard";
import { TemplateDisplay } from "@/type/template";
import React from "react";

const Page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/templates`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch templates");
  }

  const templates: TemplateDisplay[] = await res.json();

  if (!templates || templates.length === 0) {
    return <div>No templates found</div>;
  }

  return (
    <div className="min-h-screen w-full px-20 py-10">
      <h1 className="text-2xl font-bold">
        {templates.length} Templates found!
      </h1>
      <div className="grid grid-cols-4 gap-4 pt-5">
        {templates.map((template: TemplateDisplay) => (
          // @ts-ignore
          <TemplateDisplayCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default Page;
