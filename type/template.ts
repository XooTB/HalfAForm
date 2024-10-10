import { z } from "zod";

export const QuestionBlockSchema = z.object({
  id: z.string(),
  type: z.enum(["short", "paragraph", "multipleChoice"]),
  question: z.string().min(2, { message: "Question is required" }),
  required: z.boolean(),
  description: z.string().optional(),
  optionsType: z.enum(["checkbox", "radio", "dropdown"]).optional(),
  options: z.array(z.string()).optional(),
});

export const TemplateSchema = z.object({
  name: z.string().min(1, { message: "Template name is required" }),
  author: z.string().optional(),
  description: z
    .string()
    .min(1, { message: "Template description is required" }),
  blocks: z
    .array(QuestionBlockSchema)
    .min(1, { message: "Atleast 1 question block is required" }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type QuestionBlock = z.infer<typeof QuestionBlockSchema>;
export type Template = z.infer<typeof TemplateSchema>;
