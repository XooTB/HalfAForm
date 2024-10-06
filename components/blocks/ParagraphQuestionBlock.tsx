import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useTemplateBuilderStore } from "@/stores/TemplateBuilderStore";
import { Switch } from "../ui/switch";

type Props = {
  blockId?: string;
};

const ParagraphQuestionBlock = ({ blockId }: Props) => {
  const { updateBlock, blocks } = useTemplateBuilderStore();

  const handleSwitchChange = (checked: boolean) => {
    if (!blockId) return;
    updateBlock(blockId, { required: checked });
  };

  const handleChange = (e: any, name: string) => {
    if (!blockId) return;
    updateBlock(blockId, { [name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Input
          name="question"
          placeholder="Question"
          onChange={(e) => handleChange(e, "question")}
        />
        <div className="flex flex-col items-center gap-2">
          <Switch
            name="required"
            onCheckedChange={handleSwitchChange}
            defaultChecked
          />
          <label className="text-[10px] text-muted-foreground">Required</label>
        </div>
      </div>
      <Textarea
        name="description"
        placeholder="Description (Optional)"
        onChange={(e) => handleChange(e, "description")}
      />
    </div>
  );
};

export default ParagraphQuestionBlock;
