import loiNhuanRepository from "../repositories/loinhuan.repository.js";

const loiNhuanService = {
  getLoiNhuanTheoSanPham: async () => {
    const data = await loiNhuanRepository.getLoiNhuanTheoSanPham();

    return data.map(item => {
      const doanhThu = Number(item.doanh_thu || 0);
      const giaNhapTB = Number(item.gia_nhap_tb || 0);

      // số lượng bán = doanh thu / giá bán TB
      // nhưng ta KHÔNG cần số lượng bán
      // giá vốn = (doanh thu / giá bán) × giá nhập TB ❌
      // => CÁCH ĐÚNG: lấy tổng số lượng bán

      // => SỬA: cần SQL trả về tổng số lượng bán
      return {
        ma_sp: item.ma_sp,
        ten_sp: item.ten_sp,
        doanh_thu: doanhThu,
        gia_nhap_tb: giaNhapTB
      };
    });
  },
    getTheoThang: async () => {
  const data = await loiNhuanRepository.getTheoThang();

  return data.map(item => {
    const doanhThu = Number(item.doanh_thu) || 0;
    const giaNhap = Number(item.gia_nhap) || 0;

    const loiNhuan = doanhThu - giaNhap;

    return {
      thang: item.thang,
      loi_nhuan: loiNhuan > 0 ? loiNhuan : 0
    };
  });
}

  
};

export default loiNhuanService;
