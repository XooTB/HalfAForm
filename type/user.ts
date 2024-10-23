import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.enum(["admin", "regular"]),
  status: z.enum(["active", "restricted"]),
});

export type User = z.infer<typeof userSchema>;
