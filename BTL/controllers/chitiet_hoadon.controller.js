import { chiTietHDService } from "../services/chitiet_hoadon.service.js";
import { updateCTHoaDonSchema } from "../validators/chitiet_hoadons/update-chitiet_hoadon.validator.js";

export const chiTietHDController = {
  layTatCaCTHoaDon: async (req, res, next) => {
    try {
      const data = await chiTietHoaDonService.getAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  layCTHDTheoMa: async (req, res, next) => {
    try {
      const data = await chiTietHoaDonService.getById(
        Number(req.params.ma_cthd)
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  themChiTietHoaDon: async (req, res, next) => {
    try {
      await chiTietHoaDonService.create(req.body);
      res.json({ message: "Thêm chi tiết hóa đơn thành công!" });
    } catch (err) {
      next(err);
    }
  },

   suaChiTietHoaDon: async (req, res, next) => {
    try {
      const ma_cthd = Number(req.params.ma_cthd);

      const payload = updateCTHoaDonSchema.parse(req.body);

      await chiTietHDService.update({
        ma_cthd,
        ...payload,
      });

      res.json({ message: "Cập nhật chi tiết hóa đơn thành công!" });
    } catch (err) {

      if (err.errors?.length) {
        return next(httpErrors(400, err.errors[0].message));
      }
      next(err);
    }
  },
};
