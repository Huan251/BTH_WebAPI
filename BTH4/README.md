### Bai 1
## GET
# Lấy tất cả sản phẩm : http://localhost:3000/api/sanpham
# Lấy sản phẩm theo mã : http://localhost:3000/api/sanpham/:Ma
# Lấy tất cả danh mục : http://localhost:3000/api/danhmuc
# Lấy tất cả sản phẩm theo mã danh mục : http://localhost:3000/api/danhmuc/:maDanhMuc/sanpham
# Tìm kiếm theo tên : http://localhost:3000/api/sanpham/timkiem?ten=Ten
# Phân trang và sắp xếp sản phẩm :  http://localhost:3000/api/sanpham?page=2&size=6&sort=desc
# Thống kê sản phẩm theo danh mục : http://localhost:3000/api/thongke/sanpham-danhmuc

## POST
# Thêm sản phẩm http://localhost:3000/api/sanpham
# {
#    "Ma": "SP0010",
#    "Ten": "Điện Thoại ABC",
#    "DonGia": 12500000,
#    "MaDanhMuc": 101 
# }

## PUT
# Sửa sản phẩm http://localhost:3000/api/sanpham/:Ma
# {
#    "Ten": "Điện Thoại LQH",
#    "DonGia": 333333,
#    "MaDanhMuc": 101 
# }

## DELETE
# Xóa sản phẩm http://localhost:3000/api/sanpham/:Ma

### Bai2
## GET
# In ra tất cả nhân viên http://localhost:3000/api/nhanvien
# In nhân viên theo mã http://localhost:3000/api/nhanvien/101
# Lấy danh sách phòng ban http://localhost:3000/api/phongban
# Lấy nhân viên theo phòng ban http://localhost:3000/api/phongban/2/nhanvien
# Lấy danh sách công trình http://localhost:3000/api/congtrinh
# Thống kê số ngày công của nhân viên http://localhost:3000/api/thongke/nhanvien/101/ngaycong
## POST
#  http://localhost:3000/api/nhanvien
#  {
#    "MANV": 121,
#    "HOTEN": "Nguyen Van X",
#    "NGAYSINH": "1990-01-01",
#    "PHAI": "Nam",
#    "DIACHI": "Hà Nội",
#    "MAPB": 2
#  }
# Phân công nhân viên tham gia công trình http://localhost:3000/api/cong
#  {
#      "MACT": 201,
#      "MANV": 101,
#      "SLNGAYCONG": 20
#  }

## PUT
# http://localhost:3000/api/nhanvien/120
# {
#    "HOTEN": "Le Quang Huan",
#    "DIACHI": "Hà Nội",
#    "MAPB": 3
#  }

## DELETE
# http://localhost:3000/api/nhanvien/121

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
