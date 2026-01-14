import { chiTietHoaDonService } from "../services/chitiet_hoadon.service.js";
import { updateCTHoaDonSchema } from "../validators/chitiet_hoadons/update-chitiet_hoadon.validator.js";

export const chiTietHoaDonController = {

  // Lấy danh sách tất cả chi tiết hóa đơn
  layTatCaCTHoaDon: async (req, res, next) => {
    try {
      const data = await chiTietHoaDonService.getAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  // Lấy chi tiết hóa đơn theo mã chi tiết hóa đơn
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

  // Lấy danh sách chi tiết hóa đơn theo mã hóa đơn
  layCTHDTheoMaHD: async (req, res, next) => {
    try {
      const ma_hd = Number(req.params.ma_hd);
      const data = await chiTietHoaDonService.getByMaHoaDon(ma_hd);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  // Thêm mới chi tiết hóa đơn
  themChiTietHoaDon: async (req, res, next) => {
    try {
      await chiTietHoaDonService.create(req.body);
      res.status(201).json({
        message: "Thêm chi tiết hóa đơn thành công"
      });
    } catch (err) {
      next(err);
    }
  },

  // Cập nhật thông tin chi tiết hóa đơn theo mã chi tiết hóa đơn
  suaChiTietHoaDon: async (req, res, next) => {
    try {
      const ma_cthd = Number(req.params.ma_cthd);

      const payload = updateCTHoaDonSchema.parse(req.body);

      await updateCTHoaDonSchema.update({
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

  // Xóa chi tiết hóa đơn theo mã chi tiết hóa đơn
  xoaChiTietHoaDon: async (req, res, next) => {
    try {
      const ma_cthd = Number(req.params.ma_cthd);
      await chiTietHoaDonService.delete(ma_cthd);
      res.json({ message: "Xóa chi tiết hóa đơn thành công!" });
    } catch (e) {
      next(e);
    }
  },

};
