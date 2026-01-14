import loiNhuanService from "../services/loinhuan.service.js";

export const LoiNhuan = {
  // 🔹 lợi nhuận theo sản phẩm
  theoSanPham: async (req, res) => {
    const data = await loiNhuanService.getLoiNhuanTheoSanPham();
    res.json(data);
  },

  // 🔹 lợi nhuận theo tháng
  theoThang: async (req, res) => {
    const data = await loiNhuanService.getTheoThang();
    res.json(data);
  }
};
