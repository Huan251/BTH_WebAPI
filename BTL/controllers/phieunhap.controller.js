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

// Thêm phiếu nhập
const themPhieuNhap = async (req, res, next) => {
    let con;
    try {
        const { ma_phieu_nhap, ma_ncc, ngay_nhap } = req.body;

        if (!ma_phieu_nhap || !ma_ncc || !ngay_nhap)
            return next(httpErrors(400, "Thiếu thông tin phiếu nhập!"));

        if (isNaN(ma_phieu_nhap) || ma_phieu_nhap <= 0)
            return next(httpErrors(400, "Mã phiếu nhập phải là số nguyên dương!"));

        if (isNaN(ma_ncc))
            return next(httpErrors(400, "Mã NCC phải là số!"));

        con = await pool.getConnection();

        // kiểm tra mã phiếu nhập tồn tại
        const [check] = await con.query(
            "SELECT ma_phieu_nhap FROM PhieuNhap WHERE ma_phieu_nhap=?",
            [ma_phieu_nhap]
        );
        if (check.length > 0)
            return next(httpErrors(400, "Phiếu nhập đã tồn tại!"));

        // kiểm tra NCC tồn tại
        const [ncc] = await con.query(
            "SELECT ma_ncc FROM NhaCungCap WHERE ma_ncc=?",
            [ma_ncc]
        );
        if (ncc.length === 0)
            return next(httpErrors(400, "Nhà cung cấp không tồn tại!"));

        await con.query(
            "INSERT INTO PhieuNhap(ma_phieu_nhap, ma_ncc, ngay_nhap) VALUES (?,?,?)",
            [ma_phieu_nhap, ma_ncc, ngay_nhap]
        );

        res.json({ message: "Thêm phiếu nhập thành công!" });

    } catch (err) {
        next(httpErrors(500, err.message));
    } finally {
        if (con) con.release();
    }
};

const suaPhieuNhap = async (req, res, next) => {
    let con;
    try {
        const { ma_phieu_nhap } = req.params;
        const { ma_ncc, ngay_nhap } = req.body;

        if (isNaN(ma_phieu_nhap))
            return next(httpErrors(400, "Mã phiếu nhập không hợp lệ!"));

        con = await pool.getConnection();

        await con.query(
            "UPDATE PhieuNhap SET ma_ncc=?, ngay_nhap=? WHERE ma_phieu_nhap=?",
            [ma_ncc, ngay_nhap, ma_phieu_nhap]
        );

        res.json({ message: "Cập nhật phiếu nhập thành công!" });
    } catch (err) {
        next(httpErrors(500, err.message));
    } finally {
        if (con) con.release();
    }
};


export const phieuNhapController = {
    layTatCaPhieuNhap,
    layPhieuNhapTheoMa,
    layPhieuNhapTheoThangNam,
    layPhieuNhapTheoNCC,
    themPhieuNhap,
    suaPhieuNhap,
};

