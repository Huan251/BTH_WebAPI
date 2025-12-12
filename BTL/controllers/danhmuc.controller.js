import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";
import httpErrors from "http-errors";

// Lấy tất cả danh mục 
const layTatCaDanhMuc = async (req, res, next) => {
    let ketNoi;
    try {
        logger.info("Controller: Đang lấy danh sách tất cả danh mục...");
        ketNoi = await pool.getConnection();

        const [rows] = await ketNoi.execute("SELECT * FROM DanhMuc;");
        res.json(rows);

    } catch (err) {
        logger.error("Lỗi lấy danh sách danh mục", err);
        next(httpErrors(500, "Lỗi lấy danh sách danh mục: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

// Lấy danh mục theo mã danh mục
const layDanhMucTheoMa = async (req, res, next) => {
    let ketNoi;
    try {
        const { maDanhMuc } = req.params;

        logger.info(`Controller: Đang lấy danh mục theo mã: ${maDanhMuc}`);

        ketNoi = await pool.getConnection();

        const sql = "SELECT * FROM DanhMuc WHERE ma_danh_muc = ?";
        const [rows] = await ketNoi.execute(sql, [maDanhMuc]);

        if (rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy danh mục!"));

        res.json(rows[0]);

    } catch (err) {
        logger.error("Lỗi lấy danh mục theo mã", err);
        next(httpErrors(500, "Lỗi lấy danh mục: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

export const danhMucController = {
    layTatCaDanhMuc,
    layDanhMucTheoMa
};
