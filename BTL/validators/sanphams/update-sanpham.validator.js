import { z } from "zod";

export const updateSanPhamSchema = z.object({
  ten_sp: z.string().min(1, "Tên sản phẩm không được rỗng").optional(),

  ma_danh_muc: z.number().int().positive().optional(),

  ma_ncc: z.number().int().positive().optional(),

  gia_ban: z.number().positive("Giá bán phải > 0").optional(),

  gia_nhap: z.number().positive("Giá nhập phải > 0").optional(),

  so_luong_ton: z.number().int().nonnegative("Số lượng tồn không âm").optional(),

  mo_ta: z.string().optional(), 
  
});