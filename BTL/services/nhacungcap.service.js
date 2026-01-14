import { nhaCungCapRepository } from "../repositories/nhacungcap.repository.js";
import { NhaCungCapDTO } from "../dtos/nhacungcaps/nhacungcap.dto.js";
import httpErrors from "http-errors";

export const nhaCungCapService = {
  getAll: async () => {
    const data = await nhaCungCapRepository.getAll();
    return data.map((ncc) => new NhaCungCapDTO(ncc));
  },

  getById: async (ma_ncc) => {
    const ncc = await nhaCungCapRepository.getById(ma_ncc);
    if (!ncc) throw httpErrors(404, "Không tìm thấy nhà cung cấp");
    return new NhaCungCapDTO(ncc);
  },

  create: async (data) => {
    const exists = await nhaCungCapRepository.existsById(data.ma_ncc);
    if (exists) throw httpErrors(400, "Mã nhà cung cấp đã tồn tại");

    await nhaCungCapRepository.create(data);
  },

    update: async (payload) => {
    const { ma_ncc, ...data } = payload;

    const ncc = await nhaCungCapRepository.getById(ma_ncc);
    if (!ncc) throw httpErrors(404, "Nhà cung cấp không tồn tại!");


    const affected = await nhaCungCapRepository.update({ ma_ncc, ...data });
    if (affected === 0) throw httpErrors(400, "Không có dữ liệu nào được cập nhật!");
  },
  delete: async (ma_ncc) => {
    const exists = await nhaCungCapRepository.existsById(ma_ncc);
    if (!exists) throw httpErrors(404, "Nhà cung cấp không tồn tại");

    if (await nhaCungCapRepository.existsInSanPham(ma_ncc)) {
      throw httpErrors(
        409,
        "Không thể xóa: Nhà cung cấp đang có sản phẩm"
      );
    }

    if (await nhaCungCapRepository.existsInPhieuNhap(ma_ncc)) {
      throw httpErrors(
        409,
        "Không thể xóa: Nhà cung cấp đã có phiếu nhập"
      );
    }

    await nhaCungCapRepository.deleteById(ma_ncc);
  },
};
