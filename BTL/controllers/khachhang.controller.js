import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";
import httpErrors from "http-errors";

const layTatCaKhachHang = async (req, res, next) => {
    let ketNoi;
    try {
        logger.info("Controller: Đang lấy danh sách tất cả khách hàng...");
        ketNoi = await pool.getConnection();

        const sql = "SELECT * FROM KhachHang;";
        const [dsKH] = await ketNoi.execute(sql);

        res.json(dsKH);

    } catch (err) {
        logger.error("Lỗi Controller: Không lấy được danh sách khách hàng", err);
        next(httpErrors(500, "Lỗi lấy danh sách khách hàng: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

const layKhachHangTheoMa = async (req, res, next) => {
    let ketNoi;
    try {
        const { ma_kh } = req.params;

        logger.info(`Lấy khách hàng có mã: ${ma_kh}`);
        ketNoi = await pool.getConnection();

        const [rows] = await ketNoi.execute(
            "SELECT * FROM KhachHang WHERE ma_kh = ?",
            [ma_kh]
        );

        if (rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy khách hàng!"));

        res.json(rows[0]);

    } catch (err) {
        next(httpErrors(500, "Lỗi lấy khách hàng: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};


export const khachHangController = {
    layTatCaKhachHang,
    layKhachHangTheoMa,
};
