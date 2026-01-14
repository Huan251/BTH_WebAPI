// middlewares/phanquyen.middleware.js
import jwt from "jsonwebtoken";

export const phanQuyenMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    try {
      const decoded = jwt.verify(token, "TAIKHOAN_SECRET_KEY");

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Không có quyền truy cập" });
      }

      req.user = decoded; // {id, email, role}
      next();
    } catch (err) {
      return res.status(403).json({ message: "Token hết hạn hoặc sai" });
    }
  };
};
