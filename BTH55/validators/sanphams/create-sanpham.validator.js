import { z } from "zod";

export const createSanPhamSchema = z.object({
  Ma: z.number({ required_error: "Ma is required" }),
  Ten: z.string({ required_error: "Ten is required" }).max(255),
  DonGia: z.int() > 0,
  MaDanhMuc: z.number({ required_error: "MaDanhMuc is required" }),
});

export function validateCreateSanPham(data) {
  return createSanPhamSchema.parse(data);
}
