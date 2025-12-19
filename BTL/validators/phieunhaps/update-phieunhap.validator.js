import { z } from "zod";

export const updatePhieuNhapSchema = z.object({
  ma_ncc: z.number().int().positive("Mã nhà cung cấp không hợp lệ").optional(),

  ngay_nhap: z
    .string()
    .min(1, "Ngày nhập không được bỏ trống")
    .optional(), 
});
