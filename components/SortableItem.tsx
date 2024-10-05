import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
  children: React.ReactNode;
  handle?: boolean;
};

function SortableItem({ id, children, handle }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border border-gray-300 rounded-md p-2 hover:bg-gray-100"
    >
      {handle && (
        <span {...listeners} {...attributes} className="mr-2 cursor-move">
          ☰
        </span>
      )}
      {children}
    </div>
  );
}

export default SortableItem;
