import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { hanghoaController } from "../controllers/hanghoa.controller.js";
import { giabanController } from "../controllers/giaban.controller.js";

const router = Router();
// -------------------------Users---------------------------------------
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);
// -------------------------Hanghoas---------------------------------------
router.get("/hanghoas", hanghoaController.getAll);
router.get("/hanghoas/:MaLoai", hanghoaController.getByMaLoai);
router.get("/hanghoas/tenloai/:name", hanghoaController.getByTenLoai);
router.get("/hanghoas/soluongcon/nhonhon5", hanghoaController.getByHangHoaSoLuongConNhoHon5);
router.get("/hanghoas/giakhoang/:minPrice/:maxPrice", hanghoaController.getHangHoaCoGiaTrongKhoang);
router.get("/hanghoas/gia/:MaHang", hanghoaController.getGiaBanByMaHang);
router.post("/hanghoas", hanghoaController.create);
router.put("/hanghoas/:MaHang", hanghoaController.update);
router.delete("/hanghoas/:MaHang", hanghoaController.delete);
// -------------------------GiaBans---------------------------------------
router.get("/giabans", giabanController.getAll);
router.get("/giabans/mahang/:MaHang", giabanController.getGiaBanCuaMaHang);
router.get("/giabans/giabanhientai/:MaHang", giabanController.getGiaHangVaoThoiDiemHienTai);
router.post("/giabans", giabanController.create);
router.put("/giabans/:MaGB", giabanController.update);
router.delete("/giabans/:MaGB", giabanController.delete);
export default router;

