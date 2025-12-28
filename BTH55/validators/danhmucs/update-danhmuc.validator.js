import { z } from "zod";

export const updateDanhMucSchema = z.object({
  TenDanhMuc: z.string({required_error: "TenDanhMuc is required" }).max(255),
});

export function validateUpdateDanhMuc(data) {
  return updateDanhMucSchema.parse(data);
}
