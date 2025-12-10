// routes/api.js (PHIÊN BẢN ĐÃ SỬA LỖI THỨ TỰ GET)

import { Router } from "express";
import { sanphamController } from "../controllers/sanpham.controller.js"; 
import { danhmucController } from "../controllers/danhmuc.controller.js";
import { nhanvienController } from "../controllers/nhanvien.controller.js";
import { phongbanController } from "../controllers/phongban.controller.js";
import { congtrinhController } from "../controllers/congtrinh.controller.js";
import { congController } from "../controllers/cong.controller.js";

const router = Router();

// -------------------------SanPham ----------------
router.get("/sanpham", sanphamController.getSXDonGia);

router.get("/sanpham/timkiem", sanphamController.timKiemTen);

router.get("/sanpham", sanphamController.getAll); 
router.post("/sanpham", sanphamController.themSP);

router.get("/sanpham/:Ma", sanphamController.getById); 
router.put("/sanpham/:Ma", sanphamController.capnhapSP);
router.delete("/sanpham/:Ma", sanphamController.xoaSP);

router.get("/thongke/sanpham-danhmuc", sanphamController.thongKeSanPhamTheoDanhMuc);

// -------------------------DanhMuc --------------------------
router.get("/danhmuc", danhmucController.getAll);
router.get("/danhmuc/:maDanhMuc/sanpham", sanphamController.getByMaDanhMuc);

// -------------------------NhanVien --------------------------
router.get("/nhanvien", nhanvienController.getAll);
router.get("/nhanvien/:manv", nhanvienController.getById);
router.post("/nhanvien", nhanvienController.themNV); 
router.put("/nhanvien/:manv", nhanvienController.capnhapNV);
router.delete("/nhanvien/:manv", nhanvienController.xoaNV);

//-------------------------PhongBan --------------------------

router.get("/phongban", phongbanController.getAllPB);
//-------------------------CongTrinh --------------------------
router.get("/congtrinh", congtrinhController.getAllCT);

//-------------------------Cong --------------------------
router.post("/cong", congController.phanCong);
router.get("/thongke/nhanvien/:manv/ngaycong", congController.thongKeNgayCong);


export default router;
