create database NodeAPI_LQH;

use NodeAPI_LQH;

CREATE TABLE Users (
    id INT PRIMARY KEY,
    name NVARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);

INSERT INTO Users (id, name, email, phone) VALUES
(1, N'Lê Quang Huân ', 'huanbh2000@mail.com', '0962331640'),
(2, N'Sắn Pịa ', 'Yeupia2k5@mail.com', '02222222'),
(3, N'Sohail Perez', 'Email3@mail.com', ''),
(4, N'Merryn Peck', 'Email4@mail.com', '04444444'),
(5, N'Cairon Reynolds', 'Email5@mail.com', '');

SELECT * FROM Users;

-- bai1
CREATE TABLE NHANVIEN(
  maNV VARCHAR(30) PRIMARY KEY,
  TenNV VARCHAR(50) NOT NULL,
  GioiTinh VARCHAR(30) DEFAULT 'Nam',
  NgaySinh DATE,
  email VARCHAR(30),
  SDT CHAR(30)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;



INSERT INTO NHANVIEN (maNV, TenNV, GioiTinh, NgaySinh, email, SDT) VALUES
('NV111', 'Lê Quang Huân', 'Nam', '1990-05-12', 'huanexample.com', '0912345678'),
('NV001', 'Nguyen Van A', 'Nam', '1990-05-12', 'vana@example.com', '0912345678'),
('NV002', 'Tran Thi B', 'Nữ', '1992-08-23', 'thib@example.com', '0987654321'),
('NV003', 'Le Van C', 'Nam', '1988-01-15', 'levanc@example.com', '0901122334'),
('NV004', 'Pham Thi D', 'Nữ', '1995-11-30', 'phamd@example.com', '0978877665'),
('NV005', 'Hoang Van E', 'Nam', '1991-07-07', 'hoange@example.com', '0933445566');

SELECT * FROM NHANVIEN;

SELECT * FROM NHANVIEN WHERE TenNV LIKE '%Lê%';

SELECT * FROM NHANVIEN WHERE Ngaysinh > "1990-05-12";

-- bai2
CREATE TABLE SACH (
MASH VARCHAR(30) PRIMARY KEY,
TENSACH NVARCHAR(100),
TACGIA NVARCHAR(100),
NHAXB NVARCHAR(100),
NAMXB int);

INSERT INTO Sach (MASH,TENSACH, TACGIA, NHAXB, NAMXB) VALUES
('1122','Sắn và Pịa là đôi bạn thân', 'VinhconcuaboHuan', 'maimaiyeuPia', 2023),
('2501','Đào Ngọc Ánh và Lê Quang Huân', 'CuHuanVeLoc', 'yeudnaso1tg', 2024),
('101N','Harry Potter và Hòn Đá Phù Thủy', 'J.K. Rowling', 'Nhà xuất bản Trẻ', 2000),
('102N','Nhà Giả Kim', 'Paulo Coelho', 'Nhà xuất bản Văn Học', 1988),
('103N','Đắc Nhân Tâm', 'Dale Carnegie', 'Nhà xuất bản Lao Động', 1936),
('104N','Sapiens: Lược Sử Loài Người', 'Yuval Noah Harari', 'Nhà xuất bản Thế Giới', 2014),
('667','Bí Quyết Tay Trắng', 'Robert Kiyosaki', 'Nhà xuất bản Saigon Books', 2017),
('ABC','Dạy Con Làm Giàu', 'Robert Kiyosaki', 'Nhà xuất bản Trẻ', 2001),
('88A','Tiếng Gọi Nơi Hoang Dã', 'Jack London', 'Nhà xuất bản Văn Học', 1903),
('1001','Người Giàu Có Nhất Thành Babylon', 'George S. Clason', 'Nhà xuất bản Lao Động', 1926),
('A891','Từ Tốt Đến Vĩ Đại', 'Jim Collins', 'Nhà xuất bản Thế Giới', 2001),
('Huan','Bí Mật Tư Duy Triệu Phú', 'T. Harv Eker', 'Nhà xuất bản Saigon Books', 2005);

-- bai3
CREATE TABLE SINHVIEN (
    MaSV VARCHAR(30) PRIMARY KEY,
    TenSV NVARCHAR(50) NOT NULL,
    GioiTinh NVARCHAR(30) DEFAULT 'N''Nam', 
    DiaChi NVARCHAR(50),
    NgaySinh DATE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO SINHVIEN (MaSV, TenSV, GioiTinh, DiaChi, NgaySinh) VALUES
('huanle', N'Lê Quang Huân', N'Nam', N'Hưng Yên', '2022-08-20 '),
('diepnh', N'Nguyễn Hoàng Điệp', N'Nữ', N'Hưng Yên', '1984-08-26'),
('nangnth', N'Nguyễn Thị Hải Năng', N'Nữ', N'Hải Dương', '1994-09-19'),
('haunv', N'Nguyễn Văn Hậu', N'Nam', N'Hưng Yên', '1980-06-06'),
('quetnv', N'Nguyễn Văn Quyết', N'Nam', N'Hà Nội', '1987-01-06'),
('hoangvd', N'Vũ Đình Hoàng', N'Nam', N'Hà Nội', '2004-03-15'), 
('tranhth', N'Trần Thu Hà', N'Nữ', N'Thái Bình', '2001-11-20'); 

