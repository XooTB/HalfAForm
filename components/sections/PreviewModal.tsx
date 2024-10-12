"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import FormView from "./FormView";
import { useTemplateBuilderStore } from "@/stores/TemplateBuilderStore";

type Props = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const PreviewModal = ({ open, onClose, children }: Props) => {
  const [isOpen, setIsOpen] = useState(open);
  const { getTemplate } = useTemplateBuilderStore();

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-30 py-5">
      <div className="bg-white w-[80%] h-full px-10 py-5 rounded-lg">
        <div className="flex justify-between items-center border-b pb-5">
          <h1 className="text-2xl font-bold">Form Preview</h1>
          <X
            onClick={onClose}
            size={28}
            className="cursor-pointer hover:bg-gray-200 p-1 rounded-md"
          />
        </div>
        <FormView template={getTemplate()} />
      </div>
    </div>
  );
};

export default PreviewModal;
