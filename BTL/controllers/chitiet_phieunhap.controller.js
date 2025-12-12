import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";
import httpErrors from "http-errors";

const layTatCaCTPhieuNhap = async (req, res, next) => {
    let ketNoi;
    try {
        logger.info("Controller: Đang lấy danh sách tất cả chi tiết phiếu nhập...");
        ketNoi = await pool.getConnection();

        const sql = "SELECT * FROM ChiTiet_PhieuNhap;";
        const [dsCTPN] = await ketNoi.execute(sql);

        res.json(dsCTPN);

    } catch (err) {
        logger.error("Lỗi Controller: Không lấy được danh sách chi tiết phiếu nhập", err);
        next(httpErrors(500, "Lỗi lấy danh sách chi tiết phiếu nhập: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

const layCTPNTheoMa = async (req, res, next) => {
    let ketNoi;
    try {
        const { ma_ctpn } = req.params;

        logger.info(`Lấy CTPN có mã: ${ma_ctpn}`);
        ketNoi = await pool.getConnection();

        const [rows] = await ketNoi.execute(
            "SELECT * FROM ChiTiet_PhieuNhap WHERE ma_ctpn = ?",
            [ma_ctpn]
        );

        if (rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy chi tiết phiếu nhập!"));

        res.json(rows[0]);

    } catch (err) {
        next(httpErrors(500, "Lỗi lấy CTPN: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};


export const chiTietPNController = {
    layTatCaCTPhieuNhap,
    layCTPNTheoMa,
};
