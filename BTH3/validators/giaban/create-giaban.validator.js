import { z } from "zod";

export const createGiaBanSchema = z.object({
    MaGB: z.number({ required_error: "MaGiaBan is required" }),
    MaHang: z.int(),
    Gia: z.int(),
    DVTinh: z.string({required_error: "DVTinh is required"}).max(30),
    NgayBD: z.coerce.date({required_error: "NgayBD is required"}),
    NgayKT: z.coerce.date({required_error: "NgayKT is required"}),
});

export function validateCreateGiaBan(data) {
  return createGiaBanSchema.parse(data);
}
