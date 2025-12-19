import httpErrors from "http-errors";
import { phieuNhapRepository } from "../repositories/phieunhap.repository.js";
import { PhieuNhapDTO } from "../dtos/phieunhaps/phieunhap.dto.js";

export const phieuNhapService = {
  getAll: async () => {
    const data = await phieuNhapRepository.getAll();
    return data.map(pn => new PhieuNhapDTO(pn));
  },

  getById: async (ma_phieu_nhap) => {
    const pn = await phieuNhapRepository.getById(ma_phieu_nhap);
    if (!pn) throw httpErrors(404, "Không tìm thấy phiếu nhập");
    return new PhieuNhapDTO(pn);
  },

  getByNCC: async (ma_ncc) => {
    const data = await phieuNhapRepository.getByNCC(ma_ncc);
    if (data.length === 0)
      throw httpErrors(404, "Không tìm thấy phiếu nhập của NCC này");
    return data.map(pn => new PhieuNhapDTO(pn));
  },

  getByMonthYear: async (thang, nam) => {
    const data = await phieuNhapRepository.getByMonthYear(thang, nam);
    if (data.length === 0)
      throw httpErrors(404, "Không tìm thấy phiếu nhập trong tháng này");

    return data.map(pn => {
      pn.ngay_nhap = new Date(pn.ngay_nhap).toLocaleDateString("vi-VN");
      return new PhieuNhapDTO(pn);
    });
  },

  create: async (data) => {
    if (await phieuNhapRepository.existsById(data.ma_phieu_nhap))
      throw httpErrors(400, "Phiếu nhập đã tồn tại");

    if (!(await phieuNhapRepository.existsNCC(data.ma_ncc)))
      throw httpErrors(400, "Nhà cung cấp không tồn tại");

    await phieuNhapRepository.create(data);
  },

  update: async (payload) => {
    const { ma_phieu_nhap, ...data } = payload;

    // Kiểm tra phiếu nhập tồn tại
    const phieu = await phieuNhapRepository.getById(ma_phieu_nhap);
    if (!phieu) throw httpErrors(404, "Phiếu nhập không tồn tại!");

    // Kiểm tra dữ liệu (nếu muốn)
    // Ngày nhập không được trống
    if (data.ngay_nhap !== undefined && !data.ngay_nhap) {
      throw httpErrors(400, "Ngày nhập không được bỏ trống!");
    }

    // 3. Update
    const affected = await phieuNhapRepository.update({
      ma_phieu_nhap,
      ...data,
    });

    if (affected === 0)
      throw httpErrors(400, "Không có dữ liệu nào được cập nhật!");
  },
};
