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

// Thêm khách hàng
const themKhachHang = async (req, res, next) => {
    let con;
    try {
        const { ma_kh, ten_kh, dien_thoai, dia_chi } = req.body;

        if (!ma_kh || !ten_kh)
            return next(httpErrors(400, "Thiếu thông tin khách hàng!"));

        if (isNaN(ma_kh) || ma_kh <= 0)
            return next(httpErrors(400, "Mã KH phải là số nguyên dương!"));

        if (typeof ten_kh !== "string" || ten_kh.trim() === "")
            return next(httpErrors(400, "Tên khách hàng phải là chuỗi!"));

        con = await pool.getConnection();

        const [check] = await con.query("SELECT ma_kh FROM KhachHang WHERE ma_kh=?", [ma_kh]);
        if (check.length > 0)
            return next(httpErrors(400, "Mã khách hàng đã tồn tại!"));

        await con.query(
            "INSERT INTO KhachHang(ma_kh, ten_kh, dia_chi, dien_thoai) VALUES (?,?,?,?)",
            [ma_kh, ten_kh, dia_chi || null, dien_thoai || null]
        );

        res.json({ message: "Thêm khách hàng thành công!" });

    } catch (err) {
        next(httpErrors(500, err.message));
    } finally {
        if (con) con.release();
    }
};



export const khachHangController = {
    layTatCaKhachHang,
    layKhachHangTheoMa,
    themKhachHang,
};
