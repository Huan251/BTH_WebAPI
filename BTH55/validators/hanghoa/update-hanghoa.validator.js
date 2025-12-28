import { z } from "zod";

export const updateHangHoaSchema = z.object({
  MaLoai: z.int(),
  TenHang: z.string({required_error: "TenHang is required" }).max(100),
  SoLuong: z.int() > 0,
  SoLuongCon: z.int() > 0
});

export function validateUpdateHangHoa(data) {
  return updateHangHoaSchema.parse(data);
}
