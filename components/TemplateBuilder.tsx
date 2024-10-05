"use client";

import React, { act, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensors,
  useSensor,
  DragStartEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";
import Draggable from "./Draggable";

interface Item {
  id: string;
  content: string;
}

const TemplateBuilder = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const items: Item[] = [
    { id: "draggable1", content: "Drag me 1" },
    { id: "draggable2", content: "Drag me 2" },
    { id: "draggable3", content: "Drag me 3" },
  ];

  const [droppedItems, setDroppedItems] = useState<Item[]>([]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!droppedItems.some((item) => item.id === active.id)) {
      // If the Item is not in droppedItems, Then Add it.
      setDroppedItems((prevItems) => [
        ...prevItems,
        {
          ...items.find((item) => item.id === active.id)!,
          id: `dropped-${active.id}-${Date.now()}`,
        },
      ]);
    } else if (active.id !== over?.id) {
      // If the Item is already in droppedItems and order has changed, Change the order.
      setDroppedItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over?.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  }

  function handleDelete(id: string) {
    setDroppedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  return (
    <div className="w-2/3 min-h-screen flex justify-center pt-10 border px-14 gap-5 rounded-lg">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="border w-1/3 flex flex-col gap-2 px-2 py-3 rounded-lg">
          {items.map((item) => (
            <Draggable key={item.id} id={item.id}>
              {item.content}
            </Draggable>
          ))}
        </div>
        <div className="flex flex-col gap-2 mb-4 border border-gray-300 rounded-md p-2 w-2/3">
          <SortableContext
            items={droppedItems}
            strategy={verticalListSortingStrategy}
          >
            {droppedItems.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                handle
                handleDelete={handleDelete}
              >
                {item.content}
              </SortableItem>
            ))}
            {droppedItems.length === 0 && (
              <div className="text-gray-500 text-center">
                Drag items from the left to add them here.
              </div>
            )}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};

export default TemplateBuilder;
