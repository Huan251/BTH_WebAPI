import { danhMucService } from "../services/danhmuc.service.js";
import { createDanhMucSchema } from "../validators/danhmucs/create-danhmuc.validator.js";

export const danhMucController = {
  layTatCaDanhMuc: async (req, res, next) => {
    try {
      const data = await danhMucService.getAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  layDanhMucTheoMa: async (req, res, next) => {
    try {
      const ma = Number(req.params.ma_danh_muc);
      const data = await danhMucService.getById(ma);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  themDanhMuc: async (req, res, next) => {
    try {
      const payload = createDanhMucSchema.parse(req.body);
      await danhMucService.create(payload);
      res.status(201).json({ message: "Thêm danh mục thành công!" });
    } catch (err) {
      next(err);
    }
  },

  suaDanhMuc: async (req, res, next) => {
    try {
      const ma = Number(req.params.ma_danh_muc);
      await danhMucService.update({ ...req.body, ma_danh_muc: ma });
      res.json({ message: "Cập nhật danh mục thành công!" });
    } catch (err) {
      next(err);
    }
  },
};
