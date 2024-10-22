import React from "react";
import { TemplateDisplay } from "@/type/template";
import { Badge } from "../ui/badge";

type Props = {
  template: TemplateDisplay;
  onClick: () => void;
};

const SerialCard = ({ template, onClick }: Props) => {
  return (
    <div
      className="border px-3 py-2 rounded-md mb-3 hover:shadow-md transition-shadow duration-300 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center pb-2">
        <p className="text-base text-slate-900 dark:text-slate-100 font-semibold">
          {template.name}
        </p>
        <Badge
          variant={template.status === "published" ? "outline" : "secondary"}
        >
          {template.status}
        </Badge>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
        {template.description}
      </p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {template._count.forms} submissions
        </p>
      </div>
    </div>
  );
};

export default SerialCard;
