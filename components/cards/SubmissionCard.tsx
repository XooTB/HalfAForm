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
      className="border px-2 py-2 rounded-md mb-2 hover:shadow-md transition-shadow duration-300 hover:cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{submission.user.name}</p>
        <p className="text-sm text-muted-foreground">
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
