## ==================================== GET ====================================

# Lấy tất cả danh mục : http://localhost:3000/api/danhmuc
# Lấy danh mục theo mã : http://localhost:3000/api/danhmuc/:ma_danh_muc

# Lấy tất cả nhà cung cấp : http://localhost:3000/api/nhacungcap
# Lấy nhà cung cấp theo mã : http://localhost:3000/api/nhacungcap/:ma_ncc

# Lấy tất cả sản phẩm : http://localhost:3000/api/sanpham
# Lấy sản phẩm theo mã : http://localhost:3000/api/sanpham/:ma_sp
# Lấy sản phẩm đã nhập theo mã NCC : http://localhost:3000/api/sanpham/ncc/:ma_ncc
# Lấy sản phẩm theo mã danh mục : http://localhost:3000/api/sanpham/danhmuc/:ma_danh_muc
# Lấy sản phẩm đã bán theo khách hàng : http://localhost:3000/api/sanpham/kh/:ma_kh

# Lấy tất cả phiếu nhập : http://localhost:3000/api/phieunhap
# Lấy phiếu nhập theo tháng & năm : http://localhost:3000/api/phieunhap/thangnam?thang=1&nam=2025
# Lấy phiếu nhập theo mã : http://localhost:3000/api/phieunhap/:ma_phieu_nhap
# Lấy phiếu nhập theo nhà cung cấp : http://localhost:3000/api/phieunhap/ncc/:ma_ncc

# Lấy tất cả chi tiết phiếu nhập : http://localhost:3000/api/ctpn
# Lấy chi tiết phiếu nhập theo mã : http://localhost:3000/api/ctpn/:ma_ctpn

# Lấy tất cả khách hàng : http://localhost:3000/api/khachhang
# Lấy khách hàng theo mã : http://localhost:3000/api/khachhang/:ma_kh

# Lấy tất cả hóa đơn : http://localhost:3000/api/hoadon
# Lấy hóa đơn theo tháng & năm : http://localhost:3000/api/hoadon/thangnam?thang=1&nam=2025
# Lấy hóa đơn theo mã : http://localhost:3000/api/hoadon/:ma_hd
# Lấy hóa đơn theo khách hàng : http://localhost:3000/api/hoadon/kh/:ma_kh
# Lấy tất cả sản phẩm của hóa đơn đó : http://localhost:3000/api/hoadon/:ma_hd/chi-tiet

# Lấy tất cả chi tiết hóa đơn : http://localhost:3000/api/cthd
# Lấy chi tiết hóa đơn theo mã : http://localhost:3000/api/cthd/:ma_cthd

## ==================================== POST ====================================
# Thêm danh mục : http://localhost:3000/api/danhmuc
# {
#    "ma_danh_muc": 202,
#    "ten_danh_muc": "2DoChoi",
#    "mo_ta": "Đồ chơi xe"
# }

# Thêm nhà cung cấp : http://localhost:3000/api/nhacungcap
# {
#    "ma_ncc": 101,
#    "ten_ncc": "Cty ABC",
#    "dien_thoai": "0909123456",
#    "dia_chi": "Hà Nội",
#    "email": "abc@gmail.com"
# }

# Thêm sản phẩm : http://localhost:3000/api/sanpham
# {
#    "ma_sp": 301,
#    "ten_sp": "Xe tải điều khiển",
#    "ma_danh_muc": 201,
#    "ma_ncc": 101,
#    "gia_ban": 250000,
#    "gia_nhap": 150000,
#    "so_luong_ton": 50,
#    "mo_ta": "Xe tải điều khiển từ xa"
# }

# Thêm phiếu nhập : http://localhost:3000/api/phieunhap
# {
#    "ma_phieu_nhap": 501,
#    "ma_ncc": 101,
#    "ngay_nhap": "2025-01-10"
# }

# Thêm chi tiết phiếu nhập : http://localhost:3000/api/ctpn
# {
#    "ma_ctpn": 601,
#    "ma_phieu_nhap": 501,
#    "ma_sp": 301,
#    "so_luong": 20,
#    "don_gia_nhap": 150000
# }

# Thêm khách hàng : http://localhost:3000/api/khachhang
# {
#    "ma_kh": 1,
#    "ten_kh": "Nguyễn Văn A",
#    "dien_thoai": "0988777666",
#    "dia_chi": "TP.HCM"
# }


# Thêm hóa đơn : http://localhost:3000/api/hoadon
# {
#    "ma_hd": 701,
#    "ma_kh": 1,
#    "ngay_ban": "2025-02-01",
#    "tong_tien": 500000
# }


# Thêm chi tiết hóa đơn : http://localhost:3000/api/cthd
# {
#    "ma_cthd": 801,
#    "ma_hd": 701,
#    "ma_sp": 301,
#    "so_luong": 2,
#     "don_gia_ban": 250000
# }


## ==================================== PUT ====================================
# Sửa chi tiết hóa đơn : http://localhost:3000/api/cthd/ma:cthd
# {
#    "Ten": "Điện Thoại LQH",
#    "DonGia": 333333,
#    "MaDanhMuc": 101 
# }

# Sửa danh mục : http://localhost:3000/api/danhmuc/:ma_danh_muc
# {
#  "ten_danh_muc": "Đồ chơi điều khiển",
#  "mo_ta": "Các loại đồ chơi điều khiển từ xa"
# }


# Sửa nhà cung cấp : http://localhost:3000/api/nhacungcap/:ma_ncc
# {
#  "ten_ncc": "Công ty đồ chơi ABC",
#  "dia_chi": "TP.HCM",
#  "dien_thoai": "0909123456"
# }


# Sửa sản phẩm : http://localhost:3000/api/sanpham/:ma_sp
# {
#  "ten_sp": "Xe điều khiển địa hình",
#  "ma_danh_muc": 1,
# "ma_ncc": 2,
#  "gia_ban": 350000
# }


# Sửa phiếu nhập : http://localhost:3000/api/phieunhap/:ma_phieu_nhap
# {
#  "ma_ncc": 3,
#  "ngay_nhap": "2025-01-15"
# }

# Sửa hóa đơn : http://localhost:3000/api/hoadon/:ma_hd
# {
#  "ma_kh": 5,
#  "ngay_ban": "2025-01-20",
#  "tong_tien": 1250000
# }

# Sửa sản phẩm http://localhost:3000/api/sanpham/:Ma
# {
#    "Ten": "Điện Thoại LQH",
#    "DonGia": 333333,
#    "MaDanhMuc": 101 
# }

# Sửa sản phẩm http://localhost:3000/api/sanpham/:Ma
# {
#    "Ten": "Điện Thoại LQH",
#    "DonGia": 333333,
#    "MaDanhMuc": 101 
# }


## ==================================== DELETE ====================================

# Xóa sản phẩm http://localhost:3000/api/sanpham/:Ma




## ⛩ **NodeJS Starter**

### **`About this repository 😎`**
This repository talks about how to build an outstanding web server using latest Javascript technologies that can help micro entrepreneurs swiftly reach economic freedom.

### **`Engine Requirement 🚜`**
```
  -- Node.js v16.x or v18.x
  -- NPM v8+
```

### **`Technology Stacks 🍔`**
```
  -- Node.js
  -- Koa.js (Express.js Godfather) 🔥🔥
  -- Morgan (for logging purposes)
  -- Mongodb 💾
```

### **`Project Structures 🏢`**
```
.
│── README.md
│── .env.example  (this will be the environment file)
|── .gitignore
|── package.json
|── index.js     (entry point)
└── controllers/
|   └── ...[.js]
└── helpers/
|   └── ...[.js]
└── libraries/
|   └── ...[.js]
└── middlewares/
|   └── ...[.js]
└── repositories/
|   └── ...[.js]
└── routes/
|   └── ...[.js]
└── services/
|   └── ...[.js] (db connection or third party api)
```

### **`Install Localy 🧑🏼‍🔧`**
1. install dependency. `npm install`  
1. copy .env.example and rename it into .env (`cp .env.example .env`)
1. ajust config in .env

### **`Running App 👟`**
`npm start`  

### **`Flow Development 🏗`**
During the development cycle, a variety of supporting branches are used:  

- feature/* -- feature branches are used to develop new features for the upcoming releases. May branch off from develop and must merge into develop.
- hotfix/* -- hotfix branches are necessary to act immediately upon an undesired status of master. May branch off from master and must merge into master and develop.

Creating a new feature  

1. create new branch from master. ex: `feature/name-of-feature`.
1. write your code.
1. don't forget to run `npm run lint` to check standardize code or `npm run lintfix` to auto fix non-standard code.
1. commit & push your work to the same named branch on the server.
1. create PR into development branch for testing in dev server.
1. if its pre-production ready then create PR from the same branch into staging. **DON'T PR FROM DEVELOPMENT BRANCH!**
1. if ready to production then create PR from the same branch into master/production. **DON'T PR FROM DEVELOPMENT BRANCH OR STAGING!**

### **`Deployment 🚀`**
This flow of deployment using Git Flow with 3 main branches  

- master -- this branch contains production code. All development code is merged into master in sometime.
- staging -- this branch is a nearly exact replica of a production environment for software testing.
- development/dev -- this branch contains pre-production code. When the features are finished then they are merged into develop.
