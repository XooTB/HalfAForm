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

import { QuestionBlock } from "@/type/template";
import { useTemplateBuilderStore } from "@/stores/TemplateBuilderStore";

// Define the structure for draggable items
interface Item {
  id: string;
  name: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

// Array of available question block types
const items: Item[] = [
  {
    id: "short",
    name: "Short Answer",
    icon: <Text />,
    content: <TextQuestionBlock />,
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
  // State to keep track of items dropped into the template
  const [droppedItems, setDroppedItems] = useState<Item[]>([]);

  // Access template builder store
  const {
    name,
    description,
    blocks,
    setName,
    setDescription,
    addBlock,
    reorderBlocks,
    removeBlock,
  } = useTemplateBuilderStore();

  // Configure drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle the end of a drag event
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Check if the dragged item is not already in the dropped items list
    if (!droppedItems.some((item) => item.id === active.id)) {
      // If the item is not in droppedItems, add it
      // Create a new block with a unique ID and default properties
      const Block: QuestionBlock = {
        ...items.find((item) => item.id === active.id)!,
        id: `dropped-${active.id}-${Date.now()}`, // Generate a unique ID
        type: active.id as "short" | "paragraph" | "multipleChoice",
        question: "", // Initialize with an empty question
        required: true, // Set as required by default
      };

      // Add the new block to the dropped items state
      setDroppedItems((prevItems) => [
        ...prevItems,
        {
          ...items.find((item) => item.id === active.id)!,
          id: Block.id,
        },
      ]);
      // Add the block to the template builder store for global state management
      addBlock(Block);
    } else if (active.id !== over?.id) {
      // If the item is already in droppedItems and the order has changed, update the order
      setDroppedItems((prevItems) => {
        // Find the old and new indices of the moved item
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over?.id);

        // Use arrayMove utility to reorder the items
        const newOrder = arrayMove(prevItems, oldIndex, newIndex);

        // Update the TemplateBuilderStore with the new block order
        const newBlockOrder = newOrder.map((item) => item.id);
        reorderBlocks(newBlockOrder);

        // Return the new order to update the local state
        return newOrder;
      });
    }
  }

  // Handle deletion of a dropped item
  function handleDelete(id: string) {
    setDroppedItems((prevItems) => prevItems.filter((item) => item.id !== id));
    removeBlock(id);
  }

  return (
    <div className="w-full flex flex-col gap-5 py-5">
      {/* Template metadata input section */}
      <div className="flex flex-col gap-2">
        {/* Template Name */}
        <Input
          placeholder="Template Name"
          className="h-14 text-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Template Description */}
        <Textarea
          placeholder="Template Description"
          className="h-20"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="text-xs text-gray-500">
          You can use <span className="font-semibold">markdown</span> to style
          your description.
        </p>
      </div>
      {/* Main template builder area */}
      <div className="min-h-screen flex justify-center py-5 border px-3 gap-3 rounded-lg">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {/* Sidebar with draggable items */}
          <div className="border w-1/3 flex flex-col gap-2 px-2 py-3 rounded-lg h-fit">
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
          {/* Droppable area for template blocks */}
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
                  {/* Render the appropriate question block component */}
                  {React.cloneElement(
                    item.content as React.ReactElement<{
                      blockId?: string;
                    }>,
                    {
                      blockId: item.id,
                    }
                  )}
                </SortableItem>
              ))}
              {/* Display a message when no items are dropped */}
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
