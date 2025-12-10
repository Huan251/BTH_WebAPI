// controllers/giaban.controller.js (Placeholder)

const getAll = (req, res) => res.status(501).json({ message: "Not Implemented: GiaBan getAll" });
const getGiaBanCuaMaHang = (req, res) => res.status(501).json({ message: "Not Implemented: GiaBan getGiaBanCuaMaHang" });
const getGiaHangVaoThoiDiemHienTai = (req, res) => res.status(501).json({ message: "Not Implemented: GiaBan getGiaHangVaoThoiDiemHienTai" });
const create = (req, res) => res.status(501).json({ message: "Not Implemented: GiaBan create" });
const update = (req, res) => res.status(501).json({ message: "Not Implemented: GiaBan update" });
const del = (req, res) => res.status(501).json({ message: "Not Implemented: GiaBan delete" });

export const giabanController = {
    getAll,
    getGiaBanCuaMaHang,
    getGiaHangVaoThoiDiemHienTai,
    create,
    update,
    delete: del,
};