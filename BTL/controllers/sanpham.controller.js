import { sanPhamService } from "../services/sanpham.service.js";
import { createSanPhamSchema } from "../validators/sanphams/create-sanpham.validator.js";
import { updateSanPhamSchema } from "../validators/sanphams/update-sanpham.validator.js";
import httpErrors from "http-errors";
export const sanPhamController = {
  layTatCaSanPham: async (req, res, next) => {
    try {
      res.json(await sanPhamService.getAll());
    } catch (e) { next(e); }
  },

  laySanPhamTheoMa: async (req, res, next) => {
    try {
      res.json(await sanPhamService.getById(Number(req.params.ma_sp)));
    } catch (e) { next(e); }
  },

  laySanPhamTheoDanhMuc: async (req, res, next) => {
    try {
      res.json(await sanPhamService.getByDanhMuc(Number(req.params.ma_danh_muc)));
    } catch (e) { next(e); }
  },

  laySanPhamDaNhapTheoNCC: async (req, res, next) => {
    try {
      res.json(await sanPhamService.getDaNhapTheoNCC(Number(req.params.ma_ncc)));
    } catch (e) { next(e); }
  },

  laySanPhamDaBanTheoKH: async (req, res, next) => {
    try {
      res.json(await sanPhamService.getDaBanTheoKH(Number(req.params.ma_kh)));
    } catch (e) { next(e); }
  },

  themSanPham: async (req, res, next) => {
    try {
      const payload = createSanPhamSchema.parse(req.body);
      await sanPhamService.create(payload);
      res.status(201).json({ message: "Thêm sản phẩm thành công!" });
    } catch (e) { next(e); }
  },

 
suaSanPham: async (req, res, next) => {
  try {
    const ma_sp = Number(req.params.ma_sp);

    const parsed = updateSanPhamSchema.safeParse(req.body);

    if (!parsed.success) {
      const message = parsed.error.issues[0].message;
      return next(httpErrors(400, message));
    }

    await sanPhamService.update({
      ma_sp,
      ...parsed.data,
    });

    res.json({ message: "Cập nhật sản phẩm thành công!" });
  } catch (err) {
    next(err);
  }
},


};
