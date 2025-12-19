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

// Thêm chi tiết phiếu nhập
const themChiTietPhieuNhap = async (req, res, next) => {
    let con;
    try {
        let { ma_ctpn, ma_phieu_nhap, ma_sp, so_luong, don_gia_nhap } = req.body;

        // KIỂM TRA THIẾU DỮ LIỆU
        if (!ma_ctpn || !ma_phieu_nhap || !ma_sp || !so_luong || !don_gia_nhap)
            return next(httpErrors(400, "Thiếu thông tin chi tiết phiếu nhập!"));

        // KIỂM TRA KIỂU & GIÁ TRỊ
        if (!Number.isInteger(ma_ctpn) || ma_ctpn <= 0)
            return next(httpErrors(400, "Mã CTPN phải là số nguyên dương!"));

        if (!Number.isInteger(ma_phieu_nhap) || ma_phieu_nhap <= 0)
            return next(httpErrors(400, "Mã phiếu nhập phải là số nguyên dương!"));

        if (!Number.isInteger(ma_sp) || ma_sp <= 0)
            return next(httpErrors(400, "Mã sản phẩm phải là số nguyên dương!"));

        if (!Number.isInteger(so_luong) || so_luong <= 0)
            return next(httpErrors(400, "Số lượng phải là số nguyên > 0!"));

        if (isNaN(don_gia_nhap) || don_gia_nhap <= 0)
            return next(httpErrors(400, "Đơn giá phải là số > 0!"));

        con = await pool.getConnection();

        // KIỂM TRA TRÙNG CTPN
        const [check] = await con.query(
            "SELECT ma_ctpn FROM ChiTiet_PhieuNhap WHERE ma_ctpn=?",
            [ma_ctpn]
        );
        if (check.length > 0)
            return next(httpErrors(400, "Chi tiết phiếu nhập đã tồn tại!"));

        // KIỂM TRA PHIẾU NHẬP
        const [pn] = await con.query(
            "SELECT ma_phieu_nhap FROM PhieuNhap WHERE ma_phieu_nhap=?",
            [ma_phieu_nhap]
        );
        if (pn.length === 0)
            return next(httpErrors(400, "Phiếu nhập không tồn tại!"));

        // KIỂM TRA SẢN PHẨM
        const [sp] = await con.query(
            "SELECT ma_sp FROM SanPham WHERE ma_sp=?",
            [ma_sp]
        );
        if (sp.length === 0)
            return next(httpErrors(400, "Sản phẩm không tồn tại!"));

        // INSERT ĐÚNG CỘT
        await con.query(
            `INSERT INTO ChiTiet_PhieuNhap
             (ma_ctpn, ma_phieu_nhap, ma_sp, so_luong, don_gia_nhap)
             VALUES (?,?,?,?,?)`,
            [ma_ctpn, ma_phieu_nhap, ma_sp, so_luong, don_gia_nhap]
        );

        res.json({ message: "Thêm chi tiết phiếu nhập thành công!" });

    } catch (err) {
        next(httpErrors(500, err.message));
    } finally {
        if (con) con.release();
    }
};



export const chiTietPNController = {
    layTatCaCTPhieuNhap,
    layCTPNTheoMa,
    themChiTietPhieuNhap,

};
