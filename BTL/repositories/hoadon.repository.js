import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const hoaDonRepository = {
  getAll: async () => {
  const db = await pool;
  const [rows] = await db.query(`
    SELECT hd.*, kh.ten_kh
    FROM HoaDon hd
    JOIN KhachHang kh ON hd.ma_kh = kh.ma_kh
  `);
  return rows;
},

  getById: async (ma_hd) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT * FROM HoaDon WHERE ma_hd = ?",
      [ma_hd]
    );
    return rows[0];
  },

  getByKhachHang: async (ma_kh) => {
    const db = await pool;
    const [rows] = await db.query(
      `SELECT hd.*, kh.ten_kh
       FROM HoaDon hd
       JOIN KhachHang kh ON hd.ma_kh = kh.ma_kh
       WHERE hd.ma_kh = ?`,
      [ma_kh]
    );
    return rows;
  },

  getByMonthYear: async (thang, nam) => {
    const db = await pool;
    const [rows] = await db.query(
      `SELECT hd.*, kh.ten_kh
       FROM HoaDon hd
       JOIN KhachHang kh ON hd.ma_kh = kh.ma_kh
       WHERE MONTH(hd.ngay_ban)=? AND YEAR(hd.ngay_ban)=?
       ORDER BY hd.ngay_ban ASC`,
      [thang, nam]
    );
    return rows;
  },

  existsById: async (ma_hd) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT ma_hd FROM HoaDon WHERE ma_hd = ?",
      [ma_hd]
    );
    return rows.length > 0;
  },

  create: async ({ ma_hd, ma_kh, ngay_ban, tong_tien }) => {
    const db = await pool;
    await db.query(
      `INSERT INTO HoaDon(ma_hd, ma_kh, ngay_ban, tong_tien)
       VALUES (?,?,?,?)`,
      [ma_hd, ma_kh, ngay_ban, tong_tien]
    );
  },

  getChiTietByMaHD: async (ma_hd) => {
    const db = await pool;
    const [rows] = await db.query(
      `SELECT 
        cthd.ma_cthd, cthd.ma_sp, sp.ten_sp,
        cthd.so_luong, cthd.don_gia_ban,
        (cthd.so_luong * cthd.don_gia_ban) AS thanh_tien
       FROM ChiTiet_HoaDon cthd
       JOIN SanPham sp ON cthd.ma_sp = sp.ma_sp
       WHERE cthd.ma_hd = ?`,
      [ma_hd]
    );
    return rows;
  },

  getLichSuMuaHangTheoKH: async (ma_kh) => {
  const [rows] = await pool.query(
    `
    SELECT
      sp.ma_sp      AS MaSanPham,
      sp.ten_sp     AS TenSanPham,
      cthd.so_luong AS SoLuong,
      DATE_FORMAT(hd.ngay_ban, '%d/%m/%Y') AS NgayBan
    FROM HoaDon hd
    JOIN ChiTiet_HoaDon cthd ON hd.ma_hd = cthd.ma_hd
    JOIN SanPham sp ON cthd.ma_sp = sp.ma_sp
    WHERE hd.ma_kh = ?
    ORDER BY hd.ngay_ban DESC
    `,
    [ma_kh]
  );

  return rows;
},



  updateTongTienByMaHD: async (ma_hd) => {
  const db = await pool;

  const [rows] = await db.query(
    `
    SELECT SUM(so_luong * don_gia_ban) AS tong
    FROM ChiTiet_HoaDon
    WHERE ma_hd = ?
    `,
    [ma_hd]
  );

  const tongTien = rows[0].tong || 0;

  await db.query(
    `UPDATE HoaDon SET tong_tien = ? WHERE ma_hd = ?`,
    [tongTien, ma_hd]
  );

  return tongTien;
},

};
