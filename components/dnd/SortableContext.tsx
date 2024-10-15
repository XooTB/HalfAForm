import {
  DndContext,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import React from "react";
import {
  SortableContext as DndKitSortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import { QuestionBlock } from "@/type/template";
import { SortableBlock } from "./SortableBlock";

type Props = {
  children: React.ReactNode;
  blocks: QuestionBlock[];
  onBlocksReorder: (newBlocks: QuestionBlock[]) => void;
  onBlockDelete: (id: string) => void;
};

// SortableContextWrapper component for handling drag and drop functionality
const SortableContextWrapper = ({
  children,
  blocks,
  onBlocksReorder,
  onBlockDelete,
}: Props) => {
  // Set up sensors for drag and drop interactions
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle the end of a drag event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // If the item was dropped in a different position
    if (active.id !== over?.id) {
      // Find the old and new indices of the moved item
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over?.id);
      // Create a new array with the item in its new position
      const newBlocks = arrayMove(blocks, oldIndex, newIndex);
      // Call the callback function with the updated blocks array
      onBlocksReorder(newBlocks);
    }
  };

  return (
    // Set up the drag and drop context
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {/* Create a sortable context with the blocks */}
      <DndKitSortableContext items={blocks}>
        {/* Map over the children and wrap each in a SortableBlock */}
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <SortableBlock
                key={blocks[index].id}
                id={blocks[index].id}
                onDelete={onBlockDelete}
              >
                {child}
              </SortableBlock>
            );
          }
          return child;
        })}
      </DndKitSortableContext>
    </DndContext>
  );
};

export default SortableContextWrapper;
