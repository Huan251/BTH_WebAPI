    import { pool } from "../config/database.js";
import httpErrors from "http-errors";

// Phân công nhân viên tham gia công trình
const phanCong = async (req, res, next) => {
    let connection;
    try {
        const { MACT, MANV, SLNGAYCONG } = req.body;
        if (!MACT || !MANV || SLNGAYCONG == null) {
            return next(httpErrors(400, "Vui lòng cung cấp MACT, MANV và SLNGAYCONG."));
        }

        connection = await pool.getConnection();
        const query = `
            INSERT INTO Cong (MACT, MANV, SLNGAYCONG)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE SLNGAYCONG = ?;
        `;
        await connection.execute(query, [MACT, MANV, SLNGAYCONG, SLNGAYCONG]);
        res.json({ message: "Phân công thành công." });
    } catch (error) {
        next(httpErrors(500, `Lỗi khi phân công: ${error.message}`));
    } finally {
        if (connection) connection.release();
    }
};

// Thống kê tổng số ngày công của một nhân viên
const thongKeNgayCong = async (req, res, next) => {
    let connection;
    try {
        const { manv } = req.params;
        connection = await pool.getConnection();
        const query = `
            SELECT SUM(SLNGAYCONG) AS TongNgayCong
            FROM Cong
            WHERE MANV = ?;
        `;
        const [rows] = await connection.execute(query, [manv]);
        res.json(rows[0] || { TongNgayCong: 0 });
    } catch (error) {
        next(httpErrors(500, `Lỗi khi thống kê ngày công: ${error.message}`));
    } finally {
        if (connection) connection.release();
    }
};

export const congController = {
    phanCong,
    thongKeNgayCong,
};
