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
      className="border px-3 py-2 rounded-md mb-3 hover:shadow-md transition-shadow duration-300 hover:cursor-pointer bg-muted"
      onClick={onClick}
    >
      <div className="flex justify-between items-center pb-2">
        <p className="text-base text-primary dark:text-dark-primary font-semibold">
          {template.name}
        </p>
        <Badge
          variant={template.status === "published" ? "outline" : "secondary"}
          className="bg-primary dark:bg-dark-primary text-primary-foreground dark:text-dark-primary-foreground"
        >
          {template.status}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground line-clamp-2">
        {template.description}
      </p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-primary dark:text-dark-primary">
          {template._count.forms} submissions
        </p>
      </div>
    </div>
  );
};

export default SerialCard;
