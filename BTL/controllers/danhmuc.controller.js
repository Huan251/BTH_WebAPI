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

// Thêm danh mục 
const themDanhMuc = async (req, res, next) => {
    let con;
    try {
        const { ma_danh_muc, ten_danh_muc, mo_ta } = req.body;

        // ========== Kiểm tra rỗng ==========
        if (!ma_danh_muc || !ten_danh_muc)
            return next(httpErrors(400, "Thiếu thông tin danh mục!"));

        // ========== Kiểm tra kiểu dữ liệu ==========
        if (isNaN(ma_danh_muc) || ma_danh_muc <= 0)
            return next(httpErrors(400, "Mã danh mục phải là số nguyên dương!"));

        if (typeof ten_danh_muc !== "string" || ten_danh_muc.trim() === "")
            return next(httpErrors(400, "Tên danh mục phải là chuỗi!"));

        con = await pool.getConnection();

        // ========== Kiểm tra trùng mã ==========
        const [check] = await con.query("SELECT ma_danh_muc FROM DanhMuc WHERE ma_danh_muc = ?", [ma_danh_muc]);
        if (check.length > 0)
            return next(httpErrors(400, "Mã danh mục đã tồn tại!"));

        // ========== Thêm ==========
        await con.query(
            "INSERT INTO DanhMuc(ma_danh_muc, ten_danh_muc, mo_ta) VALUES (?,?,?)",
            [ma_danh_muc, ten_danh_muc, mo_ta || null]
        );

        res.json({ message: "Thêm danh mục thành công!" });

    } catch (err) {
        next(httpErrors(500, err.message));
    } finally {
        if (con) con.release();
    }
};

const suaDanhMuc = async (req, res, next) => {
    let con;
    try {
        const { ma_danh_muc } = req.params;
        const { ten_danh_muc, mo_ta } = req.body;

        if (isNaN(ma_danh_muc))
            return next(httpErrors(400, "Mã danh mục không hợp lệ!"));

        if (!ten_danh_muc)
            return next(httpErrors(400, "Tên danh mục không được để trống!"));

        con = await pool.getConnection();

        const [dm] = await con.query(
            "SELECT ma_danh_muc FROM DanhMuc WHERE ma_danh_muc = ?",
            [ma_danh_muc]
        );
        if (dm.length === 0)
            return next(httpErrors(404, "Danh mục không tồn tại!"));

        await con.query(
            "UPDATE DanhMuc SET ten_danh_muc=?, mo_ta=? WHERE ma_danh_muc=?",
            [ten_danh_muc, mo_ta || null, ma_danh_muc]
        );

        res.json({ message: "Cập nhật danh mục thành công!" });
    } catch (err) {
        next(httpErrors(500, err.message));
    } finally {
        if (con) con.release();
    }
};


export const danhMucController = {
    layTatCaDanhMuc,
    layDanhMucTheoMa,
    themDanhMuc,
    suaDanhMuc,
};
