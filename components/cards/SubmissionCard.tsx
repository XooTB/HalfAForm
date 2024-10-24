import { Form } from "@/type/form";
import React from "react";

type Props = {
  submission: Form;
  onClick: () => void;
};

const SubmissionCard = ({ submission, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`mb-2 rounded-md border bg-muted 
        px-2 py-2 hover:cursor-pointer hover:shadow-md 
        dark:bg-dark-muted transition-shadow duration-300`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{submission.user.name}</p>
        <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">
          {submission.updatedAt &&
            new Date(submission.updatedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
        </p>
      </div>
    </div>
  );
};

export default SubmissionCard;
