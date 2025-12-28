import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  role: z.enum(["User", "Admin"]).default("User")
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});
