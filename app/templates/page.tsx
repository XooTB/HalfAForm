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
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Template Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of {templates.length} beautiful templates
            designed to kickstart your next project
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {templates.map((template: TemplateDisplay) => (
            <TemplateDisplayCard key={template.id} template={template} />
          ))}
        </div>

        {templates.length === 0 && (
          <div className="text-center text-gray-600 py-16">
            <h2 className="text-2xl font-semibold mb-4">No templates found</h2>
            <p className="text-lg">
              Check back later for new additions or try adjusting your search
              criteria.
            </p>
          </div>
        )}

        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why Choose Our Templates?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Professionally designed for various industries and purposes</li>
            <li>Fully customizable to match your brand identity</li>
            <li>Responsive layouts that work on all devices</li>
            <li>Regular updates and new additions to our collection</li>
            <li>24/7 customer support to assist you with any questions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
