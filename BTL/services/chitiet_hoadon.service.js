import httpErrors from "http-errors";
import { pool } from "../config/database.js";
import { chiTietHoaDonRepository } from "../repositories/chitiet_hoadon.repository.js";
import { ChiTietHoaDonDTO } from "../dtos/chitiet_hoadons/chitiet_hoadon.dto.js";
import { sanPhamRepository } from "../repositories/sanpham.repository.js";
import tonKhoRepository from "../repositories/tonkho.repository.js";


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
getByMaHoaDon: async (ma_hd) => {
  const [rows] = await pool.query(
    `
    SELECT cthd.*, sp.ten_sp
    FROM ChiTiet_HoaDon cthd
    JOIN SanPham sp ON cthd.ma_sp = sp.ma_sp
    WHERE cthd.ma_hd = ?
    `,
    [ma_hd]
  );

  return rows.map(row => new ChiTietHoaDonDTO(row));
},


 create: async (data) => {
  const { ma_sp, so_luong } = data;

  // 1️⃣ kiểm tra sản phẩm tồn tại
  const sanPham = await sanPhamRepository.getById(ma_sp);
  if (!sanPham) {
    throw httpErrors(400, "Sản phẩm không tồn tại");
  }

  // 2️⃣ lấy tồn kho (đã là NUMBER)
  const tonKho = await tonKhoRepository.getTonKhoBySanPham(ma_sp);

  // 3️⃣ CHẶN BÁN
  if (so_luong > tonKho) {
    throw httpErrors(
      400,
      `Kho không đủ số lượng, còn có ${tonKho}`
    );
  }

  // 4️⃣ insert chi tiết hóa đơn
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
   delete: async (ma_cthd) => {
    const exists = await chiTietHoaDonRepository.existsById(ma_cthd);
    if (!exists) throw httpErrors(404, "Chi tiết hóa đơn không tồn tại");

    await chiTietHoaDonRepository.deleteById(ma_cthd);
  },
};
