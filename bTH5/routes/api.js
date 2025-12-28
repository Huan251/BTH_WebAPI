import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { hanghoaController } from "../controllers/hanghoa.controller.js";
import { sanphamController } from "../controllers/sanpham.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/authens/auth.validator.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { POLICIES } from "../utils/constants/policies.js";
import { authorizePolicy } from "../middlewares/policy.middleware.js";

const router = Router();

// ----------------------- AUTHENTICATION & AUTHORIZATION -------------------------------------
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

// ----------------------- USERS -------------------------------------
// Admin: xem tất cả users
router.get(
  "/users",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_ALL),
  userController.getAll
);

// User hoặc Admin: xem chính mình
router.get(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_SELF),
  userController.getById
);

// Tạo user mới (chỉ Admin)
router.post(
  "/users",
  authenticate,
  authorizePolicy(POLICIES.USER_CREATE),
  userController.create
);

// Cập nhật user (Admin hoặc chính mình)
router.put(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_UPDATE),
  userController.update
);

// Xóa user (chỉ Admin)
router.delete(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_DELETE),
  userController.delete
);

// ----------------------- HANGHOAS -------------------------------------
router.get("/hanghoas", hanghoaController.getAll);
router.get("/hanghoas/ma-loai/:MaLoai", hanghoaController.getByMaLoai);
router.get("/hanghoas/ten-loai/:TenLoai", hanghoaController.getByTenLoai);
router.get("/hanghoas/sap-het", hanghoaController.getAllSapHet);

// ----------------------- SANPHAMS -------------------------------------
router.get("/sanphams", sanphamController.getAllsanphams);

export default router;
