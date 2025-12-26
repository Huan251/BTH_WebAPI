// repositories/sanpham.repository.js
import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const sanPhamRepository = {
  getAll: async () => {
    const con = await pool.getConnection();
    try {
      const [rows] = await con.execute("SELECT * FROM SanPham;");
      return rows;
    } finally {
      con.release();
    }
  },

  getById: async (ma_sp) => {
    const con = await pool.getConnection();
    try {
      const [rows] = await con.execute(
        "SELECT * FROM SanPham WHERE ma_sp = ?",
        [ma_sp]
      );
      return rows[0];
    } finally {
      con.release();
    }
  },

  getByDanhMuc: async (ma_danh_muc) => {
    const con = await pool.getConnection();
    try {
      const [rows] = await con.execute(`
        SELECT sp.*, dm.ten_danh_muc, ncc.ten_ncc
        FROM SanPham sp
        JOIN DanhMuc dm ON sp.ma_danh_muc = dm.ma_danh_muc
        JOIN NhaCungCap ncc ON sp.ma_ncc = ncc.ma_ncc
        WHERE sp.ma_danh_muc = ?
      `, [ma_danh_muc]);
      return rows;
    } finally {
      con.release();
    }
  },

  getDaNhapTheoNCC: async (ma_ncc) => {
    const con = await pool.getConnection();
    try {
      const [rows] = await con.execute(`
        SELECT 
          sp.ma_sp, sp.ten_sp, sp.gia_ban, sp.gia_nhap, sp.so_luong_ton, sp.mo_ta,
          dm.ten_danh_muc, ncc.ten_ncc,
          pn.ma_phieu_nhap, pn.ngay_nhap,
          ctpn.so_luong AS so_luong_nhap, ctpn.don_gia_nhap
        FROM ChiTiet_PhieuNhap ctpn
        JOIN PhieuNhap pn ON ctpn.ma_phieu_nhap = pn.ma_phieu_nhap
        JOIN SanPham sp ON ctpn.ma_sp = sp.ma_sp
        JOIN NhaCungCap ncc ON sp.ma_ncc = ncc.ma_ncc
        JOIN DanhMuc dm ON sp.ma_danh_muc = dm.ma_danh_muc
        WHERE ncc.ma_ncc = ?
        ORDER BY pn.ngay_nhap DESC
      `, [ma_ncc]);
      return rows;
    } finally {
      con.release();
    }
  },

  getDaBanTheoKH: async (ma_kh) => {
    const con = await pool.getConnection();
    try {
      const [rows] = await con.execute(`
        SELECT 
          sp.ma_sp, sp.ten_sp, sp.gia_ban, sp.mo_ta,
          dm.ten_danh_muc,
          hd.ma_hd, hd.ngay_ban, hd.tong_tien,
          kh.ten_kh,
          cthd.so_luong AS so_luong_ban, cthd.don_gia_ban
        FROM ChiTiet_HoaDon cthd
        JOIN HoaDon hd ON cthd.ma_hd = hd.ma_hd
        JOIN SanPham sp ON cthd.ma_sp = sp.ma_sp
        JOIN KhachHang kh ON hd.ma_kh = kh.ma_kh
        JOIN DanhMuc dm ON sp.ma_danh_muc = dm.ma_danh_muc
        WHERE kh.ma_kh = ?
        ORDER BY hd.ngay_ban DESC
      `, [ma_kh]);
      return rows;
    } finally {
      con.release();
    }
  },

  existsById: async (ma_sp) => {
    const con = await pool.getConnection();
    try {
      const [rows] = await con.execute(
        "SELECT ma_sp FROM SanPham WHERE ma_sp=?",
        [ma_sp]
      );
      return rows.length > 0;
    } finally {
      con.release();
    }
  },

  checkDanhMuc: async (ma_danh_muc) => {
    const con = await pool.getConnection();
    try {
      const [rows] = await con.execute(
        "SELECT ma_danh_muc FROM DanhMuc WHERE ma_danh_muc=?",
        [ma_danh_muc]
      );
      return rows.length > 0;
    } finally {
      con.release();
    }
  },

  checkNCC: async (ma_ncc) => {
    const con = await pool.getConnection();
    try {
      const [rows] = await con.execute(
        "SELECT ma_ncc FROM NhaCungCap WHERE ma_ncc=?",
        [ma_ncc]
      );
      return rows.length > 0;
    } finally {
      con.release();
    }
  },

  create: async (payload) => {
    const con = await pool.getConnection();
    try {
      await con.execute(`
        INSERT INTO SanPham
        (ma_sp, ten_sp, ma_danh_muc, ma_ncc, gia_ban, gia_nhap, so_luong_ton, mo_ta)
        VALUES (?,?,?,?,?,?,?,?)
      `, [
        payload.ma_sp,
        payload.ten_sp,
        payload.ma_danh_muc,
        payload.ma_ncc,
        payload.gia_ban,
        payload.gia_nhap,
        payload.so_luong_ton,
        payload.mo_ta
      ]);
    } finally {
      con.release();
    }
  },

    update: async (payload) => {
    const { ma_sp, ...fields } = payload;

    const keys = Object.keys(fields);
    if (keys.length === 0) return 0;

    const setClause = keys
  .map(k =>
    k.endsWith("_sql") ? k.replace("_sql", "") + " = " + fields[k] : `${k} = ?`
  )
  .join(", ");

const values = keys
  .filter(k => !k.endsWith("_sql"))
  .map(k => fields[k]);

   const con = await pool.getConnection();
        try {
        const [result] = await con.execute(
            `UPDATE SanPham SET ${setClause} WHERE ma_sp = ?`,
            [...values, ma_sp]
        );
        return result.affectedRows;
        } finally {
        con.release();
        }
    },
};
