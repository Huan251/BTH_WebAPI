import { pool } from "../services/mysql.js";

const AGE_THRESHOLD = 20;

export const SinhVienRepository = {
    // --- CRUD CƠ BẢN ---
    getAll: async () => {
        const [rows] = await pool.query("SELECT MaSV, TenSV, GioiTinh, DiaChi, DATE_FORMAT(NgaySinh, '%Y-%m-%d') as NgaySinh FROM SINHVIEN");
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query(
            "SELECT MaSV, TenSV, GioiTinh, DiaChi, DATE_FORMAT(NgaySinh, '%Y-%m-%d') as NgaySinh FROM SINHVIEN WHERE MaSV = ?",
            [id]
        );
        return rows[0] || null;
    },

    create: async ({ MaSV, TenSV, GioiTinh, DiaChi, NgaySinh }) => {
        const [result] = await pool.query(
            "INSERT INTO SINHVIEN (MaSV, TenSV, GioiTinh, DiaChi, NgaySinh) VALUES (?, ?, ?, ?, ?)",
            [MaSV, TenSV, GioiTinh, DiaChi, NgaySinh]
        );
        // Trả về số lượng hàng bị ảnh hưởng, hoặc MaSV đã tạo
        return result.affectedRows > 0 ? MaSV : null;
    },

    update: async (id, { TenSV, GioiTinh, DiaChi, NgaySinh }) => {
        const [result] = await pool.query(
            "UPDATE SINHVIEN SET TenSV=?, GioiTinh=?, DiaChi=?, NgaySinh=? WHERE MaSV=?",
            [TenSV, GioiTinh, DiaChi, NgaySinh, id]
        );
        return result.affectedRows;
    },

    delete: async (id) => {
        const [result] = await pool.query(
            "DELETE FROM SINHVIEN WHERE MaSV=?",
            [id]
        );
        return result.affectedRows;
    },


    // 1. Sinh viên có địa chỉ chứa tham số DiaChi (LIKE %...%)
    searchByDiaChi: async (diachi) => {
        const [rows] = await pool.query(
            "SELECT MaSV, TenSV, GioiTinh, DiaChi, DATE_FORMAT(NgaySinh, '%Y-%m-%d') as NgaySinh FROM SINHVIEN WHERE DiaChi LIKE ?",
            [`%${diachi}%`]
        );
        return rows;
    },

    // 2. Sinh viên có tên chứa tham số TenSV (LIKE %...%)
    searchByTenSV: async (tensv) => {
        const [rows] = await pool.query(
            "SELECT MaSV, TenSV, GioiTinh, DiaChi, DATE_FORMAT(NgaySinh, '%Y-%m-%d') as NgaySinh FROM SINHVIEN WHERE TenSV LIKE ?",
            [`%${tensv}%`]
        );
        return rows;
    },

    // 3. Sinh viên trên 20 tuổi (có năm hiện tại - năm sinh >= 20)
    searchOver20: async () => {
        const [rows] = await pool.query(
            "SELECT MaSV, TenSV, GioiTinh, DiaChi, DATE_FORMAT(NgaySinh, '%Y-%m-%d') as NgaySinh FROM SINHVIEN WHERE TIMESTAMPDIFF(YEAR, NgaySinh, CURDATE()) >= ?",
            [AGE_THRESHOLD]
        );
        return rows;
    },
};