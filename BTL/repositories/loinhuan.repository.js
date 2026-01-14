import { pool } from "../config/database.js";

const loiNhuanRepository = {
  getLoiNhuanTheoSanPham: async () => {
    const [rows] = await pool.query(`
SELECT
  sp.ma_sp,
  sp.ten_sp,

  SUM(cthd.so_luong) AS tong_so_luong_ban,
  SUM(cthd.so_luong * cthd.don_gia_ban) AS doanh_thu,

  (
    SELECT
      SUM(ctpn.so_luong * ctpn.don_gia_nhap)
      / NULLIF(SUM(ctpn.so_luong), 0)
    FROM ChiTiet_PhieuNhap ctpn
    WHERE ctpn.ma_sp = sp.ma_sp
  ) AS gia_nhap_tb

FROM SanPham sp
LEFT JOIN ChiTiet_HoaDon cthd
  ON sp.ma_sp = cthd.ma_sp
GROUP BY sp.ma_sp, sp.ten_sp
    `);

    return rows;
  },
    getTheoThang: async () => {
    const db = await pool;
    const [rows] = await db.query(`
      SELECT
  t.thang,
  t.doanh_thu,
  IFNULL(n.gia_nhap, 0) AS gia_nhap
FROM
(
  -- DOANH THU THEO THÁNG
  SELECT
    DATE_FORMAT(hd.ngay_ban, '%Y-%m') AS thang,
    SUM(cthd.so_luong * cthd.don_gia_ban) AS doanh_thu
  FROM ChiTiet_HoaDon cthd
  JOIN HoaDon hd ON hd.ma_hd = cthd.ma_hd
  GROUP BY DATE_FORMAT(hd.ngay_ban, '%Y-%m')
) t
LEFT JOIN
(
  -- GIÁ NHẬP THEO THÁNG
  SELECT
    DATE_FORMAT(pn.ngay_nhap, '%Y-%m') AS thang,
    SUM(ctpn.so_luong * ctpn.don_gia_nhap) AS gia_nhap
  FROM ChiTiet_PhieuNhap ctpn
  JOIN PhieuNhap pn ON pn.ma_phieu_nhap = ctpn.ma_phieu_nhap
  GROUP BY DATE_FORMAT(pn.ngay_nhap, '%Y-%m')
) n
ON t.thang = n.thang
ORDER BY t.thang;

    `);

    return rows;
  }
  
};

export default loiNhuanRepository;
