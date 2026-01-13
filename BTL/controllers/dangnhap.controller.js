// controllers/dangnhap.controller.js
import { pool } from "../config/database.js";

export const dangnhapController = {
    dangNhap: async (req, res) => {
        const { email, mat_khau } = req.body;

        try {
            const [rows] = await pool.query(
                "SELECT id, email, role FROM TaiKhoan WHERE email = ? AND mat_khau = ?",
                [email, mat_khau]
            );

            if (rows.length === 0) {
                return res.json({
                    success: false,
                    message: "Sai email hoặc mật khẩu"
                });
            }

            return res.json({
                success: true,
                data: rows[0]
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server"
            });
        }
    }
};
