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

// Thêm nhà cung cấp
const themNhaCungCap = async (req, res, next) => {
    let con;
    try {
        const { ma_ncc, ten_ncc, dien_thoai, dia_chi, email } = req.body;
        // ===== Kiểm tra rỗng =====
        if (!ma_ncc || !ten_ncc || !dien_thoai || !dia_chi || !email)
            return next(httpErrors(400, "Thiếu thông tin nhà cung cấp!"));

        // ===== Kiểm tra kiểu dữ liệu =====
        if (isNaN(ma_ncc) || ma_ncc <= 0)
            return next(httpErrors(400, "Mã NCC phải là số nguyên dương!"));

        if (typeof ten_ncc !== "string" || ten_ncc.trim() === "")
            return next(httpErrors(400, "Tên NCC không hợp lệ!"));

        con = await pool.getConnection();

        // ===== Kiểm tra trùng khóa chính =====
        const [check] = await con.query(
            "SELECT ma_ncc FROM NhaCungCap WHERE ma_ncc = ?",
            [ma_ncc]
        );
        if (check.length > 0)
            return next(httpErrors(400, "Mã NCC đã tồn tại!"));

        // ===== Insert =====
        await con.query(
            `INSERT INTO NhaCungCap(ma_ncc, ten_ncc, dien_thoai, dia_chi, email)
             VALUES (?,?,?,?,?)`,
            [ma_ncc, ten_ncc, dien_thoai, dia_chi, email]
        );

        res.json({ message: "Thêm nhà cung cấp thành công!" });

    } catch (err) {
        next(httpErrors(500, err.message));
    } finally {
        if (con) con.release();
    }
};

const suaNhaCungCap = async (req, res, next) => {
    let con;
    try {
        const { ma_ncc } = req.params;
        const { ten_ncc, dia_chi, dien_thoai } = req.body;

        if (isNaN(ma_ncc))
            return next(httpErrors(400, "Mã nhà cung cấp không hợp lệ!"));

        if (!ten_ncc)
            return next(httpErrors(400, "Tên nhà cung cấp không được để trống!"));

        con = await pool.getConnection();

        const [ncc] = await con.query(
            "SELECT ma_ncc FROM NhaCungCap WHERE ma_ncc = ?",
            [ma_ncc]
        );
        if (ncc.length === 0)
            return next(httpErrors(404, "Nhà cung cấp không tồn tại!"));

        await con.query(
            "UPDATE NhaCungCap SET ten_ncc=?, dia_chi=?, dien_thoai=? WHERE ma_ncc=?",
            [ten_ncc, dia_chi || null, dien_thoai || null, ma_ncc]
        );

        res.json({ message: "Cập nhật nhà cung cấp thành công!" });
    } catch (err) {
        next(httpErrors(500, err.message));
    } finally {
        if (con) con.release();
    }
};


export const nhaCungCapController = {
    layTatCaNhaCungCap,
    layNCCTheoMa,
    themNhaCungCap,
    suaNhaCungCap,
};
