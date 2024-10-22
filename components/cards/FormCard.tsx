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
      className="border px-3 py-2 rounded-md mb-3 hover:shadow-md transition-shadow duration-300 hover:cursor-pointer"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="text-base text-slate-900 dark:text-slate-100 font-semibold">
            {form.template.name}
          </p>
          <p className="text-xs text-slate-400 font-semibold">
            {form.createdAt &&
              new Date(form.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
          </p>
        </div>
        <p className="text-xs text-slate-400 font-semibold line-clamp-2 w-[90%]">
          {form.template.description}
        </p>
      </div>
      <div className="flex items-center gap-2 pt-2">
        <Badge
          variant="outline"
          className="hover:bg-slate-400 dark:hover:bg-slate-600 hover:text-white transition-shadow duration-300"
        >
          Tags
        </Badge>
        <Badge
          variant="outline"
          className="hover:bg-slate-400 dark:hover:bg-slate-600 hover:text-white transition-shadow duration-300"
        >
          Tags
        </Badge>
      </div>
    </div>
  );
};

export default FormCard;
