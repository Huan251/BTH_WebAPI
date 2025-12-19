import { z } from "zod";

export const updateCTPhieuNhapSchema = z.object({
  ma_phieu_nhap: z.number().int().positive("Mã phiếu nhập không hợp lệ").optional(),
  ma_sp: z.number().int().positive("Mã sản phẩm không hợp lệ").optional(),
  so_luong: z.number().int().positive("Số lượng phải > 0").optional(),
  don_gia_nhap: z.number().positive("Đơn giá nhập phải > 0").optional(),
});
