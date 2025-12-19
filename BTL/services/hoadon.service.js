import { hoaDonRepository } from "../repositories/hoadon.repository.js";
import { HoaDonDTO } from "../dtos/hoadons/hoadon.dto.js";
import httpErrors from "http-errors";


export const hoaDonService = {
  getAll: async () => {
    const data = await hoaDonRepository.getAll();
    return data.map((hd) => new HoaDonDTO(hd));
  },

  getById: async (ma_hd) => {
    const hd = await hoaDonRepository.getById(ma_hd);
    if (!hd) throw httpErrors(404, "Không tìm thấy hóa đơn");
    return new HoaDonDTO(hd);
  },

  getByKhachHang: async (ma_kh) => {
    const rows = await hoaDonRepository.getByKhachHang(ma_kh);
    if (!rows.length)
      throw httpErrors(404, "Không tìm thấy hóa đơn của khách hàng");
    return rows.map((hd) => new HoaDonDTO(hd));
  },

  getByMonthYear: async (thang, nam) => {
    const rows = await hoaDonRepository.getByMonthYear(thang, nam);
    if (!rows.length)
      throw httpErrors(404, "Không có hóa đơn trong thời gian này");
    return rows.map((hd) => new HoaDonDTO(hd));
  },

  create: async (data) => {
    const exists = await hoaDonRepository.existsById(data.ma_hd);
    if (exists) throw httpErrors(400, "Hóa đơn đã tồn tại");

    await hoaDonRepository.create({
      ...data,
      tong_tien: data.tong_tien || 0,
    });
  },

  getChiTiet: async (ma_hd) => {
    const rows = await hoaDonRepository.getChiTietByMaHD(ma_hd);
    if (!rows.length)
      throw httpErrors(404, "Hóa đơn chưa có chi tiết");

    return {
      ma_hoa_don: ma_hd,
      so_dong: rows.length,
      bang_chi_tiet: rows,
    };
  },

   update: async (payload) => {
    const { ma_hd, ...data } = payload;

    // 1. Kiểm tra hóa đơn tồn tại
    const hd = await hoaDonRepository.getById(ma_hd);
    if (!hd) throw httpErrors(404, "Hóa đơn không tồn tại!");

    // 2. Kiểm tra khách hàng nếu sửa
    if (data.ma_kh !== undefined) {
      const existsKH = await hoaDonRepository.existsKhachHang(data.ma_kh);
      if (!existsKH) throw httpErrors(400, "Mã khách hàng không tồn tại!");
    }

    // 3. Kiểm tra tổng tiền không âm
    if (data.tong_tien !== undefined && data.tong_tien < 0) {
      throw httpErrors(400, "Tổng tiền không được âm!");
    }

    // 4. Update
    const affected = await hoaDonRepository.update({
      ma_hd,
      ...data,
    });

    if (affected === 0)
      throw httpErrors(400, "Không có dữ liệu nào được cập nhật!");
  },
};
