import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";
import httpErrors from "http-errors";

const layTatCaNhaCungCap = async (req, res, next) => {
    let ketNoi;
    try {
        logger.info("Controller: Đang lấy danh sách tất cả nhà cung cấp...");
        ketNoi = await pool.getConnection();

        const sql = "SELECT * FROM NhaCungCap;";
        const [dsNCC] = await ketNoi.execute(sql);

        res.json(dsNCC);

    } catch (err) {
        logger.error("Lỗi Controller: Không lấy được danh sách nhà cung cấp", err);
        next(httpErrors(500, "Lỗi lấy danh sách nhà cung cấp: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

const layNCCTheoMa = async (req, res, next) => {
    let ketNoi;
    try {
        const { ma_ncc } = req.params;

        logger.info(`Lấy nhà cung cấp có mã: ${ma_ncc}`);
        ketNoi = await pool.getConnection();

        const [rows] = await ketNoi.execute(
            "SELECT * FROM NhaCungCap WHERE ma_ncc = ?",
            [ma_ncc]
        );

        if (rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy nhà cung cấp!"));

        res.json(rows[0]);

    } catch (err) {
        next(httpErrors(500, "Lỗi lấy nhà cung cấp: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};


export const nhaCungCapController = {
    layTatCaNhaCungCap,
    layNCCTheoMa,
};
