import { z } from "zod";

export const AnswerSchema = z.object({
  questionId: z.string(),
  questionType: z.enum(["short", "paragraph", "multipleChoice"]),
  question: z.string(),
  answer: z.union([z.string(), z.array(z.string())]),
});

export const FormCreateSchema = z.object({
  templateId: z.string(),
  answers: z.array(AnswerSchema),
});

export const FormSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  templateId: z.string(),
  answers: z.array(AnswerSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const TemplateFieldsSchema = z.object({
  name: z.string(),
  id: z.string(),
  description: z.string(),
});

export const FormWithTemplateSchema = FormSchema.extend({
  template: TemplateFieldsSchema,
});

export type Answer = z.infer<typeof AnswerSchema>;
export type FormCreate = z.infer<typeof FormCreateSchema>;
export type Form = z.infer<typeof FormSchema>;
export type TemplateFields = z.infer<typeof TemplateFieldsSchema>;
export type FormWithTemplate = z.infer<typeof FormWithTemplateSchema>;
