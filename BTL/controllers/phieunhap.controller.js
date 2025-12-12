import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";
import httpErrors from "http-errors";

const layTatCaPhieuNhap = async (req, res, next) => {
    let ketNoi;
    try {
        logger.info("Controller: Đang lấy danh sách tất cả phiếu nhập...");
        ketNoi = await pool.getConnection();

        const sql = "SELECT * FROM PhieuNhap;";
        const [dsPN] = await ketNoi.execute(sql);

        res.json(dsPN);

    } catch (err) {
        logger.error("Lỗi Controller: Không lấy được danh sách phiếu nhập", err);
        next(httpErrors(500, "Lỗi lấy danh sách phiếu nhập: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

const layPhieuNhapTheoMa = async (req, res, next) => {
    let ketNoi;
    try {
        const { ma_phieu_nhap } = req.params;

        logger.info(`Lấy phiếu nhập có mã: ${ma_phieu_nhap}`);
        ketNoi = await pool.getConnection();

        const [rows] = await ketNoi.execute(
            "SELECT * FROM PhieuNhap WHERE ma_phieu_nhap = ?",
            [ma_phieu_nhap]
        );

        if (rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy phiếu nhập!"));

        res.json(rows[0]);

    } catch (err) {
        next(httpErrors(500, "Lỗi lấy phiếu nhập: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

// Lấy phiếu nhập theo mã nhà cung cấp
const layPhieuNhapTheoNCC = async (req, res, next) => {
    let ketNoi;
    try {
        const { maNCC } = req.params;
        ketNoi = await pool.getConnection();

        const sql = `
            SELECT pn.*, ncc.ten_ncc
            FROM PhieuNhap pn
            JOIN NhaCungCap ncc ON pn.ma_ncc = ncc.ma_ncc
            WHERE pn.ma_ncc = ?`;
        const [rows] = await ketNoi.execute(sql, [maNCC]);

        if (rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy phiếu nhập của nhà cung cấp này!"));

        res.json(rows);

    } catch (err) {
        logger.error("Lỗi lấy phiếu nhập theo NCC", err);
        next(httpErrors(500, "Lỗi lấy phiếu nhập: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

//Lấy phiếu nhập theo tháng năm
const layPhieuNhapTheoThangNam = async (req, res, next) => {
    let ketNoi;
    try {
        const thangNum = Number(req.query.thang);
        const namNum = Number(req.query.nam);

        if (!thangNum || !namNum)
            return next(httpErrors(400, "Thiếu hoặc sai định dạng tháng/năm"));

        ketNoi = await pool.getConnection();

        const sql = `
            SELECT pn.*, ncc.ten_ncc
            FROM PhieuNhap pn
            JOIN NhaCungCap ncc ON pn.ma_ncc = ncc.ma_ncc
            WHERE MONTH(pn.ngay_nhap) = ? AND YEAR(pn.ngay_nhap) = ?
            ORDER BY pn.ngay_nhap ASC
        `;

        const [rows] = await ketNoi.execute(sql, [thangNum, namNum]);

        if (!rows || rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy phiếu nhập trong tháng này!"));

        // 🔥 Format ngày nhập → dd/mm/yyyy giống hóa đơn
        rows.forEach(pn => {
            const d = new Date(pn.ngay_nhap);
            pn.ngay_nhap = d.toLocaleDateString("vi-VN");
        });

        res.json(rows);

    } catch (err) {
        next(httpErrors(500, err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};


export const phieuNhapController = {
    layTatCaPhieuNhap,
    layPhieuNhapTheoMa,
    layPhieuNhapTheoNCC,
    layPhieuNhapTheoThangNam,
};
