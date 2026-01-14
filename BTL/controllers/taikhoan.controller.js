// controllers/taikhoan.controller.js
import { pool } from "../config/database.js";
import jwt from "jsonwebtoken";

export const taiKhoanController = {

    // 🔐 Đăng nhập RIÊNG cho phân quyền TaiKhoan
    dangNhap: async (req, res) => {
        const { email, mat_khau } = req.body;

        try {
            const [rows] = await pool.query(
                "SELECT id, email, role FROM TaiKhoan WHERE email = ? AND mat_khau = ?",
                [email, mat_khau]
            );

            if (rows.length === 0) {
                return res.status(401).json({
                    message: "Sai email hoặc mật khẩu"
                });
            }

            const user = rows[0];

            // Tạo token cho phân quyền
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                "TAIKHOAN_SECRET_KEY",
                { expiresIn: "1h" }
            );

            res.json({ token });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Lỗi server"
            });
        }
    }
};
