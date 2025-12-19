import httpErrors from "http-errors";
import { chiTietPhieuNhapRepository } from "../repositories/chitiet_phieunhap.repository.js";
import { ChiTietPhieuNhapDTO } from "../dtos/chitiet_phieunhaps/chitiet_phieunhap.dto.js";

export const chiTietPhieuNhapService = {
  getAll: async () => {
    const data = await chiTietPhieuNhapRepository.getAll();
    return data.map(ct => new ChiTietPhieuNhapDTO(ct));
  },

  getById: async (ma_ctpn) => {
    const ct = await chiTietPhieuNhapRepository.getById(ma_ctpn);
    if (!ct) throw httpErrors(404, "Không tìm thấy chi tiết phiếu nhập");
    return new ChiTietPhieuNhapDTO(ct);
  },

  create: async (data) => {
    if (await chiTietPhieuNhapRepository.existsById(data.ma_ctpn))
      throw httpErrors(400, "Chi tiết phiếu nhập đã tồn tại");

    if (
      !(await chiTietPhieuNhapRepository.existsPhieuNhap(
        data.ma_phieu_nhap
      ))
    )
      throw httpErrors(400, "Phiếu nhập không tồn tại");

    if (
      !(await chiTietPhieuNhapRepository.existsSanPham(data.ma_sp))
    )
      throw httpErrors(400, "Sản phẩm không tồn tại");

    await chiTietPhieuNhapRepository.create(data);
  },

   update: async (payload) => {
    const { ma_phieu_nhap, ma_ncc, ngay_nhap } = payload;

    // 1. Kiểm tra phiếu nhập tồn tại
    const pn = await phieuNhapRepository.getById(ma_phieu_nhap);
    if (!pn) throw httpErrors(404, "Phiếu nhập không tồn tại!");

    // 2. Kiểm tra NCC nếu có sửa
    if (ma_ncc !== undefined) {
      const ok = await phieuNhapRepository.existsNCC(ma_ncc);
      if (!ok) throw httpErrors(400, "Mã nhà cung cấp không tồn tại!");
    }

    // 3. Ngày nhập không được bỏ trống nếu gửi
    if (ngay_nhap !== undefined && !ngay_nhap)
      throw httpErrors(400, "Ngày nhập không được bỏ trống!");

    // 4. Cập nhật
    const affected = await phieuNhapRepository.update(payload);
    if (affected === 0)
      throw httpErrors(400, "Không có dữ liệu nào được cập nhật!");
  },
};
