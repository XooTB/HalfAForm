"use client";

import { Input } from "@/components/ui/input";

import React, { useState } from "react";
import { Textarea } from "../ui/textarea";

type Props = {
  title: string;
  description?: string;
};

const TextQuestionBlock = ({}: Props) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Question"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Description (Optional)"
        onChange={(e) => setDescription(e.target.value)}
        className="h-10"
      />
    </div>
  );
};

export default TextQuestionBlock;
