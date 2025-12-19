import { hoaDonService } from "../services/hoadon.service.js";
import { updateHoaDonSchema } from "../validators/hoadons/update-hoadon.validator.js";

export const hoaDonController = {
  layTatCaHoaDon: async (req, res, next) => {
    try {
      const data = await hoaDonService.getAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  layHoaDonTheoMa: async (req, res, next) => {
    try {
      const data = await hoaDonService.getById(Number(req.params.ma_hd));
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  layHoaDonTheoKH: async (req, res, next) => {
    try {
      const data = await hoaDonService.getByKhachHang(
        Number(req.params.ma_kh)
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  layHoaDonTheoThangNam: async (req, res, next) => {
    try {
      const { thang, nam } = req.query;
      const data = await hoaDonService.getByMonthYear(
        Number(thang),
        Number(nam)
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  themHoaDon: async (req, res, next) => {
    try {
      await hoaDonService.create(req.body);
      res.json({ message: "Thêm hóa đơn thành công!" });
    } catch (err) {
      next(err);
    }
  },

  layChiTietHoaDonTheoMaHD: async (req, res, next) => {
    try {
      const data = await hoaDonService.getChiTiet(
        Number(req.params.ma_hd)
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

    suaHoaDon: async (req, res, next) => {
    try {
      const ma_hd = Number(req.params.ma_hd);
      const payload = updateHoaDonSchema.parse(req.body);

      await hoaDonService.update({
        ma_hd,
        ...payload,
      });

      res.json({ message: "Cập nhật hóa đơn thành công!" });
    } catch (err) {
      next(err);
    }
  },
};
