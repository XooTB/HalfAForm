import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, TrashIcon } from "lucide-react";

type Props = {
  id: string;
  children: React.ReactNode;
  handle?: boolean;
  handleDelete?: (id: string) => void;
};

function SortableItem({ id, children, handle, handleDelete }: Props) {
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
      className="border border-gray-300 rounded-md p-2 hover:bg-gray-100"
    >
      <div className="flex justify-between border-b pb-2">
        {handle && (
          <GripVertical
            size={28}
            className="hover:bg-gray-300 rounded-md hover:text-white px-1 py-1"
            {...listeners}
          />
        )}
        {handleDelete && (
          <button onClick={() => handleDelete(id)} className="z-10">
            <TrashIcon
              size={28}
              className="hover:bg-red-500 rounded-md hover:text-white px-1 py-1"
            />
          </button>
        )}
      </div>
      <div className="w-full pt-2" {...listeners}>
        {children}
      </div>
    </div>
  );
}

export default SortableItem;
