import { z } from "zod";

export const createHoaDonSchema = z.object({
  ma_hd: z.number().int().positive(),
  ma_kh: z.number().int().positive(),
  ngay_ban: z.string(),
  tong_tien: z.number().optional(),
});
