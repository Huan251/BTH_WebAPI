import { pool } from "../config/database.js";
import httpErrors from "http-errors";

// Lấy danh sách công trình
const getAllCT = async (req, res, next) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const query = `SELECT * FROM Congtrinh;`;
        const [rows] = await connection.execute(query);
        res.json(rows);
    } catch (error) {
        next(httpErrors(500, `Lỗi khi lấy công trình: ${error.message}`));
    } finally {
        if (connection) connection.release();
    }
};

export const congtrinhController = {
    getAllCT,
};
