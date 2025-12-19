import httpErrors from "http-errors";
import { danhMucRepository } from "../repositories/danhmuc.repository.js";
import { DanhMucDTO } from "../dtos/danhmucs/danhmuc.dto.js";
import { logger } from "../config/logger.js";

export const danhMucService = {
  getAll: async () => {
    logger.info("Service: Lấy tất cả danh mục");
    const data = await danhMucRepository.getAll();
    return data.map(dm => new DanhMucDTO(dm));
  },

  getById: async (maDanhMuc) => {
    const dm = await danhMucRepository.getById(maDanhMuc);
    if (!dm) throw httpErrors(404, "Không tìm thấy danh mục!");
    return new DanhMucDTO(dm);
  },

  create: async (payload) => {
    const exists = await danhMucRepository.existsById(payload.ma_danh_muc);
    if (exists) throw httpErrors(400, "Mã danh mục đã tồn tại!");
    await danhMucRepository.create(payload);
  },

  update: async (payload) => {
    const { ma_danh_muc, ten_danh_muc, mo_ta } = payload;

    if (!ma_danh_muc || isNaN(ma_danh_muc))
      throw httpErrors(400, "Mã danh mục không hợp lệ!");

    if (ten_danh_muc === undefined && mo_ta === undefined)
      throw httpErrors(400, "Không có dữ liệu để cập nhật!");

    const affected = await danhMucRepository.update({
      ma_danh_muc,
      ten_danh_muc,
      mo_ta,
    });

    if (affected === 0)
      throw httpErrors(404, "Danh mục không tồn tại!");
  },
};
