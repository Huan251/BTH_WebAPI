import { z } from "zod";

export const createHangHoaSchema = z.object({
  MaHang: z.number({ required_error: "MaHang is required" }),
  MaLoai: z.int(),
  TenHang: z.string({required_error: "TenHang is required" }).max(100),
  SoLuong: z.int() > 0,
  SoLuongCon: z.int() > 0
});

export function validateCreateHangHoa(data) {
  return createHangHoaSchema.parse(data);
}
