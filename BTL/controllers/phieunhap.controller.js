import { phieuNhapService } from "../services/phieunhap.service.js";

export const phieuNhapController = {
  layTatCaPhieuNhap: async (req, res, next) => {
    try {
      const data = await phieuNhapService.getAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  layPhieuNhapTheoMa: async (req, res, next) => {
    try {
      const data = await phieuNhapService.getById(
        Number(req.params.ma_phieu_nhap)
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  layPhieuNhapTheoNCC: async (req, res, next) => {
  try {
    const ma_ncc = Number(req.params.ma_ncc);
    if (isNaN(ma_ncc)) {
      return res.status(400).json({ status: 400, message: "Mã nhà cung cấp không hợp lệ" });
    }

    const data = await phieuNhapService.getByNCC(ma_ncc);
    res.json(data);
  } catch (err) {
    next(err);
  }
},

  layPhieuNhapTheoThangNam: async (req, res, next) => {
    try {
      const data = await phieuNhapService.getByMonthYear(
        Number(req.query.thang),
        Number(req.query.nam)
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  themPhieuNhap: async (req, res, next) => {
    try {
      await phieuNhapService.create(req.body);
      res.json({ message: "Thêm phiếu nhập thành công!" });
    } catch (err) {
      next(err);
    }
  },

  suaPhieuNhap: async (req, res, next) => {
    try {
      const ma_phieu_nhap = Number(req.params.ma_phieu_nhap);

      const payload = updatePhieuNhapSchema.parse(req.body);

      await phieuNhapService.update({
        ma_phieu_nhap,
        ...payload,
      });

      res.json({ message: "Cập nhật phiếu nhập thành công!" });
    } catch (err) {
      next(err);
    }
  },

};
