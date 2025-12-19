export class ChiTietHoaDonDTO {
  constructor({ ma_cthd, ma_hd, ma_sp, so_luong, don_gia_ban }) {
    this.MaCTHD = ma_cthd;
    this.MaHoaDon = ma_hd;
    this.MaSanPham = ma_sp;
    this.SoLuong = so_luong;
    this.DonGiaBan = don_gia_ban;
    this.ThanhTien = so_luong * don_gia_ban;
  }
}
