import { FormWithTemplate } from "@/type/form";
import React from "react";
import { Badge } from "../ui/badge";

interface FormCardProps {
  form: FormWithTemplate;
  onClick: () => void;
}

const FormCard = ({ form, onClick }: FormCardProps) => {
  return (
    <div
      onClick={onClick}
      className="border px-3 py-2 rounded-md mb-3 hover:shadow-md transition-shadow duration-300 hover:cursor-pointer bg-card dark:bg-dark-card text-primary dark:text-dark-primary"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="text-base text-primary dark:text-dark-primary font-semibold">
            {form.template.name}
          </p>
          <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground font-semibold">
            {form.createdAt &&
              new Date(form.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
          </p>
        </div>
        <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground font-semibold line-clamp-2 w-[90%]">
          {form.template.description}
        </p>
      </div>
      <div className="flex items-center gap-2 pt-2">
        <Badge className="" variant="outline">
          Tags
        </Badge>
        <Badge className="" variant="outline">
          Tags
        </Badge>
      </div>
    </div>
  );
};

export default FormCard;
