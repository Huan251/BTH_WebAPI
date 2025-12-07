import { hanghoaRepository } from "../repositories/hanghoa.repository.js";
import { HangHoaDTO } from "../dtos/hanghoas/hanghoa.dto.js";
import { logger } from "../config/logger.js";

export const hanghoaService = {
    getAllhanghoas: async () => {
      logger.info("Service: Getting all hanghoas");
      const hanghoas = await hanghoaRepository.getAll();
      return hanghoas.map((u) => new HangHoaDTO(u));
    },

    getHanghoaByMaLoai: async (MaLoai) => {
      logger.info(`Service: Getting hanghoa by MaLoai ${MaLoai}`);
      const hanghoa = await hanghoaRepository.getByMaLoai(MaLoai);

      if (!hanghoa) {
        logger.warn(`Service Warning: hanghoa ${MaLoai} not found`);
        throw new Error("hanghoa not found");
      }

      return new HangHoaDTO(hanghoa);
    },
    getHangHoaByTenLoai: async (name) => {
      logger.info(`Service: Getting hanghoa by ten loai ${name}`);
      const hanghoa = await hanghoaRepository.getByTenLoai(name);
      if (!hanghoa) {
        logger.warn(`Service Warning: hanghoa ${name} not found`);
        throw new Error("hanghoa not found");
      }
      return hanghoa.map(item => new HangHoaDTO(item));
    },
    getHangHoaSoLuongConNhoHon5: async () => {
      logger.info("Service: Getting hanghoa with SoLuongCon less than 5");
      const hanghoas = await hanghoaRepository.getByNhoHon5();
      if (!hanghoas || hanghoas.length === 0) {
        logger.warn("Service Warning: No hanghoa with SoLuongCon less than 5 found");
        throw new Error("No hanghoa found");
      }
      return hanghoas.map(item => new HangHoaDTO(item));
    },
    getHangHoaCoGiaTrongKhoang: async (minPrice, maxPrice) => {
      logger.info(`Service: Getting hanghoa with price between ${minPrice} and ${maxPrice}`);
      const hanghoas = await hanghoaRepository.getByGiaKhoang(minPrice, maxPrice);
      if (!hanghoas || hanghoas.length === 0) {
        logger.warn(`Service Warning: No hanghoa found in price range ${minPrice} - ${maxPrice}`);
        throw new Error("No hanghoa found");
      }
      return hanghoas.map(item => new HangHoaDTO(item));
    },
    getGiaHangHoaCoMa: async (MaHang) => {
      logger.info(`Service: Getting price for hanghoa with MaHang ${MaHang}`);
      const giaHang = await hanghoaRepository.getGiaHangHoa(MaHang);
      if (!giaHang) {
        logger.warn(`Service Warning: No price found for hanghoa ${MaHang}`);
        throw new Error("No price found");
      }
      return giaHang;
    },
    createhanghoa: async (dto) => {
        logger.info(`Service: Creating new hanghoa ${dto.MaHang}`);
        const created = await hanghoaRepository.create(dto);
        return new HangHoaDTO(created);
    },

    updatehanghoa: async (MaHang, dto) => {
        logger.info(`Service: Updating hanghoa ${MaHang}`);

        const existing = await hanghoaRepository.getByMaHang(MaHang);
        if (!existing) {
          logger.warn(`Service Warning: Cannot update. HangHoa ${MaHang} not found`);
          throw new Error("HangHoa not found");
        }

        const updated = await hanghoaRepository.update(MaHang, dto);
        return new HangHoaDTO(updated);
    },

    deletehanghoa: async (MaHang) => {
        logger.info(`Service: Deleting hanghoa ${MaHang}`);

        const existing = await hanghoaRepository.getByMaHang(MaHang);
        if (!existing) {
          logger.warn(`Service Warning: Cannot delete. hanghoa ${MaHang} not found`);
          throw new Error("hanghoa not found");
        }

        await hanghoaRepository.delete(MaHang);
        return { message: "hanghoa deleted successfully" };
    },
};
