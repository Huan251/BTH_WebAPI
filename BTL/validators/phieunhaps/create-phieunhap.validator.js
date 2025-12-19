import { z } from "zod";

export const createPhieuNhapSchema = z.object({
  ma_phieu_nhap: z.number().int().positive(),
  ma_ncc: z.number().int().positive(),
  ngay_nhap: z.string().min(1),
});
