import TemplateBuilder from "@/components/TemplateBuilder";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <TemplateBuilder />
    </div>
  );
};

export default page;
