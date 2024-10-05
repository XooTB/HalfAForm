import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  children: React.ReactNode;
  id: string;
  handle?: boolean;
};

function Draggable({ children, id, handle }: Props & { showHandle?: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center border px-2 py-1 rounded-md"
    >
      {handle && (
        <span {...listeners} {...attributes} className="mr-2 cursor-move">
          ☰
        </span>
      )}
      <div
        className={handle ? "" : "flex-grow"}
        {...(handle ? {} : { ...listeners, ...attributes })}
      >
        {children}
      </div>
    </div>
  );
}

export default Draggable;
