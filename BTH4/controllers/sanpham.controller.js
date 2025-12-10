// controllers/sanpham.controller.js
import { pool } from "../config/database.js";
import httpErrors from "http-errors";

/**
 * Hàm lấy danh sách tất cả sản phẩm 
 * Trả về MaSanPham, TenSanPham, DonGia, TenDanhMuc.
 */
const getAll = async (req, res, next) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const query = `
      SELECT 
        SP.Ma AS MaSanPham, 
        SP.Ten AS TenSanPham, 
        SP.DonGia, 
        DM.TenDanhMuc 
      FROM 
        SanPham AS SP
      JOIN 
        DanhMuc AS DM ON SP.MaDanhMuc = DM.MaDanhMuc;
    `;
    const [rows] = await connection.execute(query);
    res.status(200).json(rows); 
  } catch (error) {
    next(httpErrors(500, `Lỗi truy vấn database: ${error.message}`));
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

/**
 *  Lấy thông tin chi tiết của một sản phẩm theo Mã
 * Trả về đầy đủ thông tin sản phẩm và danh mục.
 */
const getById = async (req, res, next) => {
  let connection;
  try {
    const { Ma } = req.params; 
    connection = await pool.getConnection();
    const query = `
      SELECT 
        SP.Ma AS MaSanPham, 
        SP.Ten AS TenSanPham, 
        SP.DonGia, 
        DM.MaDanhMuc,
        DM.TenDanhMuc 
      FROM 
        SanPham AS SP
      JOIN 
        DanhMuc AS DM ON SP.MaDanhMuc = DM.MaDanhMuc
      WHERE 
        SP.Ma = ?;
    `;
    const [rows] = await connection.execute(query, [Ma]);
    
    if (rows.length === 0) {
      return next(httpErrors(404, `Không tìm thấy sản phẩm với Mã: ${Ma}`));
    }
    
    res.status(200).json(rows[0]); 
  } catch (error) {
    next(httpErrors(500, `Lỗi khi lấy chi tiết sản phẩm: ${error.message}`));
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

/**
 * Lấy danh sách sản phẩm theo Mã Danh Mục 
 */
const getByMaDanhMuc = async (req, res, next) => {
  let connection;
  try {
    const { maDanhMuc } = req.params; 

    connection = await pool.getConnection();

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

    const [rows] = await connection.execute(query, [maDanhMuc]);

    res.status(200).json(rows); 

  } catch (error) {
    next(httpErrors(500, `Lỗi khi lấy sản phẩm theo danh mục: ${error.message}`));
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

/**
 * Thêm sản phẩm mới
 */
const themSP = async (req, res, next) => {
    let connection;
    try {
        // Yêu cầu: Ma, Ten, DonGia, MaDanhMuc
        const { Ma, Ten, DonGia, MaDanhMuc } = req.body;
        
        // Kiểm tra thiếu trường bắt buộc
        if (!Ma || !Ten || !DonGia || !MaDanhMuc) {
            return next(httpErrors(400, "Thiếu trường bắt buộc (Ma, Ten, DonGia, MaDanhMuc)."));
        }

        connection = await pool.getConnection();
        const query = `
            INSERT INTO SanPham (Ma, Ten, DonGia, MaDanhMuc)
            VALUES (?, ?, ?, ?);
        `;
        await connection.execute(query, [Ma, Ten, DonGia, MaDanhMuc]);

        res.status(201).json({
            message: "Thêm sản phẩm mới thành công."
        });
    } catch (error) {
        // Xử lý lỗi trùng Mã 
        if (error.code === 'ER_DUP_ENTRY') {
             return next(httpErrors(409, `Mã sản phẩm '${req.body.Ma}' đã tồn tại.`));
        }
        // Xử lý lỗi MaDanhMuc không hợp lệ
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
             return next(httpErrors(400, `MaDanhMuc '${req.body.MaDanhMuc}' không hợp lệ hoặc không tồn tại.`));
        }
        next(httpErrors(500, `Lỗi khi thêm sản phẩm: ${error.message}`));
    } finally {
        if (connection) {
            connection.release(); 
        }
    }
};

/**
 * Cập nhật thông tin sản phẩm 
 */
const capnhapSP = async (req, res, next) => {
    let connection;
    try {
        // Lấy Mã sản phẩm cần cập nhật 
        const { Ma } = req.params;
        // Lấy dữ liệu cập nhật từ Body
        const { Ten, DonGia, MaDanhMuc } = req.body;

        // Kiểm tra thiếu trường bắt buộc
        if (!Ten && !DonGia && !MaDanhMuc) {
            return next(httpErrors(400, "Không có dữ liệu cập nhật. Vui lòng cung cấp Ten, DonGia hoặc MaDanhMuc."));
        }

        connection = await pool.getConnection();

        // 1. Cập nhật thông tin
        const updateQuery = `
            UPDATE SanPham
            SET Ten = ?, DonGia = ?, MaDanhMuc = ?
            WHERE Ma = ?;
        `;
        
        const [result] = await connection.execute(updateQuery, [Ten, DonGia, MaDanhMuc, Ma]);

        // 2. Kiểm tra xem có hàng nào bị ảnh hưởng không
        if (result.affectedRows === 0) {
            // Nếu không có hàng nào bị ảnh hưởng, có thể Mã sản phẩm không tồn tại
            return next(httpErrors(404, `Không tìm thấy sản phẩm với Mã: ${Ma} để cập nhật.`));
        }

        res.status(200).json({
            message: `Cập nhật sản phẩm '${Ma}' thành công.`
        });
    } catch (error) {
        // Xử lý lỗi MaDanhMuc không hợp lệ (Lỗi khóa ngoại)
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
             return next(httpErrors(400, `MaDanhMuc '${req.body.MaDanhMuc}' không hợp lệ hoặc không tồn tại.`));
        }
        next(httpErrors(500, `Lỗi khi cập nhật sản phẩm: ${error.message}`));
    } finally {
        if (connection) {
            connection.release(); 
        }
    }
};

/**
 * Xóa một sản phẩm (DELETE /api/sanphams/:Ma)
 */
const xoaSP = async (req, res, next) => {
    let connection;
    try {
        const { Ma } = req.params;
        
        connection = await pool.getConnection();
        
        const deleteQuery = `
            DELETE FROM SanPham
            WHERE Ma = ?;
        `;
        
        const [result] = await connection.execute(deleteQuery, [Ma]);

        if (result.affectedRows === 0) {
            // Nếu không có hàng nào bị ảnh hưởng, tức là Mã sản phẩm không tồn tại
            return next(httpErrors(404, `Không tìm thấy sản phẩm với Mã: ${Ma} để xóa.`));
        }

        res.status(200).json({
            message: `Xóa sản phẩm '${Ma}' thành công.`
        });
    } catch (error) {
         // Xử lý lỗi ràng buộc khóa ngoại (ví dụ: Sản phẩm đang được tham chiếu bởi bảng khác)
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return next(httpErrors(409, `Không thể xóa sản phẩm '${req.params.Ma}' vì nó đang được sử dụng ở bảng khác (ràng buộc khóa ngoại).`));
        }
        next(httpErrors(500, `Lỗi khi xóa sản phẩm: ${error.message}`));
    } finally {
        if (connection) {
            connection.release(); 
        }
    }
};

/**
 * Tìm kiếm danh sách sản phẩm theo tên 
 */
const timKiemTen = async (req, res, next) => {
    let connection;
    try {
        // Lấy từ khóa từ query parameter 'ten'
        const { ten } = req.query; 

        if (!ten) {
            return next(httpErrors(400, "Vui lòng cung cấp từ khóa tìm kiếm qua tham số 'ten'."));
        }
        
        connection = await pool.getConnection();

        // Sử dụng toán tử LIKE và CONCAT để tìm kiếm gần đúng (chứa từ khóa ở bất kỳ vị trí nào)
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
                SP.Ten LIKE ?;
        `;
        
        // Giá trị tham số được truyền vào: '%' + ten + '%'
        const searchTerm = `%${ten}%`; 
        const [rows] = await connection.execute(query, [searchTerm]);

        if (rows.length === 0) {
             return res.status(200).json({
                message: `Không tìm thấy sản phẩm nào có tên chứa từ khóa: ${ten}.`,
                data: []
            });
        }

        res.status(200).json(rows); 

    } catch (error) {
        next(httpErrors(500, `Lỗi khi tìm kiếm sản phẩm: ${error.message}`));
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

const getSXDonGia = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let size = parseInt(req.query.size) || 5;
    let sort = req.query.sort || "asc";

    sort = sort.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const offset = (page - 1) * size;

    const db = await pool;

    const sql = sort === "DESC" 
      ? "SELECT * FROM SanPham ORDER BY DonGia DESC LIMIT ? OFFSET ?;"
      : "SELECT * FROM SanPham ORDER BY DonGia ASC LIMIT ? OFFSET ?;";

    const [rows] = await db.query(sql, [size, offset]);

    res.json(rows);

  } catch (error) {
    logger.error("Controller Error: getSXDonGia failed", error);
    next(httpErrors(500, "Lỗi khi lấy danh sách sản phẩm có phân trang/sắp xếp."));
  }
};

const thongKeSanPhamTheoDanhMuc = async (req, res, next) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const sql = `
            SELECT 
                DM.MaDanhMuc, 
                DM.TenDanhMuc, 
                COUNT(SP.Ma) AS SoLuongSanPham
            FROM DanhMuc DM
            LEFT JOIN SanPham SP ON DM.MaDanhMuc = SP.MaDanhMuc
            GROUP BY DM.MaDanhMuc, DM.TenDanhMuc;
        `;

        const [rows] = await connection.execute(sql);

        res.json(rows);

    } catch (error) {
        logger.error("Controller Error: thongKeSanPhamTheoDanhMuc failed", error);
        next(httpErrors(500, `Lỗi khi thống kê sản phẩm theo danh mục: ${error.message}`));
    } finally {
        if (connection) connection.release();
    }
};

export const sanphamController = {
  getAll,
  getById,
  getByMaDanhMuc,
  themSP,
  capnhapSP,
  xoaSP,
  timKiemTen,
  getSXDonGia,
  thongKeSanPhamTheoDanhMuc,
};