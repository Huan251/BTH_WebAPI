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

Create Table TaiKhoan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    mat_khau VARCHAR(50) NOT NULL,
    role INT NOT NULL -- 1 chủ 2 nhân 3 khách 
);

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
(110, 'Nhạc cụ mini', 'Đồ chơi âm nhạc'),
(111, 'Xe mô hình', 'Các loại xe mô hình nhỏ'),
(112, 'Bóng chày mini', 'Đồ chơi vận động bóng chày'),
(113, 'Đồ chơi xếp chồng', 'Xếp chồng nhiều tầng'),
(114, 'Đồ chơi điện tử', 'Đồ chơi có âm thanh và đèn'),
(115, 'Mô hình tàu hỏa', 'Tàu hỏa mô hình'),
(116, 'Đồ chơi nghệ thuật', 'Đồ chơi vẽ tranh, tô màu'),
(117, 'Đồ chơi thông minh', 'Puzzle, Rubik, logic'),
(118, 'Xe đạp trẻ em', 'Xe đạp mini cho bé'),
(119, 'Búp bê thời trang', 'Búp bê mặc trang phục thời trang'),
(120, 'Đồ chơi biển', 'Súng nước, phao, bơi lội');

Insert Into NhaCungCap (ma_ncc, ten_ncc, dien_thoai, dia_chi, email) Values
(201, 'ZURU 5 Surprise', '0901000201', 'Auckland, New Zealand', 'contact@zuru.com'),
(202, 'Marvel Avengers', '0901000202', 'Burbank, California, USA', 'info@marvel.com'),
(203, 'Baby Alive', '0901000203', 'Pawtucket, Rhode Island, USA', 'support@hasbro.com'),
(204, 'Baby Einstein', '0901000204', 'Chicago, Illinois, USA', 'info@baby-einstein.com'),
(205, 'Bambolina', '0901000205', 'Milan, Italy', 'contact@bambolina.com'),
(206, 'Barbie (Mattel)', '0901000206', 'El Segundo, California, USA', 'service@mattel.com'),
(207, 'Bobi Craft', '0901000207', 'Ho Chi Minh City, Vietnam', 'contact@bobicraft.vn'),
(208, 'Bright Starts', '0901000208', 'Atlanta, Georgia, USA', 'support@brightstarts.com'),
(209, 'Babymoov', '0901000209', 'Clermont-Ferrand, France', 'info@babymoov.com'),
(210, 'Bubchen', '0901000210', 'Hamburg, Germany', 'info@bubchen.com'),
(211, 'Cetaphil Baby', '0901000211', 'Galderma Laboratories, Switzerland', 'contact@cetaphil.com'),
(212, 'Nestlé Cerelac', '0901000212', 'Vevey, Switzerland', 'support@nestle.com'),
(213, 'Chicco', '0901000213', 'Como, Italy', 'contact@chicco.com'),
(214, 'Comotomo', '0901000214', 'Los Angeles, California, USA', 'support@comotomo.com'),
(215, 'Coco Surprise', '0901000215', 'Seoul, South Korea', 'info@cocosurprise.com'),
(216, 'Cresta', '0901000216', 'Tokyo, Japan', 'contact@cresta.co.jp'),
(217, 'Doraemon', '0901000217', 'Tokyo, Japan', 'info@doraemon-official.jp'),
(218, 'Disney Baby', '0901000218', 'Burbank, California, USA', 'baby@disney.com'),
(219, 'Disney Princess', '0901000219', 'Burbank, California, USA', 'princess@disney.com'),
(220, 'D-nee', '0901000220', 'Bangkok, Thailand', 'contact@dnee.co.th'),
(221, 'Dragon-i Toys', '0901000221', 'Shenzhen, China', 'info@dragonitoys.com');
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
(310, 'Đàn organ mini', 110, 209, 350000, 250000, 12, 'Nhạc cụ trẻ em'),
(311, 'Xe mô hình thể thao', 111, 211, 250000, 180000, 15, 'Xe mô hình thể thao'),
(312, 'Bóng chày mini gỗ', 112, 212, 120000, 80000, 20, 'Bóng chày mini gỗ'),
(313, 'Xếp chồng tháp', 113, 213, 180000, 120000, 18, 'Xếp chồng nhiều tầng'),
(314, 'Đồ chơi điện tử nhạc', 114, 214, 350000, 250000, 10, 'Đồ chơi điện tử âm thanh'),
(315, 'Mô hình tàu hỏa mini', 115, 215, 500000, 400000, 5, 'Mô hình tàu hỏa'),
(316, 'Bộ vẽ tranh', 116, 216, 220000, 150000, 12, 'Đồ chơi nghệ thuật'),
(317, 'Rubik 3x3', 117, 217, 150000, 100000, 25, 'Đồ chơi thông minh'),
(318, 'Xe đạp trẻ em 12inch', 118, 218, 900000, 700000, 8, 'Xe đạp mini cho bé'),
(319, 'Búp bê fashion', 119, 219, 200000, 150000, 20, 'Búp bê thời trang'),
(320, 'Súng nước mini', 120, 220, 160000, 110000, 30, 'Đồ chơi biển'),
(321, 'Xe địa hình RC Mini', 101, 201, 460000, 310000, 18, 'Xe địa hình nhỏ gọn'),
(322, 'Xe đua tốc độ', 101, 202, 480000, 320000, 12, 'Xe đua nhanh, màu đỏ'),
(323, 'Robot nhảy thông minh', 102, 201, 370000, 230000, 15, 'Robot nhảy với đèn LED'),
(324, 'Robot điều khiển', 102, 202, 390000, 240000, 10, 'Robot điều khiển từ xa'),
(325, 'Búp bê Elsa cao cấp', 103, 203, 170000, 120000, 20, 'Búp bê Elsa công chúa'),
(326, 'Búp bê Anna nhỏ', 103, 204, 160000, 110000, 22, 'Búp bê Anna mini'),
(327, 'Xe địa hình địa phương', 101, 203, 450000, 300000, 25, 'Xe địa hình mạnh mẽ'),
(328, 'Robot nhảy đa năng', 102, 204, 360000, 220000, 18, 'Robot nhảy và hát'),
(329, 'Búp bê công chúa', 103, 201, 150000, 100000, 30, 'Búp bê công chúa xinh xắn'),
(330, 'Xe mini điều khiển', 101, 204, 440000, 290000, 14, 'Xe mini điều khiển từ xa');

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
(410, 207, '2025-01-14'),
(411, 211, '2025-01-15'),
(412, 212, '2025-01-16'),
(413, 213, '2025-01-17'),
(414, 214, '2025-01-18'),
(415, 215, '2025-01-19'),
(416, 216, '2025-01-20'),
(417, 217, '2025-01-21'),
(418, 218, '2025-01-22'),
(419, 219, '2025-01-23'),
(420, 220, '2025-01-24'),
(421, 201, '2025-03-01'),
(422, 202, '2025-03-02'),
(423, 203, '2025-03-03'),
(424, 204, '2025-03-04'),
(425, 201, '2025-03-05'),
(426, 202, '2025-03-06'),
(427, 203, '2025-03-07'),
(428, 204, '2025-03-08'),
(429, 201, '2025-03-09'),
(430, 202, '2025-03-10');

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
(510, 410, 306, 10, 180000),
(511, 411, 311, 10, 180000),
(512, 412, 312, 15, 80000),
(513, 413, 313, 12, 120000),
(514, 414, 314, 8, 250000),
(515, 415, 315, 5, 400000),
(516, 416, 316, 10, 150000),
(517, 417, 317, 20, 100000),
(518, 418, 318, 6, 700000),
(519, 419, 319, 12, 150000),
(520, 420, 320, 15, 110000),
(521, 401, 311, 5, 400000),
(522, 401, 312, 8, 220000),
(523, 402, 313, 10, 150000),
(524, 402, 314, 7, 900000),
(525, 403, 315, 12, 200000),
(526, 403, 316, 6, 180000),
(527, 404, 317, 9, 120000),
(528, 404, 318, 15, 60000),
(529, 401, 319, 11, 160000),
(530, 402, 320, 8, 350000);

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
(610, 'Ngô Thị Mai', '0907665544', 'HCM'),
(611, 'Phan Văn Bình', '0912345670', 'HCM'),
(612, 'Nguyễn Thị Hạnh', '0923456781', 'Hà Nội'),
(613, 'Trần Văn Tuấn', '0934567892', 'Đà Nẵng'),
(614, 'Lê Thị Mai', '0945678903', 'HCM'),
(615, 'Võ Văn Tùng', '0956789014', 'Hà Nội'),
(616, 'Đặng Thị Lan', '0967890125', 'Đà Nẵng'),
(617, 'Ngô Văn Huy', '0978901236', 'HCM'),
(618, 'Phạm Thị Hồng', '0989012347', 'Hà Nội'),
(619, 'Trương Văn Nam', '0990123458', 'Đà Nẵng'),
(620, 'Bùi Thị Lan', '0901234569', 'HCM');

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
(710, 610, '2025-02-06', 350000),
(711, 611, '2025-02-07', 500000),
(712, 612, '2025-02-07', 300000),
(713, 613, '2025-02-08', 400000),
(714, 614, '2025-02-08', 250000),
(715, 615, '2025-02-09', 600000),
(716, 616, '2025-02-09', 350000),
(717, 617, '2025-02-10', 280000),
(718, 618, '2025-02-10', 450000),
(719, 619, '2025-02-11', 320000),
(720, 620, '2025-02-11', 150000),
(721, 601, '2025-03-01', 500000),
(722, 602, '2025-03-01', 450000),
(723, 603, '2025-03-02', 600000),
(724, 604, '2025-03-03', 700000),
(725, 605, '2025-03-03', 300000),
(726, 606, '2025-03-04', 280000),
(727, 607, '2025-03-05', 400000),
(728, 608, '2025-03-05', 350000),
(729, 609, '2025-03-06', 420000),
(730, 610, '2025-03-06', 380000);

Insert Into ChiTiet_HoaDon (ma_cthd, ma_hd, ma_sp, so_luong, don_gia_ban) Values
(832, 702, 311, 2, 1),
(801, 701, 301, 1, 450000),
(802, 702, 302, 1, 350000),
(803, 703, 303, 1, 150000),
(804, 704, 304, 1, 1200000),
(805, 705, 305, 1, 300000),
(806, 706, 306, 1, 280000),
(807, 707, 307, 1, 120000),
(808, 708, 309, 1, 160000),
(809, 709, 310, 1, 350000),
(810, 710, 308, 1, 90000),
(811, 711, 311, 1, 250000),
(812, 712, 312, 1, 120000),
(813, 713, 313, 1, 180000),
(814, 714, 314, 1, 350000),
(815, 715, 315, 1, 500000),
(816, 716, 316, 1, 220000),
(817, 717, 317, 1, 150000),
(818, 718, 318, 1, 900000),
(819, 719, 319, 1, 200000),
(820, 720, 320, 1, 160000),
(821, 721, 301, 1, 450000),
(822, 722, 302, 2, 350000),
(823, 723, 303, 1, 150000),
(824, 721, 301, 2, 450000),
(825, 722, 302, 1, 350000),
(826, 723, 303, 3, 150000),
(827, 721, 301, 1, 450000),
(828, 722, 302, 2, 350000),
(829, 723, 303, 1, 150000),
(830, 721, 301, 1, 450000);

INSERT INTO TaiKhoan (email, mat_khau, role) VALUES
('huanle251@gmail.com', 'huan123', 1),
('vinhpia3@gmail.com', '123456', 2),
('mhung01@gmail.com', '0000', 3);

use BTL_LQH_VQV;
Select * from KhachHang;
Select * from PhieuNhap;
Select * from SanPham;
Select * from DanhMuc;
Select * from HoaDon;
Select * from ChiTiet_HoaDon;
Select * from NhaCungCap;
Select * from TaiKhoan;

DELIMITER //
CREATE TRIGGER trg_UpdateTongTien_Insert 
AFTER INSERT ON ChiTiet_HoaDon 
FOR EACH ROW 
BEGIN    
    UPDATE HoaDon     
    SET tong_tien = (         
        SELECT IFNULL(SUM(so_luong * don_gia_ban), 0)         
        FROM ChiTiet_HoaDon         
        WHERE ma_hd = NEW.ma_hd     
    )     
    WHERE ma_hd = NEW.ma_hd;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_UpdateTongTien_Update 
AFTER UPDATE ON ChiTiet_HoaDon 
FOR EACH ROW 
BEGIN    
    UPDATE HoaDon     
    SET tong_tien = (         
        SELECT IFNULL(SUM(so_luong * don_gia_ban), 0)         
        FROM ChiTiet_HoaDon         
        WHERE ma_hd = NEW.ma_hd     
    )     
    WHERE ma_hd = NEW.ma_hd;
    IF (OLD.ma_hd <> NEW.ma_hd) THEN
        UPDATE HoaDon
        SET tong_tien = (
            SELECT IFNULL(SUM(so_luong * don_gia_ban), 0)
            FROM ChiTiet_HoaDon
            WHERE ma_hd = OLD.ma_hd
        )
        WHERE ma_hd = OLD.ma_hd;
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_UpdateTongTien_Delete
AFTER DELETE ON ChiTiet_HoaDon
FOR EACH ROW
BEGIN
    UPDATE HoaDon
    SET tong_tien = (
        SELECT IFNULL(SUM(so_luong * don_gia_ban), 0)
        FROM ChiTiet_HoaDon
        WHERE ma_hd = OLD.ma_hd
    )
    WHERE ma_hd = OLD.ma_hd;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_AssignGiaBan
BEFORE INSERT ON ChiTiet_HoaDon
FOR EACH ROW
BEGIN
    SET NEW.don_gia_ban = (
        SELECT gia_ban 
        FROM SanPham 
        WHERE ma_sp = NEW.ma_sp
    );
END //
DELIMITER ;
