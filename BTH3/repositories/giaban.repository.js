import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const giabanRepository = {
    getAll: async () => {
        logger.info("Repository: Fetching all hanghoas");
        try {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM GiaBan");
        return rows;
        } catch (err) {
        logger.error("Repository Error: getAll failed", err);
        throw err;
        }
    },
    getByGia: async (MaHang) => {
        logger.info(`Repository: Fetching giaban with MaHang ${MaHang}`);
        try {
            const db = await pool;
            const [row] = await db.query("SELECT * FROM GiaBan WHERE MaHang = ?", [MaHang]);
            return row[0];
        }
        catch (err) {
            logger.error(`Repository Error: getByGia failed for MaHang ${MaHang}`, err);
            throw err;
        }
    },
    getGiaHangHoa: async (MaHang) => {
        logger.info(`Repository: Fetching hanghoa with GiaHangHoa`);
        try {
            const db = await pool;
            const sqlString = `SELECT * FROM GiaBan 
                                WHERE MaHang = ? 
                                AND (CURRENT_DATE) BETWEEN NgayBD AND NgayKT`;
            const [rows] = await db.query(sqlString, [MaHang]);
            return rows[0];
        }
        catch (err) {
            logger.error("Repository Error: getGiaHangHoa failed", err);
            throw err;
        }
    },

  getByMaGB: async (MaGB) => {
    logger.info(`Repository: Fetching GiaBan with MaGB ${MaGB}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM GiaBan WHERE MaGB = ?", [MaGB]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaGB failed for MaGB ${MaGB}`, err);
      throw err;
    }
  },

  create: async ({ MaGB, MaHang, Gia, DVTinh, NgayBD, NgayKT }) => {
    logger.info(`Repository: Creating giaban ${MaGB}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO GiaBan (MaGB, MaHang, Gia, DVTinh, NgayBD, NgayKT) VALUES (?, ?, ?, ?, ?, ?)",
        [MaGB, MaHang, Gia, DVTinh, NgayBD, NgayKT]
      );
      return { MaGB, MaHang, Gia, DVTinh, NgayBD, NgayKT };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },

  update: async (MaGB, { MaHang, Gia, DVTinh, NgayBD, NgayKT }) => {
    logger.info(`Repository: Updating giaban ${MaGB}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE GiaBan SET MaHang = ?, Gia = ?, DVTinh = ?, NgayBD = ?, NgayKT = ? WHERE MaGB = ?",
        [MaHang, Gia, DVTinh, NgayBD, NgayKT, MaGB]
      );
      return { MaGB, MaHang, Gia, DVTinh, NgayBD, NgayKT };
    } catch (err) {
      logger.error(`Repository Error: update failed for MaGB ${MaGB}`, err);
      throw err;
    }
  },

  delete: async (MaGB) => {
    logger.info(`Repository: Deleting giaban ${MaGB}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM GiaBan WHERE MaGB = ?", [MaGB]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for MaGB ${MaGB}`, err);
      throw err;
    }
  },
};
