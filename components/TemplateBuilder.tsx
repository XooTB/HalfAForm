"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensors,
  useSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Draggable from "./Draggable";
import Droppable from "./Droppable";

type Props = {};

const TemplateBuilder = (props: Props) => {
  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const draggableItems = [
    { id: "draggable1", content: "Drag me 1" },
    { id: "draggable2", content: "Drag me 2" },
    { id: "draggable3", content: "Drag me 3" },
  ];

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (event.over && event.over.id === "droppable") {
      const draggedItemId = event.active.id as string;

      setDroppedItems((prevItems) => [...prevItems, draggedItemId]);
    }

    if (active.id !== over?.id) {
      setDroppedItems((prevItems) => {
        const oldIndex = prevItems.indexOf(active.id as string);
        const newIndex = prevItems.indexOf(over?.id as string);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }

    console.log(active, over);
  }

  return (
    <div className="w-1/2 min-h-screen flex justify-center pt-10 border px-14 gap-5">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex flex-col gap-2 mb-4 border border-gray-300 rounded-md p-2">
          {draggableItems.map((item) => (
            <Draggable key={item.id} id={item.id}>
              {item.content}
            </Draggable>
          ))}
        </div>
        <SortableContext
          items={droppedItems}
          strategy={verticalListSortingStrategy}
        >
          <Droppable id="droppable">
            <div className="flex flex-col gap-2 px-4 py-2">
              {droppedItems.length === 0
                ? "Drop here"
                : droppedItems.map((itemId, index) => {
                    const item = draggableItems.find((i) => i.id === itemId);
                    return (
                      item && (
                        <Draggable
                          key={`${item.id}-${index}`}
                          id={`${item.id}-${index}`}
                          handle
                        >
                          {item.content}
                        </Draggable>
                      )
                    );
                  })}
            </div>
          </Droppable>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TemplateBuilder;
