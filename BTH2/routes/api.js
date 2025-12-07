import express from "express";
import nhanvienRoutes from "./nhanvien.js"; // route CRUD NhanVien
import sachRoutes from "./sach.js";
import sinhvienRoutes from "./sinhvien.js"; // Import route SinhVien mới

const router = express.Router();

// --- Route mặc định để test API
router.get("/", (req, res) => {
  res.json({ message: "Welcome to API route 🚀" });
});

// --- Gắn route NhanVien
router.use("/nhanvien", nhanvienRoutes);

// --- Gắn route Sach
router.use("/sach", sachRoutes);

// --- Gắn route SinhVien (MỚI)
router.use("/sinhvien", sinhvienRoutes);

export default router;