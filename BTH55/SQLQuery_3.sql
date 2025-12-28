CREATE DATABASE IF NOT EXISTS quan_ly_ban_hang;
USE quan_ly_ban_hang;

CREATE TABLE DanhMuc (
    MaDanhMuc INT AUTO_INCREMENT PRIMARY KEY,
    TenDanhMuc VARCHAR(255) NOT NULL
);

CREATE TABLE SanPham (
    Ma INT AUTO_INCREMENT PRIMARY KEY,
    Ten VARCHAR(255) NOT NULL,
    DonGia DECIMAL(15, 0) DEFAULT 0,
    MaDanhMuc INT,
	
    FOREIGN KEY (MaDanhMuc) REFERENCES DanhMuc(MaDanhMuc) ON DELETE SET NULL
);

INSERT INTO DanhMuc (TenDanhMuc) VALUES 
(N'Sách Văn Học Trong Nước'),
(N'Sách Văn Học Nước Ngoài'),
(N'Sách Kinh Tế - Quản Trị'),
(N'Sách Thiếu Nhi'),
(N'Sách Tâm Lý - Kỹ Năng');

INSERT INTO SanPham (Ten, DonGia, MaDanhMuc) VALUES 
(N'Dế Mèn Phiêu Lưu Ký', 50000, 1),
(N'Đất Rừng Phương Nam', 85000, 1),
(N'Số Đỏ', 60000, 1),
(N'Mắt Biếc', 110000, 1),
(N'Cánh Đồng Bất Tận', 75000, 1);

INSERT INTO SanPham (Ten, DonGia, MaDanhMuc) VALUES 
(N'Nhà Giả Kim', 79000, 2),
(N'Ông Già Và Biển Cả', 45000, 2),
(N'Rừng Na Uy', 120000, 2),
(N'Hai Số Phận', 135000, 2),
(N'Không Gia Đình', 98000, 2);

INSERT INTO SanPham (Ten, DonGia, MaDanhMuc) VALUES 
(N'Cha Giàu Cha Nghèo', 115000, 3),
(N'Đắc Nhân Tâm', 86000, 3),
(N'Nhà Đầu Tư Thông Minh', 180000, 3),
(N'Chiến Tranh Tiền Tệ', 145000, 3),
(N'Khởi Nghiệp Tinh Gọn', 110000, 3);

INSERT INTO SanPham (Ten, DonGia, MaDanhMuc) VALUES 
(N'Kính Vạn Hoa - Tập 1', 90000, 4),
(N'Harry Potter và Hòn Đá Phù Thủy', 150000, 4),
(N'Doraemon - Truyện Ngắn Tập 1', 25000, 4),
(N'Thần Đồng Đất Việt - Tập 1', 30000, 4),
(N'Pippi Tất Dài', 65000, 4);

INSERT INTO SanPham (Ten, DonGia, MaDanhMuc) VALUES 
(N'Quẳng Gánh Lo Đi Và Vui Sống', 95000, 5),
(N'Tuổi Trẻ Đáng Giá Bao Nhiêu', 80000, 5),
(N'Đời Thay Đổi Khi Chúng Ta Thay Đổi', 55000, 5),
(N'Hạt Giống Tâm Hồn', 45000, 5),
(N'Tư Duy Phản Biện', 88000, 5);