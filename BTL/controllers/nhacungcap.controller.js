import { nhaCungCapService } from "../services/nhacungcap.service.js";
import { updateNhaCungCapSchema } from "../validators/nhacungcaps/update-nhacungcap.validator.js";

export const nhaCungCapController = {
  layTatCaNhaCungCap: async (req, res, next) => {
    try {
      const data = await nhaCungCapService.getAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  layNCCTheoMa: async (req, res, next) => {
    try {
      const data = await nhaCungCapService.getById( 
        Number(req.params.ma_ncc)
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  themNhaCungCap: async (req, res, next) => {
    try {
      await nhaCungCapService.create(req.body);
      res.json({ message: "Thêm nhà cung cấp thành công!" });
    } catch (err) {
      next(err);
    }
  },
     suaNhaCungCap: async (req, res, next) => {
    try {
      const ma_ncc = Number(req.params.ma_ncc);
      const payload = updateNhaCungCapSchema.parse(req.body);

      await nhaCungCapService.update({ ma_ncc, ...payload });

      res.json({ message: "Cập nhật nhà cung cấp thành công!" });
    } catch (err) {
      next(err);
    }
  },
};
