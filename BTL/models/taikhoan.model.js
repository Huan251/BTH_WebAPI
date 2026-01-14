import db from "../db.js";

export const TaiKhoanModel = {
  findByEmail(email) {
    return db.query(
      "SELECT id, email, role FROM TaiKhoan WHERE email = ?",
      [email]
    );
  },

  findFullByEmail(email) {
    return db.query(
      "SELECT * FROM TaiKhoan WHERE email = ?",
      [email]
    );
  },

  findByRole(role) {
    return db.query(
      "SELECT id, email, role FROM TaiKhoan WHERE role = ?",
      [role]
    );
  }
};
