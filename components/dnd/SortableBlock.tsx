"use client";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

type Props = {
  children: React.ReactNode;
  id: string;
  handle?: boolean;
};

export function SortableBlock({ children, id, handle = true }: Props) {
  // State to track if the mouse is hovering over the block
  const [isHovering, setIsHovering] = useState(false);

  // Use the useSortable hook to get drag-and-drop functionality
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // Create a style object for the draggable element
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative border border-gray-300 rounded-md p-2 hover:bg-gray-100"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Render the drag handle if 'handle' prop is true and mouse is hovering */}
      {handle && isHovering && (
        <div
          className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 hover:bg-gray-300 rounded-l-md hover:text-white px-1 py-3 cursor-grab"
          {...listeners}
        >
          <GripVertical size={28} />
        </div>
      )}
      {/* Render the child components */}
      <div className="w-full pt-2">{children}</div>
    </div>
  );
}
