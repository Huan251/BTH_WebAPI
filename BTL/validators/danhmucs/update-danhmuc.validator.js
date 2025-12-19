import { z } from "zod";

export const updateDanhMucSchema = z.object({
  ma_danh_muc: z.number().int().positive(),

  ten_danh_muc: z
    .string()
    .min(1, "Tên danh mục không được rỗng")
    .optional(),

  mo_ta: z
    .string()
    .optional(),
});
