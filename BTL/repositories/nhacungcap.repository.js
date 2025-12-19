import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const nhaCungCapRepository = {
  getAll: async () => {
    logger.info("Repository: Fetch all NhaCungCap");
    const db = await pool;
    const [rows] = await db.query("SELECT * FROM NhaCungCap");
    return rows;
  },

  getById: async (ma_ncc) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT * FROM NhaCungCap WHERE ma_ncc = ?",
      [ma_ncc]
    );
    return rows[0];
  },

  existsById: async (ma_ncc) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT ma_ncc FROM NhaCungCap WHERE ma_ncc = ?",
      [ma_ncc]
    );
    return rows.length > 0;
  },

  create: async ({ ma_ncc, ten_ncc, dien_thoai, dia_chi, email }) => {
    const db = await pool;
    await db.query(
      `INSERT INTO NhaCungCap(ma_ncc, ten_ncc, dien_thoai, dia_chi, email)
       VALUES (?,?,?,?,?)`,
      [ma_ncc, ten_ncc, dien_thoai, dia_chi, email]
    );
  },

   update: async ({ ma_ncc, ten_ncc, dia_chi, dien_thoai, email }) => {
    const fields = [];
    const values = [];

    if (ten_ncc !== undefined) {
      fields.push("ten_ncc = ?");
      values.push(ten_ncc);
    }

    if (dia_chi !== undefined) {
      fields.push("dia_chi = ?");
      values.push(dia_chi);
    }

    if (dien_thoai !== undefined) {
      fields.push("dien_thoai = ?");
      values.push(dien_thoai);
    }

    if (email !== undefined) {
      fields.push("email = ?");
      values.push(email);
    }

    if (fields.length === 0) return 0;

    const sql = `
      UPDATE NhaCungCap
      SET ${fields.join(", ")}
      WHERE ma_ncc = ?
    `;

    values.push(ma_ncc);

    const [result] = await pool.query(sql, values);
    return result.affectedRows;
  },
};
