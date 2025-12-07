import { giabanService } from "../services/giaban.service.js";
import { CreateGiaBanDTO } from "../dtos/giabans/create-giaban.dto.js";
import { UpdateGiaBanDTO } from "../dtos/giabans/update-giaban.dto.js";
import { validateCreateGiaBan } from "../validators/giaban/create-giaban.validator.js";
import { validateUpdateGiaBan } from "../validators/giaban/update-giaban.validator.js";
import { logger } from "../config/logger.js";

export const giabanController = {
    getAll: async (req, res) => {
        try {
        logger.info("Controller: GET /giabans");
        const giabans = await giabanService.getAllGiaBans();
        res.json(giabans);
        } catch (err) {
        logger.error("Controller Error: getAll failed", err);
        res.status(500).json({ message: err.message });
        }
    },
    
    getGiaBanCuaMaHang: async (req, res) => {
        const MaHang = req.params.MaHang;
        logger.info(`Controller: GET /giabans/${MaHang}`);
        try {
            const giaban = await giabanService.getGiabanByMaHang(MaHang);
            res.json(giaban);
        }
        catch (err) {
            logger.error(`Controller Error: getGiaBanCuaMaHang failed (${MaHang})`, err);
            res.status(404).json({ message: err.message });
        }
    },
    getGiaHangVaoThoiDiemHienTai: async (req, res) => {
        const MaHang = req.params.MaHang;
        logger.info(`Controller: GET /giabans/giabanhientai/${MaHang}`);
        try {
            const giaHang = await giabanService.getGiaHangVaoThoiDiemHienTai(MaHang);
            res.json(giaHang);
        }
        catch (err) {
            logger.error(`Controller Error: getGiaHangVaoThoiDiemHienTai failed (${MaHang})`, err);
            res.status(404).json({ message: err.message });
        }
    },
//   getById: async (req, res) => {
//     const id = +req.params.id;
//     logger.info(`Controller: GET /users/${id}`);

//     try {
//       const user = await userService.getUserById(id);
//       res.json(user);
//     } catch (err) {
//       logger.error(`Controller Error: getById failed (${id})`, err);
//       res.status(404).json({ message: err.message });
//     }
//   },

  create: async (req, res) => {
    try {
      logger.info("Controller: POST /giabans");
      // VALIDATE INPUT
      const validData = validateCreateGiaBan(req.body);
      // CREATE DTO
      const dto = new CreateGiaBanDTO(validData);
      const giaban = await giabanService.createGiaBan(dto);
      res.status(201).json(giaban);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const MaGB = +req.params.MaGB;
    logger.info(`Controller: PUT /giabans/${MaGB}`);
    try {
      // VALIDATE INPUT
      const validData = validateUpdateGiaBan(req.body);
      // CREATE DTO
      const dto = new UpdateGiaBanDTO(validData);
      const giaban = await giabanService.updateGiaBan(MaGB, dto);
      res.json(giaban);
    } catch (err) {
      logger.error(`Controller Error: update failed (${MaGB})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const MaGB = +req.params.MaGB;
    logger.info(`Controller: DELETE /giabans/${MaGB}`);

    try {
      const result = await giabanService.deleteGiaBan(MaGB);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${MaGB})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
