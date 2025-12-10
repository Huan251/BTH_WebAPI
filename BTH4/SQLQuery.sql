Create Database NodeAPI_LQH_4;

Use NodeAPI_LQH_4;

-- --------------------------------------------------- Bai1 ------------------------------------------------------
CREATE TABLE DanhMuc(
	MaDanhMuc int PRIMARY KEY ,
	TenDanhMuc nvarchar(50) NOT NULL
);

CREATE TABLE SanPham(
	Ma varchar(30) PRIMARY KEY,
	Ten nvarchar(50) NOT NULL,
	DonGia int NULL,
	MaDanhMuc int NULL,
	CONSTRAINT FK FOREIGN KEY(MaDanhMuc)REFERENCES DanhMuc (MaDanhMuc)
);

INSERT INTO DanhMuc (MaDanhMuc, TenDanhMuc) 
VALUES
	(1, 'Thời Trang Nam'),
	(2, 'Thời Trang Nữ'),
	(3, 'Điện Thoại'),
	(4, 'Máy Tính & Laptop'),
	(5, 'Phụ Kiện Điện Tử'),
	(6, 'Thiết Bị Gia Dụng'),
	(7, 'Sách & Văn Phòng Phẩm'),
	(8, 'Đồ Chơi & Mẹ Bé'),
	(9, 'Sức Khỏe & Làm Đẹp'),
	(10, 'Thể Thao & Du Lịch'),
	(11, 'Nội Thất & Đồ Trang Trí'),
	(12, 'Thực Phẩm Chế Biến'),
	(13, 'Đồ Uống Giải Khát'),
	(14, 'Dụng Cụ Nhà Bếp'),
	(15, 'Ô Tô & Xe Máy'),
	(101, N'Điện thoại'),
	(201, N'Laptop'),
	(331, N'Phụ kiện'),
	(111, N'Đồ gia dụng'),
    (999, N'Bảng'),
	(251, N'Quần áo');

INSERT INTO SanPham (Ma, Ten, DonGia, MaDanhMuc) 
VALUES
	('SP01', 'Áo Thun Cotton Cơ Bản', 150000, 1),
	('SP02', 'Váy Maxi Họa Tiết', 320000, 2),
	('SP03', 'Smartphone X Pro 256GB', 18500000, 3),
	('SP04', 'Laptop Gaming R7', 25800000, 4),
	('SP05', 'Tai Nghe Bluetooth ANC', 1890000, 5),
	('SP06', 'Máy Hút Bụi Robot V3', 5500000, 6),
	('SP07', 'Sách "Lập Trình Web Hiện Đại"', 125000, 7),
	('SP08', 'Bộ Xếp Hình Thành Phố', 450000, 8),
	('SP09', 'Kem Chống Nắng SPF50+', 280000, 9),
	('SP10', 'Giày Chạy Bộ Performance', 1200000, 10),
	('SP11', 'Ghế Sofa Đơn Bọc Da', 7900000, 11),
	('SP12', 'Mì Gói Hải Sản Cao Cấp', 35000, 12),
	('SP13', 'Nước Khoáng Có Gas 1L', 20000, 13),
	('SP14', 'Bộ Nồi Inox 5 Món', 950000, 14),
	('SP15', 'Dầu Nhớt Tổng Hợp 1L', 180000, 15),
	('SP16', 'Quần Jeans Slim Fit', 480000, 1),
	('SP17', 'Ốp Lưng Silicon Mờ', 50000, 5),
	('SP18', 'Máy Pha Cà Phê Tự Động', 3800000, 6),
	('SP19', 'Áo Len Cổ Tròn Cao Cấp', 590000, 2),
	('SP20', 'Bộ Sạc Nhanh 65W', 250000, 5),
	('SP001', N'iPhone 14', 20000000, 101),
	('SP002', N'Samsung S23', 18000000, 101),
	('SP003', N'Xiaomi Note 12', 6000000,101),
	('SP004', N'Laptop Dell XPS', 32000000, 201),
	('SP005', N'Asus TUF Gaming', 24000000, 201),
	('SP006', N'Chuột Logitech G102', 350000, 111),
	('SP007', N'Bàn phím cơ RK', 750000, 111),
	('SP008', N'Nồi cơm Sharp', 1200000, 251),
	('SP009', N'Áo thun nam', 150000,251),
	('SP010', N'Quần jean nữ', 250000, 251);  
    
    -- --------------------------------------------------- Bai2 ------------------------------------------------------
CREATE TABLE Phongban (
    MAPB INT PRIMARY KEY,
    TENPB VARCHAR(100) NOT NULL
);

CREATE TABLE Nhanvien (
    MANV INT PRIMARY KEY,
    HOTEN VARCHAR(100),
    NGAYSINH DATE,
    PHAI ENUM('Nam','Nu'),
    DIACHI VARCHAR(200),
    MAPB INT,
    FOREIGN KEY (MAPB) REFERENCES Phongban(MAPB)
);

CREATE TABLE Congtrinh (
    MACT INT PRIMARY KEY,
    TENCT VARCHAR(150),
    DIADIEM VARCHAR(150),
    NGAYCAPGP DATE,
    NGAYKC DATE
);

CREATE TABLE Cong (
    MACT INT,
    MANV INT,
    SLNGAYCONG INT,
    PRIMARY KEY(MACT, MANV),
    FOREIGN KEY (MACT) REFERENCES Congtrinh(MACT),
    FOREIGN KEY (MANV) REFERENCES Nhanvien(MANV)
);

INSERT INTO Phongban VALUES
(1,'Hành chính'),
(2,'Kỹ thuật'),
(3,'Kế toán'),
(4,'Thi công'),
(5,'Nhân sự'),
(6,'Vật tư'),
(7,'An toàn'),
(8,'Giám sát'),
(9,'Thiết kế'),
(10,'CNTT');

INSERT INTO Nhanvien VALUES
(101,'Nguyen Van A','1985-05-12','Nam','Hà Nội',1),
(102,'Tran Thi B','1990-08-20','Nu','Hải Phòng',2),
(103,'Le Van C','1987-11-02','Nam','Nam Định',3),
(104,'Pham Thi D','1993-03-15','Nu','Thanh Hóa',4),
(105,'Hoang Van E','1989-12-25','Nam','Hà Nội',5),
(106,'Vu Thi F','1995-06-17','Nu','Bắc Ninh',2),
(107,'Do Van G','1984-02-10','Nam','Hà Nam',1),
(108,'Bui Thi H','1992-09-09','Nu','Ninh Bình',4),
(109,'Ngo Van I','1988-01-22','Nam','Hà Nội',6),
(110,'Nguyen Thi K','1996-07-30','Nu','Quảng Ninh',3),
(111,'Pham Van L','1983-04-14','Nam','Hà Nội',7),
(112,'Pham Thi M','1991-10-18','Nu','Hà Tĩnh',8),
(113,'Ngo Van N','1985-12-02','Nam','Hà Nội',9),
(114,'Vu Thi P','1994-11-27','Nu','Hòa Bình',10),
(115,'Bui Van Q','1986-05-05','Nam','Hà Nội',5),
(116,'Hoang Thi R','1993-07-13','Nu','Lạng Sơn',2),
(117,'Nguyen Van S','1982-03-29','Nam','Thái Bình',4),
(118,'Tran Thi T','1997-01-07','Nu','Tuyên Quang',1),
(119,'Do Van U','1989-09-19','Nam','Hà Nội',6),
(120,'Le Thi V','1995-02-23','Nu','Bắc Giang',3);

INSERT INTO Congtrinh VALUES
(201,'Chung cư A','Hà Nội','2021-03-01','2021-04-10'),
(202,'Cầu B','Hải Phòng','2020-08-15','2020-09-01'),
(203,'Trường học C','Nam Định','2022-02-05','2022-03-01'),
(204,'Bệnh viện D','Hà Nội','2021-11-20','2022-01-15'),
(205,'Nhà máy E','Bắc Ninh','2023-05-12','2023-06-01'),
(206,'Khu đô thị F','Hà Nội','2021-07-07','2021-08-10'),
(207,'Đường quốc lộ G','Thanh Hóa','2020-09-30','2021-01-10'),
(208,'Công viên H','Ninh Bình','2022-04-01','2022-04-20'),
(209,'Ký túc xá I','Hà Nội','2023-02-12','2023-03-01'),
(210,'Nhà văn hóa J','Quảng Ninh','2021-06-18','2021-07-05'),
(211,'Khu nghỉ dưỡng K','Hòa Bình','2022-10-10','2022-11-01'),
(212,'Trạm biến áp L','Hà Tĩnh','2023-01-10','2023-02-05'),
(213,'Nhà điều hành M','Lạng Sơn','2020-12-01','2021-01-10'),
(214,'Khu vui chơi N','Thái Bình','2023-03-15','2023-04-01'),
(215,'Hồ điều hòa O','Tuyên Quang','2022-09-10','2022-10-01');

INSERT INTO Cong VALUES
(201,101,20),
(202,102,18),
(203,103,22),
(204,104,15),
(205,105,25),
(206,106,20),
(207,107,19),
(208,108,21),
(209,109,16),
(210,110,24),
(211,111,18),
(212,112,22),
(213,113,20),
(214,114,17),
(215,115,23),
(201,116,19),
(202,117,21),
(203,118,20),
(204,119,18),
(205,120,26);


