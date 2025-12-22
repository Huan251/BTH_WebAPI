import { Router } from "express";

import { danhMucController } from "../controllers/danhmuc.controller.js";
import { nhaCungCapController } from "../controllers/nhacungcap.controller.js";
import { sanPhamController } from "../controllers/sanpham.controller.js";
import { phieuNhapController } from "../controllers/phieunhap.controller.js";
import { chiTietPNController } from "../controllers/chitiet_phieunhap.controller.js";
import { khachHangController } from "../controllers/khachhang.controller.js";
import { hoaDonController } from "../controllers/hoadon.controller.js";
import { chiTietHoaDonController } from "../controllers/chitiet_hoadon.controller.js";

const router = Router();

// =============================== Danh Mục ===============================
router.get("/danhmuc", danhMucController.layTatCaDanhMuc);
router.get("/danhmuc/:ma_danh_muc", danhMucController.layDanhMucTheoMa);

router.post("/danhmuc", danhMucController.themDanhMuc);

router.put("/danhmuc/:ma_danh_muc", danhMucController.suaDanhMuc);

// =============================== Nhà Cung Cấp ===============================
router.get("/nhacungcap", nhaCungCapController.layTatCaNhaCungCap);
router.get("/nhacungcap/:ma_ncc", nhaCungCapController.layNCCTheoMa);

router.post("/nhacungcap", nhaCungCapController.themNhaCungCap);

router.put("/nhacungcap/:ma_ncc", nhaCungCapController.suaNhaCungCap);

// =============================== Sản Phẩm ===============================
router.get("/sanpham", sanPhamController.layTatCaSanPham);
router.get("/sanpham/:ma_sp", sanPhamController.laySanPhamTheoMa);
router.get("/sanpham/ncc/:ma_ncc", sanPhamController.laySanPhamDaNhapTheoNCC);
router.get("/sanpham/danhmuc/:ma_danh_muc", sanPhamController.laySanPhamTheoDanhMuc);
router.get("/sanpham/kh/:ma_kh", sanPhamController.laySanPhamDaBanTheoKH);

router.post("/sanpham", sanPhamController.themSanPham);

router.put("/sanpham/:ma_sp", sanPhamController.suaSanPham);

// =============================== Phiếu Nhập ===============================
router.get("/phieunhap", phieuNhapController.layTatCaPhieuNhap);
router.get("/phieunhap/thangnam", phieuNhapController.layPhieuNhapTheoThangNam);
router.get("/phieunhap/:ma_phieu_nhap", phieuNhapController.layPhieuNhapTheoMa);
router.get("/phieunhap/ncc/:ma_ncc", phieuNhapController.layPhieuNhapTheoNCC);

router.post("/phieunhap", phieuNhapController.themPhieuNhap);

router.put("/phieunhap/:ma_phieu_nhap", phieuNhapController.suaPhieuNhap);

// =============================== Chi Tiết Phiếu Nhập ===============================
router.get("/ctpn", chiTietPNController.layTatCaCTPhieuNhap);
router.get("/ctpn/:ma_ctpn", chiTietPNController.layCTPNTheoMa);

router.post("/ctpn", chiTietPNController.themChiTietPhieuNhap);

router.put("/ctpn/:ma_ctpn", chiTietPNController.suaChiTietPhieuNhap);

// =============================== Khách Hàng ===============================
router.get("/khachhang", khachHangController.layTatCaKhachHang);
router.get("/khachhang/:ma_kh", khachHangController.layKhachHangTheoMa);

router.post("/khachhang", khachHangController.themKhachHang);

// =============================== Hóa Đơn ===============================
router.get("/hoadon", hoaDonController.layTatCaHoaDon);
router.get("/hoadon/thangnam", hoaDonController.layHoaDonTheoThangNam);
router.get("/hoadon/:ma_hd/chi-tiet", hoaDonController.layChiTietHoaDonTheoMaHD);
router.get("/hoadon/:ma_hd", hoaDonController.layHoaDonTheoMa);
router.get("/hoadon/kh/:ma_kh", hoaDonController.layHoaDonTheoKH);

router.post("/hoadon", hoaDonController.themHoaDon);

router.put("/hoadon/:ma_hd", hoaDonController.suaHoaDon);

// =============================== Chi Tiết Hóa Đơn ===============================
router.get("/cthd", chiTietHoaDonController.layTatCaCTHoaDon);
router.get("/cthd/:ma_cthd", chiTietHoaDonController.layCTHDTheoMa);

router.post("/cthd", chiTietHoaDonController.themChiTietHoaDon);

router.put("/cthd/:ma_cthd", chiTietHoaDonController.suaChiTietHoaDon);

// =============================== ===============================
export default router;
