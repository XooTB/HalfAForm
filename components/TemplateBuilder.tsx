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

import SortableItem from "./SortableItem";
import Draggable from "./Draggable";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageSquareText, Text, Circle } from "lucide-react";

import TextQuestionBlock from "./blocks/TextQuestionBlock";
import ParagraphQuestionBlock from "./blocks/ParagraphQuestionBlock";
import MultipleChoiceQuestionBlock from "./blocks/MultipleChoiceQuestionBlock";

interface Item {
  id: string;
  name: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const items: Item[] = [
  {
    id: "short",
    name: "Short Answer",
    icon: <Text />,
    content: <TextQuestionBlock title="" />,
  },
  {
    id: "paragraph",
    name: "Paragraph",
    icon: <MessageSquareText />,
    content: <ParagraphQuestionBlock />,
  },
  {
    id: "multipleChoice",
    name: "Multiple Choice",
    icon: <Circle />,
    content: <MultipleChoiceQuestionBlock />,
  },
];

const TemplateBuilder = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [droppedItems, setDroppedItems] = useState<Item[]>([]);
  console.log(droppedItems);

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
    <div className="w-full px-[17%] flex flex-col gap-5 py-5">
      <div className="flex flex-col gap-2">
        <Input placeholder="Template Name" className="h-14 text-lg" />
        <Textarea placeholder="Template Description" className="h-20" />
        <p className="text-xs text-gray-500">
          You can use <span className="font-semibold">markdown</span> to style
          your description.
        </p>
      </div>
      <div className="min-h-screen flex justify-center py-5 border px-3 gap-3 rounded-lg">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="border w-1/3 flex flex-col gap-2 px-2 py-3 rounded-lg h-full">
            <div className="flex flex-col px-1 pb-2">
              <h1 className="text-xl font-semibold">Pick Your Blocks</h1>
              <p className="text-xs text-gray-500">
                Drag and drop the blocks from the left to add them to your
                template.
              </p>
            </div>
            {items.map((item) => (
              <Draggable key={item.id} id={item.id}>
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </div>
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
                  title={item.name}
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
    </div>
  );
};

export default TemplateBuilder;
