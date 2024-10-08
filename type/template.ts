import { z } from "zod";

export const QuestionBlockSchema = z.object({
  id: z.string(),
  type: z.enum(["short", "paragraph", "multipleChoice"]),
  question: z.string(),
  required: z.boolean(),
  description: z.string().optional(),
  optionsType: z.enum(["checkbox", "radio", "dropdown"]).optional(),
  options: z.array(z.string()).optional(),
});

export const TemplateSchema = z.object({
  name: z.string(),
  author: z.string().optional(),
  description: z.string(),
  blocks: z.array(QuestionBlockSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type QuestionBlock = z.infer<typeof QuestionBlockSchema>;
export type Template = z.infer<typeof TemplateSchema>;
