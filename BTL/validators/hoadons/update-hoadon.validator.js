import { z } from "zod";

export const updateHoaDonSchema = z.object({
  ma_kh: z.number().int().positive("Mã khách hàng không hợp lệ").optional(),

  ngay_ban: z.string().datetime({ message: "Ngày bán không hợp lệ" }).optional(),

  tong_tien: z.number().nonnegative("Tổng tiền không được âm").optional(),
});
