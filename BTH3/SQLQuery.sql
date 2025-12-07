/*-----------------------------------Bai 1---------------------------------*/
-- Tạo database
create database NodeAPI_LQH_3;

use NodeAPI_LQH_3;

--- 1 
CREATE TABLE LoaiHang(
	MaLoai nvarchar(30)  PRIMARY KEY,
	TenLoai nvarchar(50) NOT NULL,
	MoTa nvarchar(50)
);
CREATE TABLE HangHoa(
     MaHang nvarchar(30) PRIMARY KEY,
     MaLoai nvarchar(30) not null,
     Tenhang nvarchar(50),
     SoLuong int default 10,
     SoLuongCon int default 1,
	 CONSTRAINT FR_loaihang_hanghoa FOREIGN KEY (MaLoai) REFERENCES LoaiHang(MaLoai)
);
CREATE TABLE GiaBan(
	 MaGB nvarchar(30) PRIMARY KEY,
     MaHang nvarchar(30) not null,
	 Gia int default 0,
     DVTinh nvarchar(30),
     NgayBD DATE DEFAULT (CURDATE()),
     NgayKT date,
	 CONSTRAINT FR_hanghoa_giaban FOREIGN KEY (MaHang) REFERENCES HangHoa(MaHang)
);

INSERT INTO LoaiHang (MaLoai, TenLoai, MoTa) VALUES
('SK', 'Sức Khỏe', 'Thực phẩm chức năng, thiết bị y tế'),
('TB', 'Thiết Bị Văn Phòng', 'Máy in, giấy tờ, văn phòng phẩm'),
('DT', 'Điện Tử', 'Các sản phẩm công nghệ và điện tử'),
('GD', 'Gia Dụng', 'Các vật dụng thiết yếu trong gia đình'),
('TT', 'Thời Trang', 'Quần áo và phụ kiện cá nhân');

INSERT INTO HangHoa (MaHang, MaLoai, Tenhang, SoLuong, SoLuongCon) VALUES
('THUOC', 'SK', 'Thuốc chữa bệnh cúm', 60, 	4),
('MAYXAY', 'GD', 'Máy Xay Sinh Tố', 60, 55),
('AIR3', 'DT', 'Tai Nghe Air Pro 3', 5, 3), 
('VIT', 'TT', 'Ví Da Cá Sấu', 30, 30),
('IP15', 'DT', 'iPhone 15 Pro Max', 50, 48),
('NCA', 'GD', 'Nồi Chiên Không Dầu', 100, 95),
('ASHOODIE', 'TT', 'Áo Hoodie Unisex', 200, 180);

INSERT INTO GiaBan (MaGB, MaHang, Gia, DVTinh, NgayBD, NgayKT) VALUES
('THUOC123', 'THUOC', 15005000, 'VNĐ', CURDATE(), NULL), 
('GSSG_04', 'AIR3', 18000000, 'VNĐ', CURDATE(), NULL), 
('GIP15_01', 'IP15', 30000000, 'VNĐ', CURDATE(), NULL),
('GNC_02', 'NCA', 1500000, 'VNĐ', CURDATE(), NULL),
('GNC_01', 'NCA', 1800000, 'VNĐ', '2025-01-01', '2025-11-30'),
('GTT_03', 'ASHOODIE', 450000, 'VNĐ', CURDATE(), NULL);

SELECT * FROM LoaiHang;
SELECT * FROM HangHoa;
SELECT * FROM GiaBan;

/*-----------------------------------Bai 2---------------------------------*/
-- 2.1
CREATE DATABASE QLSinhVien_Bai21 
USE QLSinhVien_Bai21;

CREATE TABLE SinhVien (
    MASV VARCHAR(20) PRIMARY KEY,
    HOTEN VARCHAR(50) NOT NULL
);

CREATE TABLE LopHoc (
    KYHIEU VARCHAR(20) PRIMARY KEY,
    TENMONHOC VARCHAR(50) NOT NULL,
    THOIGIAN VARCHAR(50)
);

CREATE TABLE GiaoVien (
    MAGV VARCHAR(20) PRIMARY KEY,
    TENGV VARCHAR(50) NOT NULL
);
-- 2.2
CREATE DATABASE QLSinhVien_Bai22;
USE QLSinhVien_Bai22;

CREATE TABLE SinhVien (
    MaSV VARCHAR(20) PRIMARY KEY,
    Ten_SV VARCHAR(50) NOT NULL,
    Gioi_tinh VARCHAR(10),
    Dia_chi VARCHAR(100),
    Ngay_sinh DATE
);

CREATE TABLE MonHoc (
    MaMH VARCHAR(20) PRIMARY KEY,
    Ten_mon VARCHAR(50) NOT NULL,
    Chuyen_nganh VARCHAR(50),
    So_hoc_trinh INT
);

CREATE TABLE GiaoVien (
    MaGV VARCHAR(20) PRIMARY KEY,
    Ten_GV VARCHAR(50) NOT NULL,
    Chuyen_nganh VARCHAR(50),
    Dia_chi VARCHAR(100),
    Dien_thoai VARCHAR(20)
);

CREATE TABLE BangDiem (
    MaSV VARCHAR(20),
    Ma_mon VARCHAR(20),
    Diem FLOAT,
    PRIMARY KEY (MaSV, Ma_mon),
    FOREIGN KEY (MaSV) REFERENCES SinhVien(MaSV),
    FOREIGN KEY (Ma_mon) REFERENCES MonHoc(MaMH)
);

CREATE TABLE GV_DAY (
    MaGV VARCHAR(20),
    MaMH VARCHAR(20),
    PRIMARY KEY (MaGV, MaMH),
    FOREIGN KEY (MaGV) REFERENCES GiaoVien(MaGV),
    FOREIGN KEY (MaMH) REFERENCES MonHoc(MaMH)
);
-- 2.3
CREATE DATABASE QLNhanVien23;
USE QLNhanVien23;

CREATE TABLE Phongban (
    MAPB VARCHAR(10) PRIMARY KEY,
    TENPB VARCHAR(50) NOT NULL
);

CREATE TABLE Nhanvien (
    MANV VARCHAR(20) PRIMARY KEY,
    HOTEN VARCHAR(50) NOT NULL,
    NGAYSINH DATE,
    PHAI VARCHAR(10),
    DIACHI VARCHAR(100),
    MAPB VARCHAR(10),
    FOREIGN KEY (MAPB) REFERENCES Phongban(MAPB)
);

CREATE TABLE Congtrinh (
    MACT VARCHAR(20) PRIMARY KEY,
    TENCT VARCHAR(100) NOT NULL,
    DIADIEM VARCHAR(100),
    NGAYCAPGP DATE,
    NGAYKC DATE
);

CREATE TABLE Cong (
    MACT VARCHAR(20),
    MANV VARCHAR(20),
    SLNGAYCONG INT DEFAULT 0,
    PRIMARY KEY (MACT, MANV),
    FOREIGN KEY (MACT) REFERENCES Congtrinh(MACT),
    FOREIGN KEY (MANV) REFERENCES Nhanvien(MANV)
);
-- 2.4
CREATE DATABASE QLThuVien24;
USE QLThuVien24;

CREATE TABLE Docgia (
    MADG VARCHAR(20) PRIMARY KEY,
    HOTEN VARCHAR(50) NOT NULL,
    NGAYSINH DATE,
    DIACHI VARCHAR(100),
    NGHENGHIEP VARCHAR(50)
);

CREATE TABLE Sach (
    MASH VARCHAR(20) PRIMARY KEY,
    TENSACH VARCHAR(100) NOT NULL,
    TACGIA VARCHAR(50),
    NHAXB VARCHAR(50),
    NAMXB INT
);

CREATE TABLE Phieumuon (
    SOPM VARCHAR(20) PRIMARY KEY,
    NGAYMUON DATE DEFAULT (CURRENT_DATE),
    MADG VARCHAR(20) NOT NULL,

    CONSTRAINT FK_Phieumuon_Docgia FOREIGN KEY (MADG) REFERENCES Docgia(MADG)
);

CREATE TABLE Dausach (
    MADAUSACH VARCHAR(20) PRIMARY KEY,
    BAN VARCHAR(20),
    TAP VARCHAR(20),
    MASH VARCHAR(20) NOT NULL,

    CONSTRAINT FK_Dausach_Sach FOREIGN KEY (MASH) REFERENCES Sach(MASH)
);

CREATE TABLE Chitietmuon (
    SOPM VARCHAR(20),
    MADAUSACH VARCHAR(20),
    NGAYTRA DATE,

    PRIMARY KEY (SOPM, MADAUSACH),
    
    CONSTRAINT FK_CTM_Phieumuon FOREIGN KEY (SOPM) REFERENCES Phieumuon(SOPM),
    CONSTRAINT FK_CTM_Dausach FOREIGN KEY (MADAUSACH) REFERENCES Dausach(MADAUSACH)
);
-- 2.5
CREATE DATABASE QuanLyDeAn25;
USE QuanLyDeAn25;

CREATE TABLE DONVI (
    MasoDV INT PRIMARY KEY,
    TenDV VARCHAR(50) NOT NULL,
    MasoNQL INT,
    Ngaybatdau DATE
);

CREATE TABLE NHANVIEN (
    MasoNV INT PRIMARY KEY,
    Hodem VARCHAR(50),
    Ten VARCHAR(20) NOT NULL,
    Ngaysinh DATE,
    DiaChi VARCHAR(100),
    Luong DECIMAL(10, 2),
    Gioitinh VARCHAR(10),
    MasoNGS INT,
    MasoDV INT NOT NULL,
    
    CONSTRAINT FK_NV_DonVi FOREIGN KEY (MasoDV) REFERENCES DONVI(MasoDV)
);

ALTER TABLE DONVI 
ADD CONSTRAINT FK_DonVi_QuanLy FOREIGN KEY (MasoNQL) REFERENCES NHANVIEN(MasoNV);

ALTER TABLE NHANVIEN 
ADD CONSTRAINT FK_NV_GiamSat FOREIGN KEY (MasoNGS) REFERENCES NHANVIEN(MasoNV);

CREATE TABLE DONVI_DIADIEM (
    MasoDV INT,
    DiaiemDV VARCHAR(100),
    
    PRIMARY KEY (MasoDV, DiaiemDV),
    CONSTRAINT FK_DVDD_DonVi FOREIGN KEY (MasoDV) REFERENCES DONVI(MasoDV)
);

CREATE TABLE DUAN (
    MaDA INT PRIMARY KEY,
    TenDA VARCHAR(100) NOT NULL,
    DiaDiemDA VARCHAR(100),
    MasoDV INT,
    
    CONSTRAINT FK_DuAn_DonVi FOREIGN KEY (MasoDV) REFERENCES DONVI(MasoDV)
);

CREATE TABLE NHANVIEN_DUAN (
    MasoNV INT,
    MasoDA INT,
    Sogio FLOAT,
    
    PRIMARY KEY (MasoNV, MasoDA),
    CONSTRAINT FK_PC_NhanVien FOREIGN KEY (MasoNV) REFERENCES NHANVIEN(MasoNV),
    CONSTRAINT FK_PC_DuAn FOREIGN KEY (MasoDA) REFERENCES DUAN(MaDA)
);

CREATE TABLE PHUTHUOC (
    MasoNV INT,
    Tencon VARCHAR(50),
    Gioitinh VARCHAR(10),
    Ngaysinh DATE,
    
    PRIMARY KEY (MasoNV, Tencon),
    CONSTRAINT FK_PT_NhanVien FOREIGN KEY (MasoNV) REFERENCES NHANVIEN(MasoNV)
);