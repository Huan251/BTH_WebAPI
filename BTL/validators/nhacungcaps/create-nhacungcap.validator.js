import { z } from "zod";

export const createNhaCungCapSchema = z.object({
  ma_ncc: z.number().int().positive(),
  ten_ncc: z.string().min(1),
  dien_thoai: z.string().min(5),
  dia_chi: z.string().min(1),
  email: z.string().email(),
});
