import { z } from "zod";

export const createKhachHangSchema = z.object({
  ma_kh: z.number().int().positive(),
  ten_kh: z.string().min(1).max(255),
  dia_chi: z.string().optional(),
  dien_thoai: z.string().optional(),
});
