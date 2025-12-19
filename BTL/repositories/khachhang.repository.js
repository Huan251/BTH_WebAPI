import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const khachHangRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all KhachHang");
    const db = await pool;
    const [rows] = await db.query("SELECT * FROM KhachHang");
    return rows;
  },

  getById: async (ma_kh) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT * FROM KhachHang WHERE ma_kh = ?",
      [ma_kh]
    );
    return rows[0];
  },

  existsById: async (ma_kh) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT ma_kh FROM KhachHang WHERE ma_kh = ?",
      [ma_kh]
    );
    return rows.length > 0;
  },

  create: async ({ ma_kh, ten_kh, dia_chi, dien_thoai }) => {
    const db = await pool;
    await db.query(
      `INSERT INTO KhachHang(ma_kh, ten_kh, dia_chi, dien_thoai)
       VALUES (?,?,?,?)`,
      [ma_kh, ten_kh, dia_chi, dien_thoai]
    );
  },
};
