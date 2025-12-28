import { hanghoaService } from "../services/hanghoa.service.js";
import { logger } from "../config/logger.js";

export const hanghoaController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /hanghoas");
      const hanghoa = await hanghoaService.getAllhanghoas();
      res.json(hanghoa);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getByMaLoai: async (req, res) => {
    const MaLoai = +req.params.MaLoai;
    logger.info(`Controller: GET /hanghoas/ma-loai/${MaLoai}`);

    try {
      const hanghoa = await hanghoaService.gethanghoaByMaLoai(MaLoai);
      res.json(hanghoa);
    } catch (err) {
      logger.error(`Controller Error: getByMaLoai failed (${MaLoai})`, err);
      res.status(404).json({ message: err.message });
    }
  },

    getByTenLoai: async (req, res) => {
    const TenLoai = req.params.TenLoai;
    logger.info(`Controller: GET /hanghoas/ten-loai/${TenLoai}`);

    try {
      const hanghoa = await hanghoaService.gethanghoaByTenLoai(TenLoai);
      res.json(hanghoa);
    } catch (err) {
      logger.error(`Controller Error: getByTenLoai failed (${TenLoai})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  getAllSapHet: async (req, res) => {
    try {
      logger.info("Controller: GET /hanghoas/sap-het");
      const hanghoa = await hanghoaService.getAllhanghoaSapHet();
      res.json(hanghoa);
    } catch (err) {
      logger.error("Controller Error: getAllSapHet failed", err);
      res.status(500).json({ message: err.message });
    }
  },
};
