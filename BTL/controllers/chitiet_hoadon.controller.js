import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";
import httpErrors from "http-errors";

const layTatCaCTHoaDon = async (req, res, next) => {
    let ketNoi;
    try {
        logger.info("Controller: Đang lấy danh sách tất cả chi tiết hóa đơn...");
        ketNoi = await pool.getConnection();

        const sql = "SELECT * FROM ChiTiet_HoaDon;";
        const [dsCTHD] = await ketNoi.execute(sql);

        res.json(dsCTHD);

    } catch (err) {
        logger.error("Lỗi Controller: Không lấy được danh sách chi tiết hóa đơn", err);
        next(httpErrors(500, "Lỗi lấy danh sách chi tiết hóa đơn: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

const layCTHDTheoMa = async (req, res, next) => {
    let ketNoi;
    try {
        const { ma_cthd } = req.params;

        logger.info(`Lấy CTHD có mã: ${ma_cthd}`);
        ketNoi = await pool.getConnection();

        const [rows] = await ketNoi.execute(
            "SELECT * FROM ChiTiet_HoaDon WHERE ma_cthd = ?",
            [ma_cthd]
        );

        if (rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy chi tiết hóa đơn!"));

        res.json(rows[0]);

    } catch (err) {
        next(httpErrors(500, "Lỗi lấy CTHD: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};


export const chiTietHDController = {
    layTatCaCTHoaDon,
    layCTHDTheoMa,
};
