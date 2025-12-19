// repositories/danhmuc.repository.js
import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const danhMucRepository = {
  getAll: async () => {
    logger.info("Repository: Lấy tất cả danh mục");
    const con = await pool.getConnection();
    try {
      const [rows] = await con.execute("SELECT * FROM DanhMuc;");
      return rows;
    } finally {
      con.release();
    }
  },

  getById: async (maDanhMuc) => {
    const con = await pool.getConnection();
    try {
      const [rows] = await con.execute(
        "SELECT * FROM DanhMuc WHERE ma_danh_muc = ?",
        [maDanhMuc]
      );
      return rows[0];
    } finally {
      con.release();
    }
  },

  existsById: async (maDanhMuc) => {
    const con = await pool.getConnection();
    try {
      const [rows] = await con.execute(
        "SELECT ma_danh_muc FROM DanhMuc WHERE ma_danh_muc = ?",
        [maDanhMuc]
      );
      return rows.length > 0;
    } finally {
      con.release();
    }
  },

  create: async ({ ma_danh_muc, ten_danh_muc, mo_ta }) => {
    const con = await pool.getConnection();
    try {
      await con.execute(
        "INSERT INTO DanhMuc(ma_danh_muc, ten_danh_muc, mo_ta) VALUES (?,?,?)",
        [ma_danh_muc, ten_danh_muc, mo_ta]
      );
    } finally {
      con.release();
    }
  },

   update: async ({ ma_danh_muc, ten_danh_muc, mo_ta }) => {
    const fields = [];
    const values = [];

    if (ten_danh_muc !== undefined) {
      fields.push("ten_danh_muc = ?");
      values.push(ten_danh_muc);
    }

    if (mo_ta !== undefined) {
      fields.push("mo_ta = ?");
      values.push(mo_ta);
    }

    const sql = `
      UPDATE DanhMuc
      SET ${fields.join(", ")}
      WHERE ma_danh_muc = ?
    `;

    values.push(ma_danh_muc);

    const [result] = await pool.query(sql, values);
    return result.affectedRows;
  },
};
