import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const hanghoaRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all hanghoas");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM HangHoa");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

  getByMaLoai: async (MaLoai) => {
    logger.info(`Repository: Fetching hanghoa with MaLoai ${MaLoai}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM HangHoa WHERE MaLoai = ?", [MaLoai]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaLoai failed for MaLoai ${MaLoai}`, err);
      throw err;
    }
  },

    getByTenLoai: async (TenLoai) => {
    logger.info(`Repository: Fetching hanghoa with TenLoai ${TenLoai}`);
    try {
      const db = await pool;
      const [rows] = await db.query(`
        SELECT * FROM HangHoa
        INNER JOIN LoaiHang ON HangHoa.MaLoai = LoaiHang.MaLoai
        WHERE TenLoai = ?
        `, [TenLoai]);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getByTenLoai failed for TenLoai ${TenLoai}`, err);
      throw err;
    }
  },

  getAllSapHet: async () => {
    logger.info(`Repository: Fetching hanghoa with SoLuongCon < 5`);
    try {
      const db = await pool;
      const [rows] = await db.query(`
        SELECT * FROM HangHoa
        WHERE SoLuongCon < 5
        `);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getBySapHet failed for SoLuongCom < 5`, err);
      throw err;
    }
  }
};
