import express from "express";
import { SachRepository } from "../repositories/sach.js";

const router = express.Router();


// --- Tìm theo tên sách (chứa chuỗi)
router.get("/search/tensach", async (req, res) => {
  try {
    const { ten } = req.query;
    if (!ten) return res.status(400).json({ message: "Vui lòng nhập tên sách" });
    const data = await SachRepository.searchTenSach(ten);
    if (!data.length) return res.status(404).json({ message: "Không tìm thấy sách" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Tìm theo tác giả
router.get("/search/tacgia", async (req, res) => {
  try {
    const { tacgia } = req.query;
    if (!tacgia) return res.status(400).json({ message: "Vui lòng nhập tên tác giả" });
    const data = await SachRepository.searchTacGia(tacgia);
    if (!data.length) return res.status(404).json({ message: "Không tìm thấy sách" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Tìm theo nhà xuất bản
router.get("/search/nxb", async (req, res) => {
  try {
    const { nxb } = req.query;
    if (!nxb) return res.status(400).json({ message: "Vui lòng nhập NXB" });
    const data = await SachRepository.searchNXB(nxb);
    if (!data.length) return res.status(404).json({ message: "Không tìm thấy sách" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Sách mới 5 năm gần đây
router.get("/search/moi", async (req, res) => {
  try {
    const data = await SachRepository.searchSachMoi();
    if (!data.length) return res.status(404).json({ message: "Không có sách mới" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- GET tất cả sách
router.get("/", async (req, res) => {
  try {
    const data = await SachRepository.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- GET sách theo MASH
router.get("/:id", async (req, res) => {
  try {
    const data = await SachRepository.getById(req.params.id);
    if (!data) return res.status(404).json({ message: "Không tìm thấy sách" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- POST thêm sách
router.post("/", async (req, res) => {
  try {
    const { TENSACH, TACGIA, NHAXB, NAMXB } = req.body;
    if (!TENSACH || !TACGIA || !NHAXB || !NAMXB)
      return res.status(400).json({ message: "Thiếu thông tin sách" });
    const id = await SachRepository.create({ TENSACH, TACGIA, NHAXB, NAMXB });
    res.status(201).json({ message: "Thêm sách thành công", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- PUT cập nhật sách
router.put("/:id", async (req, res) => {
  try {
    const { TENSACH, TACGIA, NHAXB, NAMXB } = req.body;
    const ok = await SachRepository.update(req.params.id, { TENSACH, TACGIA, NHAXB, NAMXB });
    if (!ok) return res.status(404).json({ message: "Không tìm thấy sách" });
    res.json({ message: "Cập nhật sách thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- DELETE sách
router.delete("/:id", async (req, res) => {
  try {
    const ok = await SachRepository.delete(req.params.id);
    if (!ok) return res.status(404).json({ message: "Không tìm thấy sách" });
    res.json({ message: "Xóa sách thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
