import { pool } from "../services/mysql.js";

export const userRepo = {
    getUsers: async () => {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM Users");
        return rows;
    }
};

