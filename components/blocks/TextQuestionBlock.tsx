import React from "react";
import { Input } from "@/components/ui/input";
import { useTemplateBuilderStore } from "@/stores/TemplateBuilderStore";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";

interface TextQuestionBlockProps {
  blockId?: string;
}

const TextQuestionBlock: React.FC<TextQuestionBlockProps> = ({
  blockId,
}: TextQuestionBlockProps) => {
  const { updateBlock, blocks } = useTemplateBuilderStore();

  const handleChange = (e: any, name: string) => {
    if (!blockId) return;
    updateBlock(blockId, { [name]: e.target.value });
  };

  const handleSwitchChange = (checked: boolean) => {
    if (!blockId) return;
    updateBlock(blockId, { required: checked });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Input
          name="question"
          type="text"
          placeholder="Enter your question"
          onChange={(e) => handleChange(e, "question")}
        />
        <div className="flex flex-col justify-center items-center gap-2">
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
        placeholder="Description (optional)"
        onChange={(e) => handleChange(e, "description")}
      />
    </div>
  );
};

export default TextQuestionBlock;
