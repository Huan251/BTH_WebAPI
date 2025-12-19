import { khachHangRepository } from "../repositories/khachhang.repository.js";
import { KhachHangDTO } from "../dtos/khachhangs/khachhang.dto.js";
import httpErrors from "http-errors";
import { logger } from "../config/logger.js";

export const khachHangService = {
  getAll: async () => {
    logger.info("Service: Get all KhachHang");
    const data = await khachHangRepository.getAll();
    return data.map((kh) => new KhachHangDTO(kh));
  },

  getById: async (ma_kh) => {
    const kh = await khachHangRepository.getById(ma_kh);
    if (!kh) throw httpErrors(404, "Không tìm thấy khách hàng");
    return new KhachHangDTO(kh);
  },

  create: async (data) => {
    const exists = await khachHangRepository.existsById(data.ma_kh);
    if (exists)
      throw httpErrors(400, "Mã khách hàng đã tồn tại");

    await khachHangRepository.create(data);
  },

    update: async (payload) => {
    const { ma_kh, ...data } = payload;

    // 1. Kiểm tra KH tồn tại
    const kh = await khachHangRepository.getById(ma_kh);
    if (!kh) throw httpErrors(404, "Khách hàng không tồn tại!");

    // 2. Update
    const affected = await khachHangRepository.update({ ma_kh, ...data });

    if (affected === 0)
      throw httpErrors(400, "Không có dữ liệu nào được cập nhật!");
  },
};
    