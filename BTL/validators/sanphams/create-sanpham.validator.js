import { z } from "zod";

export const createSanPhamSchema = z.object({
  ma_sp: z.number().int().positive(),
  ten_sp: z.string().min(1),
  ma_danh_muc: z.number().int().positive(),
  ma_ncc: z.number().int().positive(),
  gia_ban: z.number().nonnegative(),
  gia_nhap: z.number().nonnegative(),
  so_luong_ton: z.number().int().nonnegative(),
  mo_ta: z.string().optional().nullable(),
  
});
