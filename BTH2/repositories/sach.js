import { pool } from "../services/mysql.js";

export const SachRepository = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM Sach");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM Sach WHERE MASH = ?",
      [id]
    );
    return rows[0] || null;
  },

  create: async ({ TENSACH, TACGIA, NHAXB, NAMXB }) => {
    const [result] = await pool.query(
      "INSERT INTO Sach (TENSACH, TACGIA, NHAXB, NAMXB) VALUES (?, ?, ?, ?)",
      [TENSACH, TACGIA, NHAXB, NAMXB]
    );
    return result.insertId;
  },

  update: async (id, { TENSACH, TACGIA, NHAXB, NAMXB }) => {
    const [result] = await pool.query(
      "UPDATE Sach SET TENSACH=?, TACGIA=?, NHAXB=?, NAMXB=? WHERE MASH=?",
      [TENSACH, TACGIA, NHAXB, NAMXB, id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await pool.query(
      "DELETE FROM Sach WHERE MASH=?",
      [id]
    );
    return result.affectedRows;
  },

  // Tìm theo tên sách chứa chuỗi
  searchTenSach: async (name) => {
    const [rows] = await pool.query(
      "SELECT * FROM Sach WHERE TENSACH LIKE ?",
      [`%${name}%`]
    );
    return rows;
  },

  // Tìm theo tác giả
  searchTacGia: async (author) => {
    const [rows] = await pool.query(
      "SELECT * FROM Sach WHERE TACGIA LIKE ?",
      [`%${author}%`]
    );
    return rows;
  },

  // Tìm theo NXB
  searchNXB: async (nxb) => {
    const [rows] = await pool.query(
      "SELECT * FROM Sach WHERE NHAXB LIKE ?",
      [`%${nxb}%`]
    );
    return rows;
  },

  // Tìm sách mới 5 năm gần nhất
  searchSachMoi: async () => {
    const year = new Date().getFullYear();
    const [rows] = await pool.query(
      "SELECT * FROM Sach WHERE NAMXB >= ?",
      [year - 5]
    );
    return rows;
  },
};
