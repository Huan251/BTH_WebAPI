import { pool } from "../config/database.js";
import httpErrors from "http-errors";

// Lấy danh sách tất cả phòng ban
const getAllPB = async (req, res, next) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const query = `
            SELECT MAPB, TENPB
            FROM Phongban;
        `;

        const [rows] = await connection.execute(query);

        // Trả về trực tiếp mảng dữ liệu
        res.status(200).json(rows);

    } catch (error) {
        next(httpErrors(500, `Lỗi khi lấy danh sách phòng ban: ${error.message}`));
    } finally {
        if (connection) connection.release();
    }
};

const getNhanvienTheoPhongban = async (req, res, next) => {
    let connection;
    try {
        const { mapb } = req.params;
        connection = await pool.getConnection();
        const query = `
            SELECT NV.MANV, NV.HOTEN, NV.NGAYSINH, NV.PHAI, NV.DIACHI, PB.TENPB
            FROM Nhanvien NV
            JOIN Phongban PB ON NV.MAPB = PB.MAPB
            WHERE NV.MAPB = ?;
        `;
        const [rows] = await connection.execute(query, [mapb]);
        res.json(rows);
    } catch (error) {
        next(httpErrors(500, `Lỗi khi lấy nhân viên theo phòng ban: ${error.message}`));
    } finally {
        if (connection) connection.release();
    }
};


export const phongbanController = {
    getAllPB,
    getNhanvienTheoPhongban,
};
