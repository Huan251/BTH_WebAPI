import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";
import httpErrors from "http-errors";

const layTatCaHoaDon = async (req, res, next) => {
    let ketNoi;
    try {
        logger.info("Controller: Đang lấy danh sách tất cả hóa đơn...");
        ketNoi = await pool.getConnection();

        const sql = "SELECT * FROM HoaDon;";
        const [dsHoaDon] = await ketNoi.execute(sql);

        // ===== Format ngày dd/MM/yyyy =====
        const ketQua = dsHoaDon.map(hd => {
            const ngay = new Date(hd.ngay_ban);

            const ngayFormatted =
                ("0" + ngay.getDate()).slice(-2) + "/" +
                ("0" + (ngay.getMonth() + 1)).slice(-2) + "/" +
                ngay.getFullYear();

            return { ...hd, ngay_ban: ngayFormatted };
        });

        res.json(ketQua);

    } catch (err) {
        logger.error("Lỗi Controller: Không lấy được danh sách hóa đơn", err);
        next(httpErrors(500, "Lỗi lấy danh sách hóa đơn: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

const layHoaDonTheoMa = async (req, res, next) => {
    let ketNoi;
    try {
        const { ma_hd } = req.params;

        logger.info(`Lấy hóa đơn có mã: ${ma_hd}`);
        ketNoi = await pool.getConnection();

        const [rows] = await ketNoi.execute(
            "SELECT * FROM HoaDon WHERE ma_hd = ?",
            [ma_hd]
        );

        if (rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy hóa đơn!"));

        let hd = rows[0];
        hd.ngay_ban = new Date(hd.ngay_ban).toLocaleDateString("vi-VN");

        res.json(hd);

    } catch (err) {
        next(httpErrors(500, "Lỗi lấy hóa đơn: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

// Lấy hóa đơn theo mã khách hàng
const layHoaDonTheoKH = async (req, res, next) => {
    let ketNoi;
    try {
        const { maKH } = req.params;
        ketNoi = await pool.getConnection();

        const sql = `
            SELECT hd.*, kh.ten_kh
            FROM HoaDon hd
            JOIN KhachHang kh ON hd.ma_kh = kh.ma_kh
            WHERE hd.ma_kh = ?`;
        const [rows] = await ketNoi.execute(sql, [maKH]);

        if (rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy hóa đơn của khách hàng này!"));

        res.json(rows);

    } catch (err) {
        logger.error("Lỗi lấy hóa đơn theo KH", err);
        next(httpErrors(500, "Lỗi lấy hóa đơn: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};


// Lấy hóa đơn theo năm tháng
const layHoaDonTheoThangNam = async (req, res, next) => {
    let ketNoi;
    try {
        const thangNum = Number(req.query.thang);
        const namNum = Number(req.query.nam);

        if (!thangNum || !namNum)
            return next(httpErrors(400, "Thiếu hoặc sai định dạng tháng/năm"));

        ketNoi = await pool.getConnection();

        const sql = `
            SELECT hd.*, kh.ten_kh
            FROM HoaDon hd
            JOIN KhachHang kh ON hd.ma_kh = kh.ma_kh
            WHERE MONTH(hd.ngay_ban) = ? AND YEAR(hd.ngay_ban) = ?
            ORDER BY hd.ngay_ban ASC
        `;

        const [rows] = await ketNoi.execute(sql, [thangNum, namNum]);

        if (!rows || rows.length === 0)
            return next(httpErrors(404, "Không tìm thấy hóa đơn trong tháng này!"));

        // 🔥 Format ngày → dd/mm/yyyy (không còn timezone, không còn T17:00:00.000Z)
        rows.forEach(hd => {
            const d = new Date(hd.ngay_ban);
            hd.ngay_ban = d.toLocaleDateString("vi-VN");  
        });

        res.json(rows);

    } catch (err) {
        next(httpErrors(500, err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

// Thêm hóa đơn
const themHoaDon = async (req, res, next) => {
    let con;
    try {
        const { ma_hd, ma_kh, ngay_ban, tong_tien } = req.body;

        // ===== Kiểm tra rỗng =====
        if (!ma_hd || !ma_kh || !ngay_ban)
            return next(httpErrors(400, "Thiếu thông tin hóa đơn!"));

        // ===== Kiểm tra kiểu dữ liệu =====
        if (isNaN(ma_hd) || ma_hd <= 0)
            return next(httpErrors(400, "Mã hóa đơn phải là số nguyên dương!"));

        if (isNaN(ma_kh))
            return next(httpErrors(400, "Mã khách hàng phải là số!"));

        con = await pool.getConnection();

        // ===== Kiểm tra trùng mã hóa đơn =====
        const [hd] = await con.query("SELECT ma_hd FROM HoaDon WHERE ma_hd = ?", [ma_hd]);
        if (hd.length > 0)
            return next(httpErrors(400, "Hóa đơn đã tồn tại!"));

        // ===== Kiểm tra khóa ngoại khách hàng =====
        const [kh] = await con.query("SELECT ma_kh FROM KhachHang WHERE ma_kh = ?", [ma_kh]);
        if (kh.length === 0)
            return next(httpErrors(400, "Khách hàng không tồn tại!"));

        // ===== Thêm hóa đơn =====
        await con.query(
            "INSERT INTO HoaDon(ma_hd, ma_kh, ngay_ban, tong_tien) VALUES (?,?,?,?)",
            [ma_hd, ma_kh, ngay_ban, tong_tien || 0]
        );

        res.json({ message: "Thêm hóa đơn thành công!" });

    } catch (err) {
        next(httpErrors(500, err.message));
    } finally {
        if (con) con.release();
    }
};

// Lấy chi tiết hóa đơn theo mã hóa đơn
const layChiTietHoaDonTheoMaHD = async (req, res, next) => {
    let ketNoi;
    try {
        const { ma_hd } = req.params;

        if (isNaN(ma_hd))
            return next(httpErrors(400, "Mã hóa đơn không hợp lệ!"));

        ketNoi = await pool.getConnection();

        const sql = `
            SELECT 
                cthd.ma_cthd,
                cthd.ma_sp,
                sp.ten_sp,
                cthd.so_luong,
                cthd.don_gia_ban,
                (cthd.so_luong * cthd.don_gia_ban) AS thanh_tien
            FROM ChiTiet_HoaDon cthd
            JOIN SanPham sp ON cthd.ma_sp = sp.ma_sp
            WHERE cthd.ma_hd = ?
        `;

        const [rows] = await ketNoi.execute(sql, [ma_hd]);

        if (rows.length === 0)
            return next(httpErrors(404, "Hóa đơn chưa có chi tiết!"));

        res.json({
            ma_hoa_don: Number(ma_hd),
            so_dong: rows.length,
            bang_chi_tiet: rows
        });

    } catch (err) {
        next(httpErrors(500, "Lỗi lấy chi tiết hóa đơn: " + err.message));
    } finally {
        if (ketNoi) ketNoi.release();
    }
};

const suaHoaDon = async (req, res, next) => {
    let con;
    try {
        const { ma_hd } = req.params;
        const { ma_kh, ngay_ban, tong_tien } = req.body;

        if (isNaN(ma_hd))
            return next(httpErrors(400, "Mã hóa đơn không hợp lệ!"));

        con = await pool.getConnection();

        await con.query(
            "UPDATE HoaDon SET ma_kh=?, ngay_ban=?, tong_tien=? WHERE ma_hd=?",
            [ma_kh, ngay_ban, tong_tien, ma_hd]
        );

        res.json({ message: "Cập nhật hóa đơn thành công!" });
    } catch (err) {
        next(httpErrors(500, err.message));
    } finally {
        if (con) con.release();
    }
};


export const hoaDonController = {
    layTatCaHoaDon,
    layHoaDonTheoMa,
    layHoaDonTheoKH,
    layHoaDonTheoThangNam,
    themHoaDon,
    layChiTietHoaDonTheoMaHD,
    suaHoaDon,
    
};
