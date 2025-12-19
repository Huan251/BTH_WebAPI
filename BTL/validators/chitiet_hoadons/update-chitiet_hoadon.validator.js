import { z } from "zod";

export const updateCTHoaDonSchema = z.object({
  ma_hd: z.number().int().positive("Mã hóa đơn không hợp lệ").optional(),

  ma_sp: z.number().int().positive("Mã sản phẩm không hợp lệ").optional(),

  so_luong: z
    .number()
    .int()
    .positive("Số lượng phải lớn hơn 0")
    .optional(),

  don_gia_ban: z
    .number()
    .positive("Đơn giá bán phải lớn hơn 0")
    .optional(),
});
