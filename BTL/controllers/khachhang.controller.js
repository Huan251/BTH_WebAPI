import { khachHangService } from "../services/khachhang.service.js";
import { updateKhachHangSchema } from "../validators/khachhangs/update-khachhang.validator.js";
import { logger } from "../config/logger.js";

export const khachHangController = {
  layTatCaKhachHang: async (req, res, next) => {
    try {
      logger.info("Controller: GET /khachhang");
      const data = await khachHangService.getAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  layKhachHangTheoMa: async (req, res, next) => {
    try {
      const { ma_kh } = req.params;
      const data = await khachHangService.getById(Number(ma_kh));
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  themKhachHang: async (req, res, next) => {
    try {
      await khachHangService.create(req.body);
      res.json({ message: "Thêm khách hàng thành công!" });
    } catch (err) {
      next(err);
    }
  },
  suaKhachHang: async (req, res, next) => {
    try {
      const ma_kh = Number(req.params.ma_kh);
      const payload = updateKhachHangSchema.parse(req.body);

      await khachHangService.update({ ma_kh, ...payload });

      res.json({ message: "Cập nhật khách hàng thành công!" });
    } catch (err) {
      next(err);
    }
  },
};
