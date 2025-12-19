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

// Thêm chi tiết hóa đơn
const themChiTietHoaDon = async (req, res, next) => {
    let con;
    try {
        const { ma_cthd, ma_hd, ma_sp, so_luong, don_gia_ban } = req.body;

        // ===== Kiểm tra rỗng =====
        if (!ma_cthd || !ma_hd || !ma_sp || !so_luong || !don_gia_ban)
            return next(httpErrors(400, "Thiếu thông tin chi tiết hóa đơn!"));

        // ===== Kiểm tra kiểu dữ liệu =====
        if (isNaN(ma_cthd) || ma_cthd <= 0)
            return next(httpErrors(400, "Mã CTHD phải là số nguyên dương!"));

        if (isNaN(ma_hd))
            return next(httpErrors(400, "Mã hóa đơn phải là số!"));

        if (isNaN(ma_sp))
            return next(httpErrors(400, "Mã sản phẩm phải là số!"));

        if (!Number.isInteger(so_luong) || so_luong <= 0)
            return next(httpErrors(400, "Số lượng phải là số nguyên > 0!"));

        if (isNaN(don_gia_ban) || don_gia_ban <= 0)
            return next(httpErrors(400, "Đơn giá phải là số > 0!"));

        con = await pool.getConnection();

        // ===== Kiểm tra trùng mã CTHD =====
        const [check] = await con.query("SELECT ma_cthd FROM ChiTiet_HoaDon WHERE ma_cthd=?", [ma_cthd]);
        if (check.length > 0)
            return next(httpErrors(400, "Chi tiết hóa đơn đã tồn tại!"));

        // ===== Kiểm tra hóa đơn tồn tại =====
        const [hd] = await con.query("SELECT ma_hd FROM HoaDon WHERE ma_hd=?", [ma_hd]);
        if (hd.length === 0)
            return next(httpErrors(400, "Hóa đơn không tồn tại!"));

        // ===== Kiểm tra sản phẩm tồn tại =====
        const [sp] = await con.query("SELECT ma_sp FROM SanPham WHERE ma_sp=?", [ma_sp]);
        if (sp.length === 0)
            return next(httpErrors(400, "Sản phẩm không tồn tại!"));

        // ===== Thêm chi tiết hoá đơn =====
        await con.query(
            "INSERT INTO ChiTiet_HoaDon(ma_cthd, ma_hd, ma_sp, so_luong, don_gia_ban) VALUES (?,?,?,?,?)",
            [ma_cthd, ma_hd, ma_sp, so_luong, don_gia_ban]
        );

        res.json({ message: "Thêm chi tiết hóa đơn thành công!" });

    } catch (err) {
        next(httpErrors(500, err.message));
    } finally {
        if (con) con.release();
    }
};

const suaChiTietHoaDon = async (req, res, next) => {
    let ketNoi;
    try {
        const { ma_cthd } = req.params;
        const { ma_hd, ma_sp, so_luong, don_gia_ban } = req.body;

        // ===== Kiểm tra mã chi tiết hóa đơn =====
        if (isNaN(ma_cthd))
            return next(httpErrors(400, "Mã chi tiết hóa đơn không hợp lệ!"));

        // ===== Kiểm tra dữ liệu gửi lên =====
        if (!ma_hd || !ma_sp || !so_luong || !don_gia_ban)
            return next(httpErrors(400, "Thiếu dữ liệu cần cập nhật!"));

        if (isNaN(ma_hd))
            return next(httpErrors(400, "Mã hóa đơn phải là số!"));

        if (isNaN(ma_sp))
            return next(httpErrors(400, "Mã sản phẩm phải là số!"));

        if (!Number.isInteger(so_luong) || so_luong <= 0)
            return next(httpErrors(400, "Số lượng phải là số nguyên lớn hơn 0!"));

        if (isNaN(don_gia_ban) || don_gia_ban <= 0)
            return next(httpErrors(400, "Đơn giá bán phải lớn hơn 0!"));

        ketNoi = await pool.getConnection();

        // ===== Kiểm tra chi tiết hóa đơn tồn tại =====
        const [cthd] = await ketNoi.query(
            "SELECT ma_cthd FROM ChiTiet_HoaDon WHERE ma_cthd = ?",
            [ma_cthd]
        );
        if (cthd.length === 0)
            return next(httpErrors(404, "Chi tiết hóa đơn không tồn tại!"));

        // ===== Kiểm tra hóa đơn tồn tại =====
        const [hd] = await ketNoi.query(
            "SELECT ma_hd FROM HoaDon WHERE ma_hd = ?",
            [ma_hd]
        );
        if (hd.length === 0)
            return next(httpErrors(400, "Hóa đơn không tồn tại!"));

        // ===== Kiểm tra sản phẩm tồn tại =====
        const [sp] = await ketNoi.query(
            "SELECT ma_sp FROM SanPham WHERE ma_sp = ?",
            [ma_sp]
        );
        if (sp.length === 0)
            return next(httpErrors(400, "Sản phẩm không tồn tại!"));

        // ===== Cập nhật chi tiết hóa đơn =====
        await ketNoi.query(
            `
            UPDATE ChiTiet_HoaDon
            SET ma_hd = ?, ma_sp = ?, so_luong = ?, don_gia_ban = ?
            WHERE ma_cthd = ?
            `,
            [ma_hd, ma_sp, so_luong, don_gia_ban, ma_cthd]
        );

        res.json({
            message: "Cập nhật chi tiết hóa đơn thành công!"
        });

    } catch (err) {
        next(httpErrors(500, "Lỗi cập nhật chi tiết hóa đơn: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

export const chiTietHDController = {
    layTatCaCTHoaDon,
    layCTHDTheoMa,
    themChiTietHoaDon,
    suaChiTietHoaDon,
};
