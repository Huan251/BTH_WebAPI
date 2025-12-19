import { z } from "zod";

export const createChiTietHoaDonSchema = z.object({
  ma_cthd: z.number().int().positive(),
  ma_hd: z.number().int().positive(),
  ma_sp: z.number().int().positive(),
  so_luong: z.number().int().positive(),
  don_gia_ban: z.number().positive(),
});
