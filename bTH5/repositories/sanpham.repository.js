import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const sanphamRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all sanphams");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM SanPham");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },
};
