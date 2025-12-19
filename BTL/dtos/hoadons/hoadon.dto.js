export class HoaDonDTO {
  constructor({ ma_hd, ma_kh, ngay_ban, tong_tien, ten_kh }) {
    this.MaHD = ma_hd;
    this.MaKH = ma_kh;
    this.TenKH = ten_kh;
    this.NgayBan = new Date(ngay_ban).toLocaleDateString("vi-VN");
    this.TongTien = tong_tien;
  }
}
