import { pool } from "../config/database.js";
import httpErrors from "http-errors";

export const phieuNhapRepository = {
  getAll: async () => {
    const db = await pool;
    const [rows] = await db.query("SELECT * FROM PhieuNhap");
    return rows;
  },

  getById: async (ma_phieu_nhap) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT * FROM PhieuNhap WHERE ma_phieu_nhap = ?",
      [ma_phieu_nhap]
    );
    return rows[0];
  },

  getByNCC: async (ma_ncc) => {
    const db = await pool;
    const [rows] = await db.query(
      `SELECT pn.*, ncc.ten_ncc
       FROM PhieuNhap pn
       JOIN NhaCungCap ncc ON pn.ma_ncc = ncc.ma_ncc
       WHERE pn.ma_ncc = ?`,
      [ma_ncc]
    );
    return rows;
  },

  getByMonthYear: async (thang, nam) => {
    const db = await pool;
    const [rows] = await db.query(
      `SELECT pn.*, ncc.ten_ncc
       FROM PhieuNhap pn
       JOIN NhaCungCap ncc ON pn.ma_ncc = ncc.ma_ncc
       WHERE MONTH(pn.ngay_nhap) = ? AND YEAR(pn.ngay_nhap) = ?
       ORDER BY pn.ngay_nhap ASC`,
      [thang, nam]
    );
    return rows;
  },

  existsById: async (ma_phieu_nhap) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT ma_phieu_nhap FROM PhieuNhap WHERE ma_phieu_nhap = ?",
      [ma_phieu_nhap]
    );
    return rows.length > 0;
  },

  existsNCC: async (ma_ncc) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT ma_ncc FROM NhaCungCap WHERE ma_ncc = ?",
      [ma_ncc]
    );
    return rows.length > 0;
  },

  create: async ({ ma_phieu_nhap, ma_ncc, ngay_nhap }) => {
    const db = await pool;
    await db.query(
      "INSERT INTO PhieuNhap(ma_phieu_nhap, ma_ncc, ngay_nhap) VALUES (?,?,?)",
      [ma_phieu_nhap, ma_ncc, ngay_nhap]
    );
  },

     update: async (payload) => {
    const { ma_phieu_nhap, ma_ncc, ngay_nhap } = payload;

    // Kiểm tra phiếu nhập tồn tại
    const pn = await phieuNhapRepository.getById(ma_phieu_nhap);
    if (!pn) throw httpErrors(404, "Phiếu nhập không tồn tại!");

    // Kiểm tra nhà cung cấp tồn tại nếu có sửa
    if (ma_ncc !== undefined) {
      const exists = await phieuNhapRepository.existsNCC(ma_ncc);
      if (!exists) throw httpErrors(400, "Mã nhà cung cấp không tồn tại");
    }

    // Update phiếu nhập
    const affected = await phieuNhapRepository.update(payload);

    if (affected === 0) {
      throw httpErrors(400, "Không có dữ liệu nào được cập nhật!");
    }
  },
};
