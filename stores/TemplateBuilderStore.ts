import { create } from "zustand";
import { Template, QuestionBlock } from "@/type/template";

interface TemplateBuilderStore {
  name: string;
  description: string;
  status: "draft" | "published";
  imageUrl: string | null;
  blocks: QuestionBlock[];
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setStatus: (status: "draft" | "published") => void;
  setImageUrl: (imageUrl: string | null) => void;
  addBlock: (block: QuestionBlock) => void;
  updateBlock: (id: string, updates: Partial<QuestionBlock>) => void;
  removeBlock: (id: string) => void;
  reorderBlocks: (newOrder: string[]) => void;
  getTemplate: () => Template;
}

export const useTemplateBuilderStore = create<TemplateBuilderStore>((set) => ({
  name: "",
  description: "",
  status: "draft",
  imageUrl: null,
  blocks: [],
  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setStatus: (status) => set({ status }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
  addBlock: (block) => set((state) => ({ blocks: [...state.blocks, block] })),
  updateBlock: (id, updates) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, ...updates } : block
      ),
    })),
  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
    })),
  reorderBlocks: (newOrder) =>
    set((state) => ({
      blocks: newOrder
        .map((id) => state.blocks.find((block) => block.id === id))
        .filter((block): block is QuestionBlock => block !== undefined),
    })),
  getTemplate: (): Template => ({
    name: useTemplateBuilderStore.getState().name,
    imageUrl: useTemplateBuilderStore.getState().imageUrl || undefined,
    description: useTemplateBuilderStore.getState().description,
    blocks: useTemplateBuilderStore.getState().blocks,
    status: useTemplateBuilderStore.getState().status,
  }),
}));
