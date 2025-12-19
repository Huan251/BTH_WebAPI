import { z } from "zod";

export const updateNhaCungCapSchema = z.object({
  ten_ncc: z.string().min(1, "Tên nhà cung cấp không được rỗng").optional(),
  dia_chi: z.string().min(1, "Địa chỉ không được rỗng").optional(),
  dien_thoai: z.string().min(1, "Điện thoại không được rỗng").optional(),
  email: z
    .string()
    .email("Email không hợp lệ")
    .optional(),
});
