import { z } from "zod";

export const createHangHoaSchema = z.object({
  MaHang: z.number({ required_error: "MaHang is required" }),
  MaLoai: z.int({ required_error: "MaLoai is required" }),
  TenHang: z.string({required_error: "TenHang is required"}).max(50),
  SoLuong: z.number().int().min(1, {message: "SoLuong must be at least 1"}),
  SoLuongCon: z.number().int().min(1, {message: "SoLuongCon must be at least 1"}),
});

export function validateCreateHangHoa(data) {
  return createHangHoaSchema.parse(data);
}
