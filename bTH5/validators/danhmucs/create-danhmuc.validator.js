import { z } from "zod";

export const createDanhMucSchema = z.object({
  MaDanhMuc: z.number({ required_error: "MaDanhMuc is required" }),
  TenDanhMuc: z.string({required_error: "TenHang is required" }).max(255),
});

export function validateCreateDanhMuc(data) {
  return createDanhMucSchema.parse(data);
}
