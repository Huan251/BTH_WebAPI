create database BTL_LQH_VQV;

use BTL_LQH_VQV;

-- ========================== TẠO BẢNG ==========================
Create Table DanhMuc (
    ma_danh_muc INT PRIMARY KEY,
    ten_danh_muc VARCHAR(50),
    mo_ta TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

Create Table NhaCungCap (
    ma_ncc INT PRIMARY KEY,
    ten_ncc VARCHAR(50),
    dien_thoai VARCHAR(15),
    dia_chi VARCHAR(100),
    email VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

Create Table SanPham (
    ma_sp INT PRIMARY KEY,
    ten_sp VARCHAR(50),
    ma_danh_muc INT,
    ma_ncc INT,
    gia_ban DECIMAL(15,2),
    gia_nhap DECIMAL(15,2),
    so_luong_ton INT,
    mo_ta TEXT,
    CONSTRAINT fk_sp_dm FOREIGN KEY (ma_danh_muc) REFERENCES DanhMuc(ma_danh_muc),
    CONSTRAINT fk_sp_ncc FOREIGN KEY (ma_ncc) REFERENCES NhaCungCap(ma_ncc)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

Create Table PhieuNhap (
    ma_phieu_nhap INT PRIMARY KEY,
    ma_ncc INT,
    ngay_nhap DATE,
    CONSTRAINT fk_pn_ncc FOREIGN KEY (ma_ncc) REFERENCES NhaCungCap(ma_ncc)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

Create Table ChiTiet_PhieuNhap (
    ma_ctpn INT PRIMARY KEY,
    ma_phieu_nhap INT,
    ma_sp INT,
    so_luong INT,
    don_gia_nhap DECIMAL(15,2),
    CONSTRAINT fk_ctpn_pn FOREIGN KEY (ma_phieu_nhap) REFERENCES PhieuNhap(ma_phieu_nhap),
    CONSTRAINT fk_ctpn_sp FOREIGN KEY (ma_sp) REFERENCES SanPham(ma_sp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

Create Table KhachHang (
    ma_kh INT PRIMARY KEY,
    ten_kh VARCHAR(50),
    dien_thoai VARCHAR(15),
    dia_chi VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

Create Table HoaDon (
    ma_hd INT PRIMARY KEY,
    ma_kh INT,
    ngay_ban DATE,
    tong_tien DECIMAL(15,2),
    CONSTRAINT fk_hd_kh FOREIGN KEY (ma_kh) REFERENCES KhachHang(ma_kh)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

Create Table ChiTiet_HoaDon (
    ma_cthd INT PRIMARY KEY,
    ma_hd INT,
    ma_sp INT,
    so_luong INT,
    don_gia_ban DECIMAL(15,2),
    CONSTRAINT fk_cthd_hd FOREIGN KEY (ma_hd) REFERENCES HoaDon(ma_hd),
    CONSTRAINT fk_cthd_sp FOREIGN KEY (ma_sp) REFERENCES SanPham(ma_sp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================== DỮ LIỆU ==========================
Insert Into DanhMuc (ma_danh_muc, ten_danh_muc, mo_ta) Values
(101, 'Xe điều khiển', 'Các loại xe điều khiển từ xa'),
(102, 'Robot', 'Robot đồ chơi thông minh'),
(103, 'Búp bê', 'Búp bê cho bé'),
(104, 'Xếp hình', 'Đồ chơi lắp ráp'),
(105, 'Thú nhồi bông', 'Gấu bông, thú bông'),
(106, 'Đồ chơi giáo dục', 'Đồ chơi học tập'),
(107, 'Đồ chơi vận động', 'Đồ chơi ngoài trời'),
(108, 'Phao – Đồ bơi', 'Phao bơi các loại'),
(109, 'Súng nước', 'Đồ chơi bắn nước'),
(110, 'Nhạc cụ mini', 'Đồ chơi âm nhạc');

Insert Into NhaCungCap (ma_ncc, ten_ncc, dien_thoai, dia_chi, email) Values
(201, 'Minh Long Toys', '0901112233', 'Hà Nội', 'mltoys@gmail.com'),
(202, 'Hưng Thịnh Toys', '0902345678', 'HCM', 'hungthinh@gmail.com'),
(203, 'ABC Kids', '0911223344', 'Đà Nẵng', 'abckids@gmail.com'),
(204, 'ToyWorld VN', '0933445566', 'HCM', 'toyworld@gmail.com'),
(205, 'Gấu Bông Hà Nội', '0944556677', 'Hà Nội', 'gaubonghn@gmail.com'),
(206, 'Lego Store VN', '0909123456', 'HCM', 'lego.vn@gmail.com'),
(207, 'Sunshine Kids', '0908787878', 'HCM', 'sunshine@gmail.com'),
(208, 'Happy Toys', '0977665544', 'Đà Nẵng', 'happytoys@gmail.com'),
(209, 'Nhạc Cụ Trẻ Em VN', '0933112233', 'Hà Nội', 'nctevn@gmail.com'),
(210, 'Phao Bơi Việt', '0911998877', 'HCM', 'phaoboi.vn@gmail.com');

INSERT INTO SanPham (ma_sp, ten_sp, ma_danh_muc, ma_ncc, gia_ban, gia_nhap, so_luong_ton, mo_ta) Values
(301, 'Xe địa hình RC', 101, 201, 450000, 300000, 20, 'Xe điều khiển mạnh mẽ'),
(302, 'Robot nhảy mini', 102, 202, 350000, 220000, 15, 'Robot có nhạc'),
(303, 'Búp bê Elsa', 103, 203, 150000, 100000, 30, 'Búp bê công chúa'),
(304, 'Lego City 1200 mảnh', 104, 206, 1200000, 900000, 10, 'Đồ chơi xếp hình'),
(305, 'Gấu Teddy 1m2', 105, 205, 300000, 200000, 25, 'Thú bông cao cấp'),
(306, 'Bảng chữ cái điện tử', 106, 207, 280000, 180000, 18, 'Đồ chơi giáo dục'),
(307, 'Bóng đá mini', 107, 208, 120000, 80000, 40, 'Dành cho trẻ nhỏ'),
(308, 'Phao bơi tròn', 108, 210, 90000, 60000, 35, 'Phao trẻ em'),
(309, 'Súng nước áp lực', 109, 204, 160000, 110000, 28, 'Súng nước mạnh'),
(310, 'Đàn organ mini', 110, 209, 350000, 250000, 12, 'Nhạc cụ trẻ em');

Insert Into PhieuNhap (ma_phieu_nhap, ma_ncc, ngay_nhap) Values
(401, 201, '2025-01-05'),
(402, 202, '2025-01-06'),
(403, 206, '2025-01-07'),
(404, 205, '2025-01-08'),
(405, 204, '2025-01-09'),
(406, 203, '2025-01-10'),
(407, 208, '2025-01-11'),
(408, 209, '2025-01-12'),
(409, 210, '2025-01-13'),
(410, 207, '2025-01-14');

INSERT INTO ChiTiet_PhieuNhap (ma_ctpn, ma_phieu_nhap, ma_sp, so_luong, don_gia_nhap) Values
(501, 401, 301, 10, 300000),
(502, 402, 302, 8, 220000),
(503, 403, 304, 5, 900000),
(504, 404, 305, 12, 200000),
(505, 405, 309, 10, 110000),
(506, 406, 303, 15, 100000),
(507, 407, 307, 20, 80000),
(508, 408, 310, 6, 250000),
(509, 409, 308, 10, 60000),
(510, 410, 306, 10, 180000);

Insert Into KhachHang (ma_kh, ten_kh, dien_thoai, dia_chi) Values
(601, 'Nguyễn Văn An', '0901111222', 'HCM'),
(602, 'Trần Minh Khôi', '0933445566', 'HCM'),
(603, 'Lê Thu Hà', '0911223344', 'Hà Nội'),
(604, 'Phạm Ngọc Lan', '0988776655', 'Đà Nẵng'),
(605, 'Bùi Quốc Toàn', '0977554433', 'HCM'),
(606, 'Huỳnh Mỹ Duyên', '0944221133', 'HCM'),
(607, 'Đỗ Đức Hiếu', '0908998877', 'Hà Nội'),
(608, 'Võ Ngọc Trâm', '0933112233', 'HCM'),
(609, 'Hồ Thanh Phong', '0922113344', 'Đà Nẵng'),
(610, 'Ngô Thị Mai', '0907665544', 'HCM');

Insert Into HoaDon (ma_hd, ma_kh, ngay_ban, tong_tien) Values
(701, 601, '2025-02-01', 600000),
(702, 602, '2025-02-01', 450000),
(703, 603, '2025-02-02', 150000),
(704, 604, '2025-02-02', 1200000),
(705, 605, '2025-02-03', 300000),
(706, 606, '2025-02-03', 280000),
(707, 607, '2025-02-04', 120000),
(708, 608, '2025-02-05', 160000),
(709, 609, '2025-02-05', 400000),
(710, 610, '2025-02-06', 350000);

Insert Into ChiTiet_HoaDon (ma_cthd, ma_hd, ma_sp, so_luong, don_gia_ban) Values
(801, 701, 301, 1, 450000),
(802, 702, 302, 1, 350000),
(803, 703, 303, 1, 150000),
(804, 704, 304, 1, 1200000),
(805, 705, 305, 1, 300000),
(806, 706, 306, 1, 280000),
(807, 707, 307, 1, 120000),
(808, 708, 309, 1, 160000),
(809, 709, 310, 1, 350000),
(810, 710, 308, 1, 90000);

