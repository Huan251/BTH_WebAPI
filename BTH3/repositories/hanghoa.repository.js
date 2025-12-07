import { ca } from "zod/locales";
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
    
    getByMaHang: async (MaHang) => {
        logger.info(`Repository: Fetching hanghoa with MaHang ${MaHang}`);
        try {
          const db = await pool;
          const [rows] = await db.query("SELECT * FROM HangHoa WHERE MaHang = ?", [MaHang]);
          return rows[0];
        } catch (err) {
          logger.error(`Repository Error: getByMaHang failed for MaHang ${MaHang}`, err);
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
    getByTenLoai: async (name) => {
        logger.info(`Repository: Fetching hanghoa with ten loai ${name}`);
        try {
            const db = await pool;
            const sqlString = `SELECT h.*, l.TenLoai 
                                FROM HangHoa h
                                JOIN LoaiHang l ON h.MaLoai = l.MaLoai
                                WHERE l.TenLoai LIKE ?`;
            const [rows] = await db.query(sqlString, [name]);
            console.log(rows);
            return rows;
        } catch (err) {
            logger.error(`Repository Error: getByTenLoai failed for ten loai ${name}`, err);
            throw err;
        }
    },
    getByNhoHon5: async () => {
        logger.info(`Repository: Fetching hanghoa with SoLuongCon less than 5`);
        try {
            const db = await pool;
            const [rows] = await db .query("SELECT * FROM HangHoa WHERE SoLuongCon < 5");
            return rows;
        }
        catch (err) {
            logger.error("Repository Error: getByNhoHon5 failed", err);
            throw err;
        }
    },
    getGiaHangHoa: async (MaHang) => {
        logger.info(`Repository: Fetching current price for hanghoa ${MaHang}`);
        try {
            const db = await pool;
            const sqlString = `SELECT h.*, 
             g.Gia, g.DVTinh, g.NgayBD, g.NgayKT
              FROM HangHoa h
              LEFT JOIN GiaBan g ON h.MaHang = g.MaHang 
              AND (CURRENT_DATE BETWEEN g.NgayBD AND g.NgayKT) -- Chỉ lấy giá còn hiệu lực
              WHERE h.MaHang = ?`;
            const [rows] = await db.query(sqlString, [MaHang]);
            return rows[0];
        }
        catch (err) {
            logger.error(`Repository Error: getGiaHangHoa failed for MaHang ${MaHang}`, err);
            throw err;
        }
    },
    getByGiaKhoang: async (minPrice, maxPrice) => {
        logger.info(`Repository: Fetching hanghoa with price between ${minPrice} and ${maxPrice}`);
        try {
            const db = await pool;
            const sqlString = `SELECT h.*
                                FROM HangHoa h
                                JOIN GiaBan g ON h.MaHang = g.MaHang
                                WHERE (CURRENT_DATE BETWEEN g.NgayBD AND g.NgayKT)
                                AND g.Gia BETWEEN ? AND ?`;
            const [rows] = await db.query(sqlString, [minPrice, maxPrice]);
            return rows;
        }
        catch (err) {
            logger.error("Repository Error: getHangHoaCoGiaKhoang failed", err);
            throw err;
        }
    },
    create: async ({ MaHang, MaLoai, TenHang, SoLuong, SoLuongCon }) => {
        logger.info(`Repository: Creating hanghoa ${MaHang}`);
        try {
          const db = await pool;
          await db.query(
            "INSERT INTO HangHoa (MaHang, MaLoai, TenHang, SoLuong, SoLuongCon) VALUES (?, ?, ?, ?, ?)",
            [MaHang, MaLoai, TenHang, SoLuong, SoLuongCon]
          );
          return { MaHang, MaLoai, TenHang, SoLuong, SoLuongCon };
        } catch (err) {
          logger.error("Repository Error: create failed", err);
          throw err;
        }
    },

    update: async (MaHang, { MaLoai, TenHang, SoLuong, SoLuongCon }) => {
        logger.info(`Repository: Updating hanghoa ${MaHang}`);
        try {
          const db = await pool;
          await db.query(
            "UPDATE HangHoa SET MaLoai = ?, TenHang = ?, SoLuong = ?, SoLuongCon = ? WHERE MaHang = ?",
            [MaLoai, TenHang, SoLuong, SoLuongCon, MaHang]
          );
          return { MaHang, MaLoai, TenHang, SoLuong, SoLuongCon };
        } catch (err) {
          logger.error(`Repository Error: update failed for MaHang ${MaHang}`, err);
          throw err;
        }
    },

  delete: async (MaHang) => {
    logger.info(`Repository: Deleting hanghoa ${MaHang}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM HangHoa WHERE MaHang = ?", [MaHang]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for MaHang ${MaHang}`, err);
      throw err;
    }
  },
};
