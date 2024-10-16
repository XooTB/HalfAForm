import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

interface AddBlockButtonProps {
  onAddBlock: (type: string) => void;
}

const AddBlockButton: React.FC<AddBlockButtonProps> = ({ onAddBlock }) => {
  const [selectedBlockType, setSelectedBlockType] = React.useState<string>("");

  const handleAddBlock = (type: string) => {
    setSelectedBlockType(type);
    onAddBlock(type);
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <Select onValueChange={handleAddBlock}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Add new block" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="short">Short Answer</SelectItem>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value="multipleChoice">Multiple Choice</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        onClick={() => selectedBlockType && onAddBlock(selectedBlockType)}
        disabled={!selectedBlockType}
      >
        <PlusCircle className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AddBlockButton;
