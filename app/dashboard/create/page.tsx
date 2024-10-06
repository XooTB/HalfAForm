import TemplateBuilder from "@/components/TemplateBuilder";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full px-[17%] pb-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Build a new Template</h1>
          <p className="text-xs text-gray-500">
            Design your form by dragging and dropping elements from the left.
          </p>
        </div>
        <Button>Save Template</Button>
      </div>
      <TemplateBuilder />
    </div>
  );
};

export default page;
<h1>Design your form</h1>
