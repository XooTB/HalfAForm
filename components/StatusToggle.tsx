"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface StatusToggleProps {
  status: string | undefined;
  setStatus: (status: string) => void;
}

const StatusToggle = ({ status, setStatus }: StatusToggleProps) => {
  return (
    <Select value={status} onValueChange={(value) => setStatus(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="draft">Draft</SelectItem>
        <SelectItem value="published">Published</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusToggle;
