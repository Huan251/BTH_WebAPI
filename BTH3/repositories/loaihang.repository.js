import { pool } from '../config/database.js';
import { logger } from '../config/logger.js';

export const LoaiHangRepo = {
    getAllLoaaiHang: async () => {
        logger.info('Repository: Fetching all LoaiHang');
        try {
            const db = await pool;
            const [rows] = await db.query('SELECT * FROM LoaiHang');
            return rows;
        }
        catch (err) {
            logger.error('Repository Error: getAllLoaaiHang failed', err);
            throw err;
        }
    },
}