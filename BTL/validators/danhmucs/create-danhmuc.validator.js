import { z } from "zod";

export const createDanhMucSchema = z.object({
  ma_danh_muc: z.number().int().positive(),
  ten_danh_muc: z.string().min(1),
  mo_ta: z.string().optional().nullable(),
});
