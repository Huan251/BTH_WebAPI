import express from 'express';
import * as nhanvienRepo from '../repositories/nhanvien.js';

const router = express.Router();

const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

router.get('/', async (req, res) => {
  try {
    const filters = {
      maNV: req.query.maNV,
      tenNV: req.query.tenNV,
      gioiTinh: req.query.gioiTinh,
      sdt: req.query.sdt,
      email: req.query.email,
      ngaySinh: req.query.ngaySinh
    };
    const data = await nhanvienRepo.getNhanVien(filters);

    // Format ngày sinh
    const formattedData = data.map(nv => ({
      ...nv,
      NgaySinh: formatDate(nv.NgaySinh)
    }));

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// PUT /api/nhanvien
router.put('/', async (req, res) => {
  const nhanVien = req.body;
  if (!nhanVien.maNV) return res.status(400).json({ message: 'Thiếu mã nhân viên' });

  try {
    const result = await nhanvienRepo.updateNhanVien(nhanVien);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên với maNV này' });
    }
    res.json({ message: 'Cập nhật thành công', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// DELETE /api/nhanvien/:maNV
router.delete('/:maNV', async (req, res) => {
  const { maNV } = req.params;
  if (!maNV) return res.status(400).json({ message: 'Thiếu mã nhân viên' });

  try {
    const result = await nhanvienRepo.deleteNhanVien(maNV);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên với maNV này' });
    }
    res.json({ message: 'Xóa nhân viên thành công', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

export default router;
