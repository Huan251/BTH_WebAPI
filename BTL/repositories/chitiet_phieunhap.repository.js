import { pool } from "../config/database.js";

export const chiTietPhieuNhapRepository = {
getAll: async () => {
  const db = await pool;
  const [rows] = await db.query(`
    SELECT
      ctpn.ma_ctpn,
      ctpn.ma_phieu_nhap,
      ctpn.ma_sp,
      sp.ten_sp,
      ctpn.so_luong,
      ctpn.don_gia_nhap
    FROM ChiTiet_PhieuNhap ctpn
    JOIN SanPham sp ON ctpn.ma_sp = sp.ma_sp
  `);
  return rows;
},


  getById: async (ma_ctpn) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT * FROM ChiTiet_PhieuNhap WHERE ma_ctpn = ?",
      [ma_ctpn]
    );
    return rows[0];
  },

  existsById: async (ma_ctpn) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT ma_ctpn FROM ChiTiet_PhieuNhap WHERE ma_ctpn = ?",
      [ma_ctpn]
    );
    return rows.length > 0;
  },

  existsPhieuNhap: async (ma_phieu_nhap) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT ma_phieu_nhap FROM PhieuNhap WHERE ma_phieu_nhap = ?",
      [ma_phieu_nhap]
    );
    return rows.length > 0;
  },

  existsSanPham: async (ma_sp) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT ma_sp FROM SanPham WHERE ma_sp = ?",
      [ma_sp]
    );
    return rows.length > 0;
  },

  create: async ({
    ma_ctpn,
    ma_phieu_nhap,
    ma_sp,
    so_luong,
    don_gia_nhap,
  }) => {
    const db = await pool;
    await db.query(
      `INSERT INTO ChiTiet_PhieuNhap
       (ma_ctpn, ma_phieu_nhap, ma_sp, so_luong, don_gia_nhap)
       VALUES (?,?,?,?,?)`,
      [ma_ctpn, ma_phieu_nhap, ma_sp, so_luong, don_gia_nhap]
    );
  },

  update: async ({ ma_phieu_nhap, ...fields }) => {
  const keys = Object.keys(fields);
  if (keys.length === 0) return 0;

  const setClause = keys.map(k => `${k} = ?`).join(", ");
  const values = keys.map(k => fields[k]);

  const con = await pool.getConnection();
  try {
    const [result] = await con.execute(
      `UPDATE PhieuNhap SET ${setClause} WHERE ma_phieu_nhap = ?`,
      [...values, ma_phieu_nhap]
    );
    return result.affectedRows;
  } finally {
    con.release();
  }
},

};
