import { z } from "zod";

export const updateKhachHangSchema = z.object({
  ten_kh: z.string().min(1, "Tên khách hàng không được rỗng").optional(),
  dia_chi: z.string().min(1, "Địa chỉ không được rỗng").optional(),
  dien_thoai: z.string().min(1, "Điện thoại không được rỗng").optional(),
  email: z.string().email("Email không hợp lệ").optional(),
});
