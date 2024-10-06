export interface QuestionBlock {
  id: string;
  type: "short" | "paragraph" | "multipleChoice";
  question: string;
  required: boolean;
  description?: string;
  optionsType?: "checkbox" | "radio" | "dropdown";
  options?: string[];
}

export interface Template {
  name: string;
  author: string;
  description: string;
  blocks: QuestionBlock[];
  createdAt: Date;
  updatedAt: Date;
}
