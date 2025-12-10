// controllers/danhmuc.controller.js

import { pool } from "../config/database.js";
import httpErrors from "http-errors";

/**
 *  Lấy danh sách tất cả Danh Mục (GET /api/danhmucs)
 */
const getAll = async (req, res, next) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const query = `
      SELECT 
        MaDanhMuc, 
        TenDanhMuc 
      FROM 
        DanhMuc;
    `;

    const [rows] = await connection.execute(query);
    // Trả về mảng danh mục
    res.status(200).json(rows);
    
  } catch (error) {
    next(httpErrors(500, `Lỗi truy vấn database Danh Mục: ${error.message}`));
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getByMaDanhMuc = async (req, res, next) => {
  let connection;
  try {
    // 1. Lấy tham số maDanhMuc từ URL
    const { maDanhMuc } = req.params; 

    connection = await pool.getConnection();

    // 2. Câu truy vấn SQL sử dụng WHERE để lọc theo MaDanhMuc
    const query = `
      SELECT 
        SP.Ma AS MaSanPham, 
        SP.Ten AS TenSanPham, 
        SP.DonGia, 
        DM.TenDanhMuc 
      FROM 
        SanPham AS SP
      JOIN 
        DanhMuc AS DM ON SP.MaDanhMuc = DM.MaDanhMuc
      WHERE 
        SP.MaDanhMuc = ?;
    `;

    // 3. Thực thi truy vấn
    const [rows] = await connection.execute(query, [maDanhMuc]);

    // 4. Nếu không tìm thấy sản phẩm nào trong danh mục này
    if (rows.length === 0) {
      return res.status(200).json({
          message: `Không tìm thấy sản phẩm nào thuộc Mã Danh Mục: ${maDanhMuc}.`,
          data: []
      });
    }

    // 5. Trả về danh sách sản phẩm
    res.status(200).json(rows); 

  } catch (error) {
    next(httpErrors(500, `Lỗi khi lấy sản phẩm theo danh mục: ${error.message}`));
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const danhmucController = {
  getAll,
  getByMaDanhMuc,
};