import httpErrors from "http-errors";
import { sanPhamRepository } from "../repositories/sanpham.repository.js";
import { SanPhamDTO } from "../dtos/sanphams/sanpham.dto.js";

export const sanPhamService = {
  getAll: async () =>
    (await sanPhamRepository.getAll()).map(sp => new SanPhamDTO(sp)),

  getById: async (ma_sp) => {
    const sp = await sanPhamRepository.getById(ma_sp);
    if (!sp) throw httpErrors(404, "Không tìm thấy sản phẩm!");
    return new SanPhamDTO(sp);
  },

  getByDanhMuc: async (ma) => {
    const rows = await sanPhamRepository.getByDanhMuc(ma);
    if (!rows.length) throw httpErrors(404, "Không có sản phẩm!");
    return rows;
  },

  getDaNhapTheoNCC: async (ma) => {
    const rows = await sanPhamRepository.getDaNhapTheoNCC(ma);
    if (!rows.length) throw httpErrors(404, "Không có dữ liệu!");
    return rows;
  },

  getDaBanTheoKH: async (ma) => {
    const rows = await sanPhamRepository.getDaBanTheoKH(ma);
    if (!rows.length) throw httpErrors(404, "Không có dữ liệu!");
    return rows;
  },

  create: async (payload) => {
    if (await sanPhamRepository.existsById(payload.ma_sp))
      throw httpErrors(400, "Sản phẩm đã tồn tại!");

    if (!(await sanPhamRepository.checkDanhMuc(payload.ma_danh_muc)))
      throw httpErrors(400, "Danh mục không tồn tại!");

    if (!(await sanPhamRepository.checkNCC(payload.ma_ncc)))
      throw httpErrors(400, "Nhà cung cấp không tồn tại!");

    await sanPhamRepository.create(payload);
  },

    update: async (payload) => {
    const { ma_sp, ...data } = payload;

    // 1. Kiểm tra sản phẩm tồn tại
    const sp = await sanPhamRepository.getById(ma_sp);
    if (!sp) throw httpErrors(404, "Sản phẩm không tồn tại!");

    // 2. Kiểm tra danh mục nếu có sửa
    if (data.ma_danh_muc !== undefined) {
      const ok = await sanPhamRepository.checkDanhMuc(data.ma_danh_muc);
      if (!ok) throw httpErrors(400, "Danh mục không tồn tại!");
    }

    // 3. Kiểm tra NCC nếu có sửa
    if (data.ma_ncc !== undefined) {
      const ok = await sanPhamRepository.checkNCC(data.ma_ncc);
      if (!ok) throw httpErrors(400, "Nhà cung cấp không tồn tại!");
    }

    // 4. KIỂM TRA GIÁ (QUAN TRỌNG)
    const giaNhapMoi =
      data.gia_nhap !== undefined ? data.gia_nhap : sp.gia_nhap;

    const giaBanMoi =
      data.gia_ban !== undefined ? data.gia_ban : sp.gia_ban;

    if (giaBanMoi <= giaNhapMoi) {
      throw httpErrors(
        400,
        "Giá bán phải lớn hơn giá nhập!"
      );
    }

    // 5. Update
    const affected = await sanPhamRepository.update({
      ma_sp,
      ...data,
    });

    if (affected === 0)
      throw httpErrors(400, "Không có dữ liệu nào được cập nhật!");
  },
};
