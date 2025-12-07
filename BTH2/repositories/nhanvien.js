import { pool } from '../services/mysql.js';

// Lấy danh sách nhân viên 
export const getNhanVien = async (filters) => {
  let sql = 'SELECT * FROM NHANVIEN WHERE 1=1';
  const params = [];

  if (filters.maNV) {
    sql += ' AND maNV = ?';
    params.push(filters.maNV);
  }
  if (filters.tenNV) {
    sql += ' AND TenNV LIKE ?';
    params.push(`%${filters.tenNV}%`);
  }
  if (filters.gioiTinh) {
    sql += ' AND GioiTinh = ?';
    params.push(filters.gioiTinh);
  }
  if (filters.sdt) {
    sql += ' AND SDT = ?';
    params.push(filters.sdt);
  }
  if (filters.email) {
    sql += ' AND email LIKE ?';
    params.push(`%${filters.email}%`);
  }
  if (filters.ngaySinh) {
    sql += ' AND NgaySinh = ?';
    params.push(filters.ngaySinh);
  }

  const [rows] = await pool.execute(sql, params);
  return rows;
};

// Cập nhật thông tin nhân viên theo maNV
export const updateNhanVien = async (nhanVien) => {
  const { maNV, TenNV, GioiTinh, NgaySinh, email, SDT } = nhanVien;
  const [result] = await pool.execute(
    'UPDATE NHANVIEN SET TenNV = ?, GioiTinh = ?, NgaySinh = ?, email = ?, SDT = ? WHERE maNV = ?',
    [TenNV, GioiTinh, NgaySinh, email, SDT, maNV]
  );
  return result;
};

// Xóa nhân viên theo maNV
export const deleteNhanVien = async (maNV) => {
  const [result] = await pool.execute(
    'DELETE FROM NHANVIEN WHERE maNV = ?',
    [maNV]
  );
  return result;
};