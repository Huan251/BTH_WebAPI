import { pool } from "../config/database.js";

const tonKhoRepository = {
  getAll: async () => {
    const [rows] = await pool.query(`
      SELECT
        sp.ma_sp,
        sp.ten_sp,
        ncc.ma_ncc,
        ncc.ten_ncc,

        nhap.sl_nhap,
        COALESCE(ban.sl_ban, 0) AS sl_ban,

        nhap.sl_nhap - COALESCE(ban.sl_ban, 0) AS ton_kho
      FROM (
        SELECT ma_sp, SUM(so_luong) AS sl_nhap
        FROM ChiTiet_PhieuNhap
        GROUP BY ma_sp
      ) nhap
      JOIN SanPham sp ON nhap.ma_sp = sp.ma_sp
      JOIN NhaCungCap ncc ON sp.ma_ncc = ncc.ma_ncc
      LEFT JOIN (
        SELECT ma_sp, SUM(so_luong) AS sl_ban
        FROM ChiTiet_HoaDon
        GROUP BY ma_sp
      ) ban ON sp.ma_sp = ban.ma_sp
      ORDER BY sp.ma_sp
    `);

    return rows;
  },

  getTonKhoBySanPham: async (ma_sp) => {
    const [rows] = await pool.query(`
      SELECT
        nhap.sl_nhap - COALESCE(ban.sl_ban, 0) AS ton_kho
      FROM (
        SELECT ma_sp, SUM(so_luong) AS sl_nhap
        FROM ChiTiet_PhieuNhap
        WHERE ma_sp = ?
        GROUP BY ma_sp
      ) nhap
      LEFT JOIN (
        SELECT ma_sp, SUM(so_luong) AS sl_ban
        FROM ChiTiet_HoaDon
        WHERE ma_sp = ?
        GROUP BY ma_sp
      ) ban ON nhap.ma_sp = ban.ma_sp
    `, [ma_sp, ma_sp]);

    return rows[0];
  }
};

export default tonKhoRepository;
    