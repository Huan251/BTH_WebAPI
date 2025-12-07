import { CreateHangHoaDTO } from "../dtos/hanghoas/create-hanghoa.dto.js";
import { UpdateHangHoaDTO } from "../dtos/hanghoas/update-hanghoa.dto.js";
import { hanghoaService } from "../services/hanghoa.service.js";
import { validateCreateHangHoa } from "../validators/hanghoa/create-hanghoa.validator.js";
import { validateUpdateHangHoa } from "../validators/hanghoa/update-hanghoa.validator.js";

import { logger } from "../config/logger.js";

export const hanghoaController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /hanghoas");
      const hanghoas = await hanghoaService.getAllhanghoas();
      res.json(hanghoas);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getByMaLoai: async (req, res) => {
    const MaLoai = +req.params.MaLoai;
    logger.info(`Controller: GET /hanghoas/maloai/${MaLoai}`);

    try {
      const hanghoa = await hanghoaService.getHanghoaByMaLoai(MaLoai);
      res.json(hanghoa);
    } catch (err) {
      logger.error(`Controller Error: getByMaLoai failed (${MaLoai})`, err);
      res.status(404).json({ message: err.message });
    }
  },
  getByTenLoai: async (req, res) => {
    const name = req.params.name;
    logger.info(`Controller: GET /hanghoas/tenloai/${name}`);

    try {
      const hanghoa = await hanghoaService.getHangHoaByTenLoai(name);
      res.json(hanghoa);
    } catch (err) {
      logger.error(`Controller Error: getByTenLoai failed (${name})`, err);
      res.status(404).json({ message: err.message });
    }
  },
  getByHangHoaSoLuongConNhoHon5: async (req, res) => {
    logger.info(`Controller: GET /hanghoas/soluongcon/nhonhon5`);
    try {
        const hanghoas = await hanghoaService.getHangHoaSoLuongConNhoHon5();
        res.json(hanghoas);
    }
    catch (err) {
        logger.error("Controller Error: getByHangHoaSoLuongConNhoHon5 failed", err);
        res.status(404).json({ message: err.message });
    }
  },
  getHangHoaCoGiaTrongKhoang: async (req, res) => {
    const minPrice = +req.params.minPrice;
    const maxPrice = +req.params.maxPrice;
    logger.info(`Controller: GET /hanghoas/giakhoang/${minPrice}/${maxPrice}`);
    try {
        const hanghoas = await hanghoaService.getHangHoaCoGiaTrongKhoang(minPrice, maxPrice);
        res.json(hanghoas);
    }
    catch (err) {
        logger.error(`Controller Error: getHangHoaCoGiaTrongKhoang failed (${minPrice} - ${maxPrice})`, err);
        res.status(404).json({ message: err.message });
    }
  },

  getGiaBanByMaHang: async (req, res) => {
    const MaHang = +req.params.MaHang;
    logger.info(`Controller: GET /hanghoas/giahanghoa/${MaHang}`);
    try {
        const giaHang = await hanghoaService.getGiaHangHoaCoMa(MaHang);
        res.json(giaHang);
    }
    catch (err) {
        logger.error(`Controller Error: getGiaBanByMaHang failed (${MaHang})`, err);
        res.status(404).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      logger.info("Controller: POST /hanghoas");

      // VALIDATE INPUT
      const validData = validateCreateHangHoa(req.body);

      // CREATE DTO
      const dto = new CreateHangHoaDTO(validData);

      const hanghoa = await hanghoaService.createhanghoa(dto);
      res.status(201).json(hanghoa);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const MaHang = +req.params.MaHang;
    logger.info(`Controller: PUT /hanghoas/${MaHang}`);

    try {
      // VALIDATE INPUT
      const validData = validateUpdateHangHoa(req.body);

      // CREATE DTO
      const dto = new UpdateHangHoaDTO(validData);

      const hanghoa = await hanghoaService.updatehanghoa(MaHang, dto);
      res.json(hanghoa);
    } catch (err) {
      logger.error(`Controller Error: update failed (${MaHang})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const MaHang = +req.params.MaHang;
    logger.info(`Controller: DELETE /hanghoas/${MaHang}`);

    try {
      const result = await hanghoaService.deletehanghoa(MaHang);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${MaHang})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
