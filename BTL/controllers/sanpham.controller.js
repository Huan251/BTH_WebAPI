import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";
import httpErrors from "http-errors";

// Lấy tất cả sản phẩm
const layTatCaSanPham = async (req, res, next) => {
    let ketNoi;
    try {
        logger.info("Controller: Đang lấy danh sách sản phẩm...");
        ketNoi = await pool.getConnection();

        const [rows] = await ketNoi.execute("SELECT * FROM SanPham;");
        res.json(rows);

    } catch (err) {
        logger.error("Lỗi lấy danh sách sản phẩm", err);
        next(httpErrors(500, "Lỗi lấy danh sách sản phẩm: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

// Lấy sản phẩm theo mã sản phẩm
const laySanPhamTheoMa = async (req, res, next) => {
    let ketNoi;
    try {
        const { maSP } = req.params;

        logger.info(`Controller: Đang lấy sản phẩm theo mã: ${maSP}`);

        ketNoi = await pool.getConnection();

        const sql = "SELECT * FROM SanPham WHERE ma_sp = ?";
        const [rows] = await ketNoi.execute(sql, [maSP]);

        if (rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy sản phẩm!"));

        res.json(rows[0]);

    } catch (err) {
        logger.error("Lỗi lấy sản phẩm theo mã", err);
        next(httpErrors(500, "Lỗi lấy sản phẩm: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

// Lấy sản phẩm đã nhập theo nhà cung cấp
const laySanPhamDaNhapTheoNCC = async (req, res, next) => {
    let ketNoi;
    try {
        const { maNCC } = req.params;
        ketNoi = await pool.getConnection();

        const sql = `
            SELECT 
                sp.ma_sp, sp.ten_sp, sp.gia_ban, sp.gia_nhap, sp.so_luong_ton, sp.mo_ta,
                dm.ten_danh_muc,
                ncc.ten_ncc,
                pn.ma_phieu_nhap, pn.ngay_nhap,
                ctpn.so_luong AS so_luong_nhap, ctpn.don_gia_nhap
            FROM ChiTiet_PhieuNhap ctpn
            JOIN PhieuNhap pn ON ctpn.ma_phieu_nhap = pn.ma_phieu_nhap
            JOIN SanPham sp ON ctpn.ma_sp = sp.ma_sp
            JOIN NhaCungCap ncc ON sp.ma_ncc = ncc.ma_ncc
            JOIN DanhMuc dm ON sp.ma_danh_muc = dm.ma_danh_muc
            WHERE ncc.ma_ncc = ?
            ORDER BY pn.ngay_nhap DESC
        `;

        const [rows] = await ketNoi.execute(sql, [maNCC]);

        if (rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy sản phẩm đã nhập của nhà cung cấp này!"));

        res.json(rows);

    } catch (err) {
        logger.error("Lỗi lấy sản phẩm đã nhập theo NCC", err);
        next(httpErrors(500, "Lỗi lấy sản phẩm đã nhập: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};


// Lấy tất cả sản phẩm theo mã danh mục
const laySanPhamTheoDanhMuc = async (req, res, next) => {
    let ketNoi;
    try {
        const { maDanhMuc } = req.params;
        ketNoi = await pool.getConnection();

        const sql = `
            SELECT sp.*, dm.ten_danh_muc, ncc.ten_ncc
            FROM SanPham sp
            JOIN DanhMuc dm ON sp.ma_danh_muc = dm.ma_danh_muc
            JOIN NhaCungCap ncc ON sp.ma_ncc = ncc.ma_ncc
            WHERE sp.ma_danh_muc = ?`;
        const [rows] = await ketNoi.execute(sql, [maDanhMuc]);

        if (rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy sản phẩm trong danh mục này!"));

        res.json(rows);

    } catch (err) {
        logger.error("Lỗi lấy sản phẩm theo danh mục", err);
        next(httpErrors(500, "Lỗi lấy sản phẩm: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

// Lấy sản phẩm đã bán theo khách hàng
const laySanPhamDaBanTheoKH = async (req, res, next) => {
    let ketNoi;
    try {
        const { maKH } = req.params;
        ketNoi = await pool.getConnection();

        const sql = `
            SELECT 
                sp.ma_sp, sp.ten_sp, sp.gia_ban, sp.mo_ta,
                dm.ten_danh_muc,
                hd.ma_hd, hd.ngay_ban, hd.tong_tien,
                kh.ten_kh,
                cthd.so_luong AS so_luong_ban, cthd.don_gia_ban
            FROM ChiTiet_HoaDon cthd
            JOIN HoaDon hd ON cthd.ma_hd = hd.ma_hd
            JOIN SanPham sp ON cthd.ma_sp = sp.ma_sp
            JOIN KhachHang kh ON hd.ma_kh = kh.ma_kh
            JOIN DanhMuc dm ON sp.ma_danh_muc = dm.ma_danh_muc
            WHERE kh.ma_kh = ?
            ORDER BY hd.ngay_ban DESC
        `;

        const [rows] = await ketNoi.execute(sql, [maKH]);

        if (rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy sản phẩm đã bán của khách hàng này!"));

        res.json(rows);

    } catch (err) {
        logger.error("Lỗi lấy sản phẩm đã bán theo KH", err);
        next(httpErrors(500, "Lỗi lấy sản phẩm đã bán: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};


export const sanPhamController = {
    layTatCaSanPham,
    laySanPhamTheoMa,
    laySanPhamDaNhapTheoNCC,
    laySanPhamTheoDanhMuc,
    laySanPhamDaBanTheoKH,
};
