import { pool } from "../config/database.js";

const tonKhoRepository = {
getAll: async () => {
  const [rows] = await pool.query(`
    SELECT
      sp.ma_sp,
      sp.ten_sp,
      sp.gia_nhap,
      sp.gia_ban,
      COALESCE(nhap.sl_nhap, 0) - COALESCE(ban.sl_ban, 0) AS ton_kho
    FROM SanPham sp
    LEFT JOIN (
      SELECT ma_sp, SUM(so_luong) AS sl_nhap
      FROM ChiTiet_PhieuNhap
      GROUP BY ma_sp
    ) nhap ON sp.ma_sp = nhap.ma_sp
    LEFT JOIN (
      SELECT ma_sp, SUM(so_luong) AS sl_ban
      FROM ChiTiet_HoaDon
      GROUP BY ma_sp
    ) ban ON sp.ma_sp = ban.ma_sp
  `);
  return rows;
},


  getTonKhoBySanPham: async (ma_sp) => {
  const [rows] = await pool.query(
    `
    SELECT
      COALESCE(nhap.sl_nhap, 0) - COALESCE(ban.sl_ban, 0) AS ton_kho
    FROM SanPham sp
    LEFT JOIN (
      SELECT ma_sp, SUM(so_luong) AS sl_nhap
      FROM ChiTiet_PhieuNhap
      GROUP BY ma_sp
    ) nhap ON sp.ma_sp = nhap.ma_sp
    LEFT JOIN (
      SELECT ma_sp, SUM(so_luong) AS sl_ban
      FROM ChiTiet_HoaDon
      GROUP BY ma_sp
    ) ban ON sp.ma_sp = ban.ma_sp
    WHERE sp.ma_sp = ?
    `,
    [ma_sp]
  );

  return Number(rows[0]?.ton_kho ?? 0);
}

};

export default tonKhoRepository;
    