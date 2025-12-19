import { chiTietPhieuNhapService } from "../services/chitiet_phieunhap.service.js";
import { updateCTPhieuNhapSchema } from "../validators/chitiet_phieunhaps/update-chitiet_phieunhap.validator.js";

export const chiTietPNController = {
  layTatCaCTPhieuNhap: async (req, res, next) => {
    try {
      const data = await chiTietPhieuNhapService.getAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  layCTPNTheoMa: async (req, res, next) => {
    try {
      const data = await chiTietPhieuNhapService.getById(
        Number(req.params.ma_ctpn)
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  themChiTietPhieuNhap: async (req, res, next) => {
    try {
      await chiTietPhieuNhapService.create(req.body);
      res.json({ message: "Thêm chi tiết phiếu nhập thành công!" });
    } catch (err) {
      next(err);
    }
  },

  suaChiTietPhieuNhap: async (req, res, next) => {
    try {
      const ma_ctpn = Number(req.params.ma_ctpn);
      const payload = updateCTPhieuNhapSchema.parse(req.body);

      await chiTietPNService.update({
        ma_ctpn,
        ...payload,
      });

      res.json({ message: "Cập nhật chi tiết phiếu nhập thành công!" });
    } catch (err) {
      next(err);
    }
  },
};
