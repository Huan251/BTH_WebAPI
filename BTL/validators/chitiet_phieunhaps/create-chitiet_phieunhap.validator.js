import { z } from "zod";

export const createChiTietPhieuNhapSchema = z.object({
  ma_ctpn: z.number().int().positive(),
  ma_phieu_nhap: z.number().int().positive(),
  ma_sp: z.number().int().positive(),
  so_luong: z.number().int().positive(),
  don_gia_nhap: z.number().positive(),
});
