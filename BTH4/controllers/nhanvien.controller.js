import { pool } from "../config/database.js";
import httpErrors from "http-errors";

/**
 * Lấy danh sách tất cả nhân viên + thông tin phòng ban
 */
const getAll = async (req, res, next) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const query = `
            SELECT NV.MANV, NV.HOTEN, NV.NGAYSINH, NV.PHAI, NV.DIACHI,
                   PB.MAPB, PB.TENPB
            FROM Nhanvien NV
            LEFT JOIN Phongban PB ON NV.MAPB = PB.MAPB
        `;
        const [rows] = await connection.execute(query);
        res.json(rows);
    } catch (error) {
        next(httpErrors(500, error.message));
    } finally {
        if (connection) connection.release();
    }
};

/**
 * Lấy thông tin chi tiết nhân viên theo MANV
 */
const getById = async (req, res, next) => {
    let connection;
    try {
        const { manv } = req.params;
        connection = await pool.getConnection();
        const query = `
            SELECT NV.MANV, NV.HOTEN, NV.NGAYSINH, NV.PHAI, NV.DIACHI,
                   PB.MAPB, PB.TENPB
            FROM Nhanvien NV
            LEFT JOIN Phongban PB ON NV.MAPB = PB.MAPB
            WHERE NV.MANV = ?
        `;
        const [rows] = await connection.execute(query, [manv]);
        if (rows.length === 0) {
            return next(httpErrors(404, `Không tìm thấy nhân viên với MANV = ${manv}`));
        }
        res.json(rows[0]);
    } catch (error) {
        next(httpErrors(500, error.message));
    } finally {
        if (connection) connection.release();
    }
};

/**
 * Thêm mới một nhân viên
 * POST /api/nhanvien
 * Body: { MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB }
 */
const themNV = async (req, res, next) => {
    let connection;
    try {
        const { MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB } = req.body;

        // Kiểm tra trường bắt buộc
        if (!MANV || !HOTEN || !NGAYSINH || !PHAI || !DIACHI || !MAPB) {
            return next(httpErrors(400, "Thiếu trường bắt buộc (MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB)."));
        }

        connection = await pool.getConnection();
        const query = `
            INSERT INTO Nhanvien (MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await connection.execute(query, [MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB]);

        res.status(201).json({
            message: `Thêm nhân viên mới thành công (MANV = ${MANV}).`
        });
    } catch (error) {
        // Xử lý trùng MANV
        if (error.code === "ER_DUP_ENTRY") {
            return next(httpErrors(409, `MANV '${req.body.MANV}' đã tồn tại.`));
        }
        // Xử lý MAPB không hợp lệ
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return next(httpErrors(400, `MAPB '${req.body.MAPB}' không hợp lệ hoặc không tồn tại.`));
        }
        next(httpErrors(500, `Lỗi khi thêm nhân viên: ${error.message}`));
    } finally {
        if (connection) connection.release();
    }
};

/**
 * Cập nhật thông tin nhân viên
 * PUT /api/nhanvien/:manv
 * Body: { HOTEN, NGAYSINH, PHAI, DIACHI, MAPB }
 */
const capnhapNV = async (req, res, next) => {
    let connection;
    try {
        const { manv } = req.params;
        const { HOTEN, NGAYSINH, PHAI, DIACHI, MAPB } = req.body;

        // Kiểm tra có dữ liệu cập nhật không
        if (!HOTEN && !NGAYSINH && !PHAI && !DIACHI && !MAPB) {
            return next(httpErrors(400, "Vui lòng cung cấp ít nhất một trường để cập nhật."));
        }

        connection = await pool.getConnection();

        // Cập nhật từng trường nếu có, chuyển undefined thành null
        const updateQuery = `
            UPDATE Nhanvien
            SET HOTEN = COALESCE(?, HOTEN),
                NGAYSINH = COALESCE(?, NGAYSINH),
                PHAI = COALESCE(?, PHAI),
                DIACHI = COALESCE(?, DIACHI),
                MAPB = COALESCE(?, MAPB)
            WHERE MANV = ?;
        `;

        const params = [HOTEN, NGAYSINH, PHAI, DIACHI, MAPB].map(v => v ?? null);
        params.push(manv);

        const [result] = await connection.execute(updateQuery, params);

        if (result.affectedRows === 0) {
            return next(httpErrors(404, `Không tìm thấy nhân viên với MANV = ${manv} để cập nhật.`));
        }

        res.status(200).json({
            message: `Cập nhật thông tin nhân viên MANV = ${manv} thành công.`
        });

    } catch (error) {
        // Xử lý MAPB không hợp lệ (khóa ngoại)
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return next(httpErrors(400, `MAPB '${req.body.MAPB}' không hợp lệ hoặc không tồn tại.`));
        }
        next(httpErrors(500, `Lỗi khi cập nhật nhân viên: ${error.message}`));
    } finally {
        if (connection) connection.release();
    }
};

const xoaNV = async (req, res, next) => {
    let connection;
    try {
        const { manv } = req.params;

        connection = await pool.getConnection();

        const deleteQuery = `
            DELETE FROM Nhanvien
            WHERE MANV = ?;
        `;

        const [result] = await connection.execute(deleteQuery, [manv]);

        if (result.affectedRows === 0) {
            return next(httpErrors(404, `Không tìm thấy nhân viên với MANV = ${manv} để xóa.`));
        }

        res.status(200).json({
            message: `Xóa nhân viên MANV = ${manv} thành công.`
        });

    } catch (error) {
        // Xử lý nếu nhân viên đang được tham chiếu (khóa ngoại)
        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return next(httpErrors(409, `Không thể xóa nhân viên MANV = ${manv} vì đang được tham chiếu ở bảng khác.`));
        }
        next(httpErrors(500, `Lỗi khi xóa nhân viên: ${error.message}`));
    } finally {
        if (connection) connection.release();
    }
};

export const nhanvienController = {
    getAll,
    getById,
    themNV,  
    capnhapNV,
    xoaNV,
};

