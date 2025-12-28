import { sanphamService } from "../services/sanpham.service.js";
import { logger } from "../config/logger.js";

export const sanphamController = {
  getAllsanphams: async (req, res) => {
    try {
      logger.info("Controller: GET /sanphams");
      const sanphams = await sanphamService.getAllsanphams();
      res.json(sanphams);
    } catch (err) {
      logger.error("Controller Error: getAllsanphams failed", err);
      res.status(500).json({ message: err.message });
    }
  },
};
