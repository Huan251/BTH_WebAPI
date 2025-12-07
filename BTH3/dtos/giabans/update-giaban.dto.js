export class UpdateGiaBanDTO {
  constructor({ MaHang, Gia, DVTinh, NgayBD, NgayKT }) {
    this.MaHang = MaHang;
    this.Gia = Gia;
    this.DVTinh = DVTinh;
    this.NgayBD = NgayBD;
    this.NgayKT = NgayKT;
  }
}