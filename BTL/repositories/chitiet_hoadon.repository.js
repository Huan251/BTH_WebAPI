import { pool } from "../config/database.js";

export const chiTietHoaDonRepository = {
  getAll: async () => {
    const db = await pool;
    const [rows] = await db.query("SELECT * FROM ChiTiet_HoaDon");
    return rows;
  },

  getById: async (ma_cthd) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT * FROM ChiTiet_HoaDon WHERE ma_cthd = ?",
      [ma_cthd]
    );
    return rows[0];
  },

  existsById: async (ma_cthd) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT ma_cthd FROM ChiTiet_HoaDon WHERE ma_cthd = ?",
      [ma_cthd]
    );
    return rows.length > 0;
  },

  existsHoaDon: async (ma_hd) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT ma_hd FROM HoaDon WHERE ma_hd = ?",
      [ma_hd]
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

  create: async ({ ma_cthd, ma_hd, ma_sp, so_luong, don_gia_ban }) => {
    const db = await pool;
    await db.query(
      `INSERT INTO ChiTiet_HoaDon
       (ma_cthd, ma_hd, ma_sp, so_luong, don_gia_ban)
       VALUES (?,?,?,?,?)`,
      [ma_cthd, ma_hd, ma_sp, so_luong, don_gia_ban]
    );
  },

    update: async (payload) => {
    const { ma_cthd, ...fields } = payload;

    const keys = Object.keys(fields);
    if (keys.length === 0) return 0;

    const setClause = keys.map(k => `${k} = ?`).join(", ");
    const values = keys.map(k => fields[k]);

    const con = await pool.getConnection();
    try {
      const [result] = await con.execute(
        `UPDATE ChiTiet_HoaDon SET ${setClause} WHERE ma_cthd = ?`,
        [...values, ma_cthd]
      );
      return result.affectedRows;
    } finally {
      con.release();
    }
  },
};
