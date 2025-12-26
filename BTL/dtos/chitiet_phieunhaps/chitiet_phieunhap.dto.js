export class ChiTietPhieuNhapDTO {
  constructor({
    ma_ctpn,
    ma_phieu_nhap,
    ma_sp,
    ten_sp, 
    so_luong,
    don_gia_nhap,
  }) {
    this.MaCTPN = ma_ctpn;
    this.MaPhieuNhap = ma_phieu_nhap;
    this.MaSanPham = ma_sp;
    this.TenSanPham = ten_sp;
    this.SoLuong = so_luong;
    this.DonGiaNhap = don_gia_nhap;
    this.ThanhTien = so_luong * don_gia_nhap;
  }
}
