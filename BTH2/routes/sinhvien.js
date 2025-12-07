import express from "express";
import { SinhVienRepository } from "../repositories/sinhvien.js";
import createError from "http-errors";

const router = express.Router();

// ==================== CRUD ====================

// --- GET tất cả sinh viên
router.get("/", async (req, res, next) => {
    try {
        const data = await SinhVienRepository.getAll();
        res.json(data);
    } catch (err) {
        next(createError(500, err.message));
    }
});

// --- GET sinh viên theo MaSV
router.get("/:id", async (req, res, next) => {
    try {
        const data = await SinhVienRepository.getById(req.params.id);
        if (!data) return next(createError(404, "Không tìm thấy sinh viên"));
        res.json(data);
    } catch (err) {
        next(createError(500, err.message));
    }
});

// --- POST thêm sinh viên
router.post("/", async (req, res, next) => {
    try {
        const { MaSV, TenSV, GioiTinh, DiaChi, NgaySinh } = req.body;
        if (!MaSV || !TenSV || !NgaySinh)
            return next(createError(400, "Thiếu thông tin bắt buộc (MaSV, TenSV, NgaySinh)"));
        
        const id = await SinhVienRepository.create({ MaSV, TenSV, GioiTinh, DiaChi, NgaySinh });
        
        // Kiểm tra nếu MaSV đã tồn tại (nếu DB trả về lỗi E11000/Duplicate Key)
        if (!id) return next(createError(400, "MaSV đã tồn tại hoặc không thể tạo"));

        res.status(201).json({ message: "Thêm sinh viên thành công", id });
    } catch (err) {
        // Lỗi trùng MaSV thường được DB trả về lỗi 500 (Duplicate entry), nên dùng next() để middleware xử lý
        next(createError(500, err.message)); 
    }
});

// --- PUT cập nhật sinh viên
router.put("/:id", async (req, res, next) => {
    try {
        const { TenSV, GioiTinh, DiaChi, NgaySinh } = req.body;
        // Giả định ít nhất phải có NgaySinh hoặc TenSV để update
        if (!TenSV && !NgaySinh && !GioiTinh && !DiaChi)
            return next(createError(400, "Không có dữ liệu để cập nhật"));

        const ok = await SinhVienRepository.update(req.params.id, { TenSV, GioiTinh, DiaChi, NgaySinh });
        
        if (ok === 0) return next(createError(404, "Không tìm thấy sinh viên để cập nhật"));

        res.json({ message: "Cập nhật sinh viên thành công" });
    } catch (err) {
        next(createError(500, err.message));
    }
});

// --- DELETE sinh viên
router.delete("/:id", async (req, res, next) => {
    try {
        const ok = await SinhVienRepository.delete(req.params.id);
        if (ok === 0) return next(createError(404, "Không tìm thấy sinh viên để xóa"));
        res.json({ message: "Xóa sinh viên thành công" });
    } catch (err) {
        next(createError(500, err.message));
    }
});


// --- 1. Tìm theo địa chỉ (Diachi chứa tham số)
router.get("/search/diachi", async (req, res, next) => {
    try {
        const { diachi } = req.query;
        if (!diachi) return next(createError(400, "Vui lòng nhập địa chỉ"));
        const data = await SinhVienRepository.searchByDiaChi(diachi);
        if (!data.length) return next(createError(404, "Không tìm thấy sinh viên ở địa chỉ này"));
        res.json(data);
    } catch (err) {
        next(createError(500, err.message));
    }
});

// --- 2. Tìm theo tên (TenSV chứa tham số)
router.get("/search/ten", async (req, res, next) => {
    try {
        const { ten } = req.query;
        if (!ten) return next(createError(400, "Vui lòng nhập tên sinh viên"));
        const data = await SinhVienRepository.searchByTenSV(ten);
        if (!data.length) return next(createError(404, "Không tìm thấy sinh viên có tên chứa từ khóa"));
        res.json(data);
    } catch (err) {
        next(createError(500, err.message));
    }
});

// --- 3. Tìm sinh viên trên 20 tuổi
router.get("/search/tren20", async (req, res, next) => {
    try {
        const data = await SinhVienRepository.searchOver20();
        if (!data.length) return next(createError(404, "Không tìm thấy sinh viên trên 20 tuổi"));
        res.json(data);
    } catch (err) {
        next(createError(500, err.message));
    }
});

export default router;