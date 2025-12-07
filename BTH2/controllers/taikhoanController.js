// import { successResponse, errorResponse } from "../helpers/response.js";

// src/controllers/taikhoanController.js
import { accounts } from "../model/taikhoan.js";

// Lấy tất cả tai khoan
export const getAllAccounts = (req, res) => {
  res.status(200).json(accounts);
};

// Lấy tai khoan theo ten tai khoan
export const getAccountByTenTK = (req, res) => {
  const tentk = req.params.tentk;
  const account = accounts.find((u) => u.TenTK === tentk);

  if (!account) {
    res.status(404).json({
      status: 404,
      message: `Account by ${tentk} not found!`,
    });
  }

  res.status(200).json(account);
};

// Lấy thông tin các tài khoản chứa nội dung mô tả
// Kiểm tra tài khoản và mật khẩu có hợp lệ
// Thêm thông tin tài khoản
// Sửa thông tin tài khoản
// Thêm thông tin tài khoản với: tham số là 1 tài khoản vào cuối (kiểm tra khóa chính tên TK nếu có có r=> null, còn lại return DS sau khi thêm cuối)
// Thêm thông tin tài khoản với: tham số là 1 tài khoản tại index(index<0 or index> length or kiểm tra khóa chính tên TK nếu có có r=> null, còn lại return DS  sau khi thêm tại index)
// Sửa thông tin tài khoản với parameter là tenTK, TT mới MK và mo tả. Nếu TenTK ko có=> null, còn lại => DS TK sau khi sửa
// Xóa thông tin tài khoản
