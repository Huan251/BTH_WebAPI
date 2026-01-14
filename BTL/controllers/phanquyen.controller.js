// controllers/phanquyen.controller.js
import { pool } from "../config/database.js";

export const phanQuyenController = {

  /* ========= ADMIN (role 1) ========= */

  adminById: async (req, res) => {
    const idParam = Number(req.params.id);

    // admin chỉ xem CHÍNH MÌNH
    if (req.user.id !== idParam) {
      return res.status(403).json({
        message: "Admin không được xem admin khác"
      });
    }

    const [rows] = await pool.query(
      "SELECT id, email, role FROM TaiKhoan WHERE id = ? AND role = 1",
      [idParam]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Admin không tồn tại" });
    }

    res.json(rows[0]);
  },

  /* ========= NHÂN VIÊN (role 2) ========= */

  nhanvienById: async (req, res) => {
    const idParam = Number(req.params.id);

    // admin xem được mọi nhân viên
    // nhân viên chỉ xem chính mình
    if (req.user.role !== 1 && req.user.id !== idParam) {
      return res.status(403).json({
        message: "Không có quyền xem nhân viên này"
      });
    }

    const [rows] = await pool.query(
      "SELECT id, email, role FROM TaiKhoan WHERE id = ? AND role = 2",
      [idParam]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Nhân viên không tồn tại" });
    }

    res.json(rows[0]);
  },

  /* ========= KHÁCH HÀNG (role 3) ========= */

  khachhangById: async (req, res) => {
    const idParam = Number(req.params.id);

    // admin xem mọi khách hàng
    // nhân viên xem mọi khách hàng
    // khách hàng chỉ xem chính mình
    if (
      req.user.role === 3 && req.user.id !== idParam
    ) {
      return res.status(403).json({
        message: "Không có quyền xem khách hàng này"
      });
    }

    const [rows] = await pool.query(
      "SELECT id, email, role FROM TaiKhoan WHERE id = ? AND role = 3",
      [idParam]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Khách hàng không tồn tại" });
    }

    res.json(rows[0]);
  },

  /* ========= DANH SÁCH ========= */

  // ADMIN xem tất cả nhân viên
  nhanvienList: async (req, res) => {
    const [rows] = await pool.query(
      "SELECT id, email, role FROM TaiKhoan WHERE role = 2"
    );
    res.json(rows);
  },

  // ADMIN + NHÂN VIÊN xem tất cả khách hàng
  khachhangList: async (req, res) => {
    const [rows] = await pool.query(
      "SELECT id, email, role FROM TaiKhoan WHERE role = 3"
    );
    res.json(rows);
  }
};
