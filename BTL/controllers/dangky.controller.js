import { pool } from "../config/database.js";

export const dangkyController = {
    dangKy: async (req, res) => {
        const { email, mat_khau, role } = req.body;

        // ===== VALIDATE =====
        if (!email || !mat_khau || !role) {
            return res.json({
                success: false,
                message: "Vui lòng nhập đầy đủ thông tin"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({
                success: false,
                message: "Email không đúng định dạng"
            });
        }

        if (![1, 2, 3].includes(Number(role))) {
            return res.json({
                success: false,
                message: "Vai trò chỉ từ 1 đến 3"
            });
        }

        try {
            // ===== CHECK TRÙNG EMAIL =====
            const [exist] = await pool.query(
                "SELECT id FROM TaiKhoan WHERE email = ?",
                [email]
            );

            if (exist.length > 0) {
                return res.json({
                    success: false,
                    message: "Email đã tồn tại"
                });
            }

            // ===== INSERT =====
            await pool.query(
                "INSERT INTO TaiKhoan (email, mat_khau, role) VALUES (?, ?, ?)",
                [email, mat_khau, role]
            );

            return res.json({
                success: true,
                message: "Đăng ký thành công"
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Lỗi server"
            });
        }
    }
};
