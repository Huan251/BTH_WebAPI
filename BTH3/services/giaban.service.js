import { giabanRepository } from "../repositories/giaban.repository.js";
import { GiaBanDTO } from "../dtos/giabans/giaban.dto.js";
import { logger } from "../config/logger.js";

export const giabanService = {
    getAllGiaBans: async () => {
        logger.info("Service: Getting all giabans");
        const giabans = await giabanRepository.getAll();
        return giabans.map((u) => new GiaBanDTO(u));
    },
    getGiabanByMaHang: async (MaHang) => {
        logger.info(`Service: Getting giaban by MaHang ${MaHang}`);
        const giaban = await giabanRepository.getByGia(MaHang);
        if (!giaban) {
            logger.warn(`Service Warning: giaban ${MaHang} not found`);
            throw new Error("giaban not found");
        }
        return new GiaBanDTO(giaban);
    },
    getGiaHangVaoThoiDiemHienTai: async (MaHang) => {
      logger.info(`Service: Getting GiaHangHoa for MaHang ${MaHang}`);
      const giaHang = await giabanRepository.getGiaHangHoa(MaHang);
      if (!giaHang) {
        logger.warn(`Service Warning: GiaHangHoa for MaHang ${MaHang} not found`);
        throw new Error("GiaHangHoa not found");
      }
      return new GiaBanDTO(giaHang);
    },
//   getUserById: async (id) => {
//     logger.info(`Service: Getting user by ID ${id}`);
//     const user = await userRepository.getById(id);

//     if (!user) {
//       logger.warn(`Service Warning: User ${id} not found`);
//       throw new Error("User not found");
//     }

//     return new UserDTO(user);
//   },


  createGiaBan: async (dto) => {
    logger.info(`Service: Creating new giaban ${dto.MaGB}`);
    const created = await giabanRepository.create(dto);
    return new GiaBanDTO(created);
  },

  updateGiaBan: async (MaGB, dto) => {
    logger.info(`Service: Updating giaban ${MaGB}`);

    const existing = await giabanRepository.getByMaGB(MaGB);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. GiaBan ${MaGB} not found`);
      throw new Error("GiaBan not found");
    }

    const updated = await giabanRepository.update(MaGB, dto);
    return new GiaBanDTO(updated);
  },

  deleteGiaBan: async (MaGB) => {
    logger.info(`Service: Deleting giaban ${MaGB}`);

    const existing = await giabanRepository.getByMaGB(MaGB);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. GiaBan ${MaGB} not found`);
      throw new Error("GiaBan not found");
    }

    await giabanRepository.delete(MaGB);
    return { message: "GiaBan deleted successfully" };
  },
};
