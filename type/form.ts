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

export type Answer = z.infer<typeof AnswerSchema>;
export type FormCreate = z.infer<typeof FormCreateSchema>;
