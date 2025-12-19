export class PhieuNhapDTO {
  constructor({ ma_phieu_nhap, ma_ncc, ngay_nhap, ten_ncc }) {
    this.MaPhieuNhap = ma_phieu_nhap;
    this.MaNCC = ma_ncc;
    this.NgayNhap = ngay_nhap;
    this.TenNCC = ten_ncc;
  }
}
