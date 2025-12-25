export class PhieuNhapDTO {
  constructor({ ma_phieu_nhap, ma_ncc, ngay_nhap, ten_ncc }) {
    this.MaPhieuNhap = ma_phieu_nhap;
    this.MaNCC = ma_ncc;
    this.TenNCC = ten_ncc;

    this.NgayNhap = new Date(ngay_nhap)
      .toLocaleDateString("vi-VN");
  }
}
