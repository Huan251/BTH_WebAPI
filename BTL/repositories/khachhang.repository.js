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
  existsInHoaDon: async (ma_kh) => {
  const con = await pool.getConnection();
  try {
    const [rows] = await con.execute(
      "SELECT 1 FROM HoaDon WHERE ma_kh = ? LIMIT 1",
      [ma_kh]
    );
    return rows.length > 0;
  } finally {
    con.release();
  }
},

deleteById: async (ma_kh) => {
  const con = await pool.getConnection();
  try {
    const [result] = await con.execute(
      "DELETE FROM KhachHang WHERE ma_kh = ?",
      [ma_kh]
    );
    return result.affectedRows;
  } finally {
    con.release();
  }
},

};
