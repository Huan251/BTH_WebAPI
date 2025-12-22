import httpErrors from "http-errors";
import { chiTietHoaDonRepository } from "../repositories/chitiet_hoadon.repository.js";
import { ChiTietHoaDonDTO } from "../dtos/chitiet_hoadons/chitiet_hoadon.dto.js";

export const chiTietHoaDonService = {
  getAll: async () => {
    const data = await chiTietHoaDonRepository.getAll();
    return data.map(ct => new ChiTietHoaDonDTO(ct));
  },

  getById: async (ma_cthd) => {
    const ct = await chiTietHoaDonRepository.getById(ma_cthd);
    if (!ct) throw httpErrors(404, "Không tìm thấy chi tiết hóa đơn");
    return new ChiTietHoaDonDTO(ct);
  },

  create: async (data) => {
    if (await chiTietHoaDonRepository.existsById(data.ma_cthd))
      throw httpErrors(400, "Chi tiết hóa đơn đã tồn tại");

    if (!(await chiTietHoaDonRepository.existsHoaDon(data.ma_hd)))
      throw httpErrors(400, "Hóa đơn không tồn tại");

    if (!(await chiTietHoaDonRepository.existsSanPham(data.ma_sp)))
      throw httpErrors(400, "Sản phẩm không tồn tại");

    await chiTietHoaDonRepository.create(data);
  },

 update: async (payload) => {
    const { ma_cthd, ...data } = payload;

    // 1. Kiểm tra CTHD tồn tại
    const cthd = await chiTietHoaDonRepository.getById(ma_cthd);
    if (!cthd) throw httpErrors(404, "Chi tiết hóa đơn không tồn tại!");

    // 2. Nếu sửa hóa đơn → kiểm tra tồn tại
    if (data.ma_hd !== undefined) {
      const ok = await chiTietHoaDonRepository.existsHoaDon(data.ma_hd);
      if (!ok) throw httpErrors(400, "Hóa đơn không tồn tại!");
    }

    // 3. Nếu sửa sản phẩm → kiểm tra tồn tại
    if (data.ma_sp !== undefined) {
      const ok = await chiTietHoaDonRepository.existsSanPham(data.ma_sp);
      if (!ok) throw httpErrors(400, "Sản phẩm không tồn tại!");
    }

    // 4. Update
    const affected = await chiTietHoaDonRepository.update({
      ma_cthd,
      ...data,
    });

    if (affected === 0)
      throw httpErrors(400, "Không có dữ liệu nào được cập nhật!");
  },
};
