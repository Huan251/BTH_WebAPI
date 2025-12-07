## get
-- Hang hoa
http://localhost:3000/api/hanghoas                  //lay tat ca hang hoa
http://localhost:3000/api/hanghoas/:MaLoai          //lay hang hoa theo ma loai
http://localhost:3000/api/hanghoas/tenloai/:name    //lay hang hoa theo ten loai
http://localhost:3000/api/hanghoas/soluongcon/nhonhon5              //lay hang hoa co so luong con nho hon 5
http://localhost:3000/api/hanghoas/giakhoang/:minPrice/:maxPrice    //lay hang hoa co gia nam trong khoang x -> y
http://localhost:3000/api/hanghoas/gia/:MaHang                      //lay hang hoa va gia theo ma hang
-- Gia ban 
http://localhost:3000/api/giabans                         //lay tat ca gia ban
http://localhost:3000/api/giabans/mahang/:MaHang          //lay gia ban theo ma hang
http://localhost:3000/api/giabans/giabanhientai/:MaHang   //lay gia hien tai cua mat hang co ma
## post
http://localhost:3000/api/hanghoas    //them hang hoa
http://localhost:3000/api/giabans     //them gia ban
## put
http://localhost:3000/api/hanghoas/:MaHang    //sua hang hoa co ma
http://localhost:3000/api/giabans/:MaGB       //sua gia ban theo ma
## delete
http://localhost:3000/api/hanghoas/:MaHang    //xoa hang hoa co ma
http://localhost:3000/api/giabans/:MaGB       //xoa gia ban theo ma


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
