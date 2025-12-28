import { sanphamRepository } from "../repositories/sanpham.repository.js";
import { SanPhamDTO } from "../dtos/sanphams/sanpham.dto.js";
import { logger } from "../config/logger.js";

export const sanphamService = {
  getAllsanphams: async () => {
    logger.info("Service: Getting all sanphams");
    const sanphams = await sanphamRepository.getAll();
    return sanphams.map((u) => new SanPhamDTO(u));
  },
};
