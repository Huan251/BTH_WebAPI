/* ================== BIẾN CHUNG ================== */
const API_URL = "http://localhost:3000/api";
const table = document.getElementById("data-table");
const title = document.getElementById("title");
const formArea = document.getElementById("form-area");
const subMenu = document.getElementById("sub-menu");

/* ================== RENDER TABLE ================== */
function renderTable(columns, rows) {
  let thead = "<thead><tr>";
  columns.forEach(c => thead += `<th>${c.label}</th>`);
  thead += "</tr></thead>";

  let tbody = "<tbody>";
  rows.forEach(r => {
    tbody += "<tr>";
    columns.forEach(c => tbody += `<td>${r[c.key] ?? ""}</td>`);
    tbody += "</tr>";
  });
  tbody += "</tbody>";

  table.innerHTML = thead + tbody;
}

function showTableOnly() {
  formArea.innerHTML = "";
  document.getElementById("table-area").style.display = "block";
}

function showFormOnly() {
  document.getElementById("table-area").style.display = "none";
}

/* ================== TÌM KIẾM ================== */
let danhMucData = [];
let nhaCungCapData = [];
let sanPhamData = [];
let khachHangData = [];
let phieuNhapData = [];
let ctPhieuNhapData = [];
let hoaDonData = [];
let ctHoaDonData = [];
let tonKhoData = [];

function renderSearchBox({ placeholder, onInputFunc }) {
  const searchArea = document.getElementById("search-area");

  searchArea.innerHTML = `
    <div class="search-box">
      <input
        type="text"
        placeholder="${placeholder}"
        oninput="${onInputFunc}()"
      />
    </div>
  `;
}

function searchByMaAndTen(data, maField, tenField, renderFunc) {
  const keyword = event.target.value.toLowerCase();

  const filtered = data.filter(item =>
    item[maField].toString().includes(keyword) ||
    item[tenField].toLowerCase().includes(keyword)
  );

  renderFunc(filtered);
}

function searchByMa(data, maField, renderFunc) {
  const keyword = event.target.value;

  const filtered = data.filter(item =>
    item[maField].toString().includes(keyword)
  );

  renderFunc(filtered);
}

/* ================================================= */
/* ================== DANH MỤC ===================== */
/* ================================================= */
function showDanhMuc() {
  title.innerText = "Danh mục";
  subMenu.innerHTML = `
    <button onclick="loadDanhMuc()">📋 Hiển thị</button>
    <button onclick="formDanhMuc()">➕ Thêm</button>
  `;
  formArea.innerHTML = "";
  loadDanhMuc();
  renderSearchBox({
  placeholder: "🔍 Tìm theo mã hoặc tên ",
  onInputFunc: "searchDanhMuc"
  });
}

async function loadDanhMuc() {
  showTableOnly();
  const res = await fetch(`${API_URL}/danhmuc`);
  danhMucData = await res.json();  

  renderTable(
    [
      { key: "ma_danh_muc", label: "Mã danh mục" },
      { key: "ten_danh_muc", label: "Tên danh mục" },
      { key: "mo_ta", label: "Mô tả" }
    ],
    danhMucData
  );
}

function formDanhMuc() {
  showFormOnly();
  title.innerText = "Thêm danh mục";

  formArea.innerHTML = `
    <div class="form-container">
      <div class="form-group">
        <label>Mã danh mục</label>
        <input id="ma_dm">
        <div class="error" id="e_ma_dm"></div>
      </div>

      <div class="form-group">
        <label>Tên danh mục</label>
        <input id="ten_dm">
        <div class="error" id="e_ten_dm"></div>
      </div>

      <div class="form-group">
        <label>Mô tả</label>
        <input id="mo_ta">
      </div>

      <button id="btnAddDM" disabled onclick="addDanhMuc()">Thêm</button>
    </div>
  `;

  ma_dm.oninput = ten_dm.oninput = validateDanhMuc;
}


function validateDanhMuc() {
  let ok = true;

  if (!ma_dm.value || ma_dm.value <= 0) {
    e_ma_dm.innerText = "Mã danh mục phải > 0";
    ok = false;
  } else e_ma_dm.innerText = "";

  if (!ten_dm.value.trim()) {
    e_ten_dm.innerText = "Tên danh mục không được trống";
    ok = false;
  } else e_ten_dm.innerText = "";

  btnAddDM.disabled = !ok;
}

async function addDanhMuc() {
  document.querySelectorAll(".error").forEach(e => e.innerText = "");

  const res = await fetch(`${API_URL}/danhmuc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ma_danh_muc: Number(ma_dm.value),
      ten_danh_muc: ten_dm.value,
      mo_ta: mo_ta.value
    })
  });

  const result = await res.json();

  if (!res.ok) {
    e_ma_dm.innerText = result.message || "Lỗi dữ liệu";
    return;
  }

  alert("Thêm danh mục thành công");
  loadDanhMuc();
}

async function tonTaiDanhMuc(ma) {
  const res = await fetch(`${API_URL}/danhmuc`);
  const data = await res.json();
  return data.some(d => d.ma_danh_muc === Number(ma));
}

async function checkMaDanhMuc() {
  e_ma_dm.innerText = "Đang kiểm tra...";
  const ok = await tonTaiDanhMuc(ma_dm.value);

  if (!ok) {
    e_ma_dm.innerText = "Danh mục không tồn tại";
  } else {
    e_ma_dm.innerText = "";
  }

  validateSanPham();
}

function searchDanhMuc() {
  const keyword = event.target.value.toLowerCase();

  const filtered = danhMucData.filter(dm =>
    dm.ma_danh_muc.toString().includes(keyword) ||
    dm.ten_danh_muc.toLowerCase().includes(keyword)
  );

  renderTable(
    [
      { key: "ma_danh_muc", label: "Mã danh mục" },
      { key: "ten_danh_muc", label: "Tên danh mục" },
      { key: "mo_ta", label: "Mô tả" }
    ],
    filtered
  );
}

/* ================================================= */
/* ================= NHÀ CUNG CẤP ================== */
/* ================================================= */
function showNhaCungCap() {
  title.innerText = "Nhà cung cấp";
  subMenu.innerHTML = `
    <button onclick="loadNCC()">📋 Hiển thị</button>
    <button onclick="formNCC()">➕ Thêm</button>
  `;
  formArea.innerHTML = "";
  loadNCC();
  renderSearchBox({
    placeholder: "🔍 Tìm theo mã hoặc tên",
    onInputFunc: "searchNhaCungCap"
  });
}

async function loadNCC() {
  showTableOnly();
  const res = await fetch(`${API_URL}/nhacungcap`);
  nhaCungCapData = await res.json();  

  renderTable(
    [
      { key: "MaNCC", label: "Mã NCC" },
      { key: "TenNCC", label: "Tên NCC" },
      { key: "DienThoai", label: "Điện thoại" },
      { key: "DiaChi", label: "Địa chỉ" },
      { key: "Email", label: "Email" }
    ],
    nhaCungCapData
  );
}

function formNCC() {
  showFormOnly();
  title.innerText = "Thêm nhà cung cấp";

  formArea.innerHTML = `
    <div class="form-container">
      <input id="ma_ncc" placeholder="Mã NCC">
      <div class="error" id="e_ma_ncc"></div>

      <input id="ten_ncc" placeholder="Tên NCC">
      <div class="error" id="e_ten_ncc"></div>

      <input id="dt" placeholder="Điện thoại">
      <input id="dc" placeholder="Địa chỉ">
      <input id="email" placeholder="Email">

      <button id="btnAddNCC" disabled onclick="addNCC()">Thêm</button>
    </div>
  `;

  ma_ncc.oninput = ten_ncc.oninput = validateNCC;
}

function validateNCC() {
  let ok = true;

  if (!ma_ncc.value || ma_ncc.value <= 0) {
    e_ma_ncc.innerText = "Mã NCC phải > 0";
    ok = false;
  } else e_ma_ncc.innerText = "";

  if (!ten_ncc.value.trim()) {
    e_ten_ncc.innerText = "Tên NCC không được trống";
    ok = false;
  } else e_ten_ncc.innerText = "";

  btnAddNCC.disabled = !ok;
}


async function addNCC() {
  document.querySelectorAll(".error").forEach(e => e.innerText = "");

  const res = await fetch(`${API_URL}/nhacungcap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ma_ncc: Number(ma_ncc.value),
      ten_ncc: ten_ncc.value,
      dien_thoai: dt.value,
      dia_chi: dc.value,
      email: email.value
    })
  });

  const result = await res.json();

  if (!res.ok) {
    e_ma_ncc.innerText = result.message || "Lỗi dữ liệu";
    return;
  }

  alert("Thêm NCC thành công");
  loadNCC();
}

function searchNhaCungCap() {
  const keyword = event.target.value.toLowerCase();

  const filtered = nhaCungCapData.filter(n =>
    n.MaNCC.toString().includes(keyword) ||
    n.TenNCC.toLowerCase().includes(keyword)
  );

  renderTable(
    [
      { key: "MaNCC", label: "Mã NCC" },
      { key: "TenNCC", label: "Tên NCC" },
      { key: "DienThoai", label: "Điện thoại" },
      { key: "DiaChi", label: "Địa chỉ" },
      { key: "Email", label: "Email" }
    ],
    filtered
  );
}

async function checkMaNCC() {
  e_ma_ncc.innerText = "Đang kiểm tra...";
  const ok = await tonTaiNCC(ma_ncc.value);

  if (!ok) {
    e_ma_ncc.innerText = "Nhà cung cấp không tồn tại";
  } else {
    e_ma_ncc.innerText = "";
  }

  validateSanPham();
}
async function tonTaiNCC(ma) {
  const res = await fetch(`${API_URL}/nhacungcap`);
  const data = await res.json();
  return data.some(n => n.MaNCC === Number(ma));
}

/* ================================================= */
/* ================== SẢN PHẨM ===================== */
/* ================================================= */
function showSanPham() {
  title.innerText = "Sản phẩm";
  subMenu.innerHTML = `
    <button onclick="loadSanPham()">📋 Hiển thị</button>
    <button onclick="formSanPham()">➕ Thêm</button>
  `;
  formArea.innerHTML = "";
  loadSanPham();
  renderSearchBox({
  placeholder: "🔍 Tìm theo mã hoặc tên",
  onInputFunc: "searchSanPham"
});

}

async function loadSanPham() {
  showTableOnly();

  const res = await fetch(`${API_URL}/sanpham`);
  sanPhamData = await res.json();  

  renderTable(
    [
      { key: "ma_sp", label: "Mã SP" },
      { key: "ten_sp", label: "Tên SP" },
      { key: "ma_danh_muc", label: "Mã danh mục" },
      { key: "ma_ncc", label: "Mã NCC" },
      { key: "gia_ban", label: "Giá bán" },
      { key: "gia_nhap", label: "Giá nhập" },
      { key: "so_luong_ton", label: "Tồn kho" },
      { key: "mo_ta", label: "Mô tả" }
    ],
    sanPhamData
  );
}

function formSanPham() {
    showFormOnly();
  title.innerText = "Thêm sản phẩm";
  formArea.innerHTML = `
    <div class="form-container">
      <div class="form-group">
        <label>Mã sản phẩm</label>
        <input id="ma_sp">
        <div class="error" id="e_ma_sp"></div>
      </div>

      <div class="form-group">
        <label>Tên sản phẩm</label>
        <input id="ten_sp">
        <div class="error" id="e_ten_sp"></div>
      </div>

      <div class="form-group">
        <label>Mã danh mục</label>
        <input id="ma_dm">
        <div class="error" id="e_ma_dm"></div>
      </div>

      <div class="form-group">
        <label>Mã NCC</label>
        <input id="ma_ncc">
        <div class="error" id="e_ma_ncc"></div>
      </div>

      <div class="form-group">
        <label>Giá bán</label>
        <input id="gia_ban">
        <div class="error" id="e_gia_ban"></div>
      </div>

      <div class="form-group">
        <label>Giá nhập</label>
        <input id="gia_nhap">
        <div class="error" id="e_gia_nhap"></div>
      </div>

      <div class="form-group">
        <label>Số lượng tồn</label>
        <input id="so_luong">
        <div class="error" id="e_so_luong"></div>
      </div>

      <div class="form-group">
        <label>Mô tả</label>
        <input id="mo_ta">
      </div>

      <button id="btnAdd" onclick="addSanPham()" disabled>Thêm</button>
    </div>
  `;

  document
    .querySelectorAll("input")
    .forEach(i => i.addEventListener("input", validateSanPham));
    ma_dm.addEventListener("blur", checkMaDanhMuc);
  ma_ncc.addEventListener("blur", checkMaNCC);
}

function validateSanPham() {
  let ok = true;

  function err(id, msg) {
    document.getElementById(id).innerText = msg;
    ok = false;
  }

  function clear(id) {
    document.getElementById(id).innerText = "";
  }

  if (!ma_sp.value || ma_sp.value <= 0) err("e_ma_sp", "Mã SP phải > 0");
  else clear("e_ma_sp");

  if (!ten_sp.value.trim()) err("e_ten_sp", "Tên sản phẩm không được trống");
  else clear("e_ten_sp");

  if (!ma_dm.value || ma_dm.value <= 0) err("e_ma_dm", "Mã danh mục không hợp lệ");
  else clear("e_ma_dm");

  if (!ma_ncc.value || ma_ncc.value <= 0) err("e_ma_ncc", "Mã NCC không hợp lệ");
  else clear("e_ma_ncc");

  if (!gia_ban.value || gia_ban.value <= 0) err("e_gia_ban", "Giá bán phải > 0");
  else clear("e_gia_ban");

  if (!gia_nhap.value || gia_nhap.value <= 0) err("e_gia_nhap", "Giá nhập phải > 0");
  else clear("e_gia_nhap");

  if (!so_luong.value || so_luong.value < 0) err("e_so_luong", "Số lượng >= 0");
  else clear("e_so_luong");
  if (gia_nhap.value &&gia_ban.value &&Number(gia_nhap.value) >= Number(gia_ban.value)) {
    e_gia_nhap.innerText = "Giá nhập phải nhỏ hơn giá bán";
    ok = false;
    } else if (e_gia_nhap.innerText === "Giá nhập phải nhỏ hơn giá bán") {
    e_gia_nhap.innerText = "";
    }
  btnAdd.disabled = !ok;
}

function hienLoiSanPham(msg) {
  if (msg.includes("Sản phẩm")) {
    e_ma_sp.innerText = msg;
  }
  else if (msg.includes("Danh mục")) {
    e_ma_dm.innerText = msg;
  }
  else if (msg.includes("Nhà cung cấp")) {
    e_ma_ncc.innerText = msg;
  }
  else if (msg.includes("Giá bán")) {
    e_gia_ban.innerText = msg;
  }
  else if (msg.includes("Giá nhập")) {
    e_gia_nhap.innerText = msg;
  }
  else {
    alert(msg); 
  }
}


async function addSanPham() {
  // xoá lỗi cũ
  document.querySelectorAll(".error").forEach(e => e.innerText = "");

  const data = {
    ma_sp: Number(ma_sp.value),
    ten_sp: ten_sp.value,
    ma_danh_muc: Number(ma_dm.value),
    ma_ncc: Number(ma_ncc.value),
    gia_ban: Number(gia_ban.value),
    gia_nhap: Number(gia_nhap.value),
    so_luong_ton: Number(so_luong.value),
    mo_ta: mo_ta.value
  };

  const res = await fetch(`${API_URL}/sanpham`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    hienLoiSanPham(result.message);
    return;
  }

  alert("Thêm sản phẩm thành công!");
  loadSanPham();
}

function searchSanPham() {
  const keyword = event.target.value.toLowerCase();

  const filtered = sanPhamData.filter(sp =>
    sp.ma_sp.toString().includes(keyword) ||
    sp.ten_sp.toLowerCase().includes(keyword)
  );

  renderTable(
    [
      { key: "ma_sp", label: "Mã SP" },
      { key: "ten_sp", label: "Tên SP" },
      { key: "ma_danh_muc", label: "Mã danh mục" },
      { key: "ma_ncc", label: "Mã NCC" },
      { key: "gia_ban", label: "Giá bán" },
      { key: "gia_nhap", label: "Giá nhập" },
      { key: "so_luong_ton", label: "Tồn kho" },
      { key: "mo_ta", label: "Mô tả" }
    ],
    filtered
  );
}



async function checkSanPhamTonTai() {
  const res = await fetch(`${API_URL}/sanpham`);
  const data = await res.json();
  const ok = data.some(s => s.ma_sp === Number(ma_sp.value));

  if (!ok) e_ma_sp.innerText = "Sản phẩm không tồn tại";
  else e_ma_sp.innerText = "";

  validateCTPN();
}

/* ================================================= */
/* ================= KHÁCH HÀNG ==================== */
/* ================================================= */
function showKhachHang() {
  title.innerText = "Khách hàng";
  subMenu.innerHTML = `
    <button onclick="loadKH()">📋 Hiển thị</button>
    <button onclick="formKH()">➕ Thêm</button>
  `;
  formArea.innerHTML = "";
  loadKH();
  renderSearchBox({
    placeholder: "🔍 Tìm theo mã hoặc tên",
    onInputFunc: "searchKhachHang"
  });

}

async function loadKH() {
  showTableOnly();
  const res = await fetch(`${API_URL}/khachhang`);
  khachHangData = await res.json(); 

  renderTable(
    [
      { key: "MaKH", label: "Mã KH" },
      { key: "TenKH", label: "Tên KH" },
      { key: "DienThoai", label: "Điện thoại" },
      { key: "DiaChi", label: "Địa chỉ" }
    ],
    khachHangData
  );
}


function formKH() {
  showFormOnly();
  title.innerText = "Thêm khách hàng";

  formArea.innerHTML = `
    <div class="form-container">
      <input id="ma_kh" placeholder="Mã KH">
      <div class="error" id="e_ma_kh"></div>

      <input id="ten_kh" placeholder="Tên KH">
      <div class="error" id="e_ten_kh"></div>

      <input id="dt" placeholder="Điện thoại">
      <input id="dc" placeholder="Địa chỉ">

      <button id="btnAddKH" disabled onclick="addKH()">Thêm</button>
    </div>
  `;

  ma_kh.oninput = ten_kh.oninput = validateKH;
}

function validateKH() {
  let ok = true;

  if (!ma_kh.value || ma_kh.value <= 0) {
    e_ma_kh.innerText = "Mã KH phải > 0";
    ok = false;
  } else e_ma_kh.innerText = "";

  if (!ten_kh.value.trim()) {
    e_ten_kh.innerText = "Tên KH không được trống";
    ok = false;
  } else e_ten_kh.innerText = "";

  btnAddKH.disabled = !ok;
}


async function addKH() {
  document.querySelectorAll(".error").forEach(e => e.innerText = "");

  const res = await fetch(`${API_URL}/khachhang`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ma_kh: Number(ma_kh.value),
      ten_kh: ten_kh.value,
      dien_thoai: dt.value,
      dia_chi: dc.value
    })
  });

  const result = await res.json();

  if (!res.ok) {
    e_ma_kh.innerText = result.message || "Lỗi dữ liệu";
    return;
  }

  alert("Thêm khách hàng thành công");
  loadKH();
}

function searchKhachHang() {
  const keyword = event.target.value.toLowerCase();

  const filtered = khachHangData.filter(kh =>
    kh.MaKH.toString().includes(keyword) ||
    kh.TenKH.toLowerCase().includes(keyword)
  );

  renderTable(
    [
      { key: "MaKH", label: "Mã KH" },
      { key: "TenKH", label: "Tên KH" },
      { key: "DienThoai", label: "Điện thoại" },
      { key: "DiaChi", label: "Địa chỉ" }
    ],
    filtered
  );
}

/* ================================================= */
/* ================= PHIẾU NHẬP ==================== */
/* ================================================= */
function showPhieuNhap() {
  title.innerText = "Phiếu nhập";
  subMenu.innerHTML = `
    <button onclick="loadPN()">📋 Hiển thị</button>
    <button onclick="formPN()">➕ Thêm</button>
  `;
  formArea.innerHTML = "";
  loadPN();
  renderSearchBox({
  placeholder: "🔍 Tìm theo mã",
  onInputFunc: "searchPhieuNhap"
});

}

async function loadPN() {
  showTableOnly();
  const res = await fetch(`${API_URL}/phieunhap`);
  phieuNhapData = await res.json();   // ✅

  renderTable(
    [
      { key: "MaPhieuNhap", label: "Mã PN" },
      { key: "MaNCC", label: "Mã NCC" },
      { key: "TenNCC", label: "Tên NCC" },
      { key: "NgayNhap", label: "Ngày nhập" }
    ],
    phieuNhapData
  );
}


function formPN() {
  showFormOnly();
  title.innerText = "Thêm phiếu nhập";

  (async () => {
    const res = await fetch(`${API_URL}/nhacungcap`);
    const nccs = await res.json();

    formArea.innerHTML = `
      <div class="form-container">
        <input id="ma_pn" placeholder="Mã phiếu nhập">
        <div class="error" id="e_ma_pn"></div>

        <select id="ma_ncc">
          <option value="">-- Chọn NCC --</option>
          ${nccs.map(n => `<option value="${n.MaNCC}">${n.TenNCC}</option>`).join("")}
        </select>

        <input id="ngay" type="date">

        <button id="btnAddPN" disabled onclick="addPN()">Thêm</button>
      </div>
    `;

    ma_pn.oninput = validatePN;
  })();
}

function validatePN() {
  btnAddPN.disabled = !ma_pn.value || ma_pn.value <= 0;
}


async function addPN() {
  const res = await fetch(`${API_URL}/phieunhap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ma_phieu_nhap: Number(ma_pn.value),
      ma_ncc: Number(ma_ncc.value),
      ngay_nhap: ngay.value
    })
  });

  const result = await res.json();

  if (!res.ok) {
    e_ma_pn.innerText = result.message || "Lỗi dữ liệu";
    return;
  }

  alert("Thêm phiếu nhập thành công");
  loadPN();
}

function searchPhieuNhap() {
  const keyword = event.target.value;

  const filtered = phieuNhapData.filter(p =>
    p.MaPhieuNhap.toString().includes(keyword)
  );

  renderTable(
    [
      { key: "MaPhieuNhap", label: "Mã PN" },
      { key: "MaNCC", label: "Mã NCC" },
      { key: "TenNCC", label: "Tên NCC" },
      { key: "NgayNhap", label: "Ngày nhập" }
    ],
    filtered
  );
}

async function checkPhieuNhapTonTai() {
  const res = await fetch(`${API_URL}/phieunhap`);
  const data = await res.json();
  const ok = data.some(p => p.MaPhieuNhap === Number(ma_pn.value));

  if (!ok) e_ma_pn.innerText = "Phiếu nhập không tồn tại";
  else e_ma_pn.innerText = "";

  validateCTPN();
}

/* ================================================= */
/* ============= CHI TIẾT PHIẾU NHẬP =============== */
/* ================================================= */
function showCTPN() {
  title.innerText = "Chi tiết phiếu nhập";
  subMenu.innerHTML = `
    <button onclick="loadCTPN()">📋 Hiển thị</button>
    <button onclick="formCTPN()">➕ Thêm</button>
  `;
  formArea.innerHTML = "";
  loadCTPN();
  renderSearchBox({
  placeholder: "🔍 Tìm theo mã",
  onInputFunc: "searchCTPN"
});

}

async function loadCTPN() {
  showTableOnly();
  const res = await fetch(`${API_URL}/ctpn`);
  ctPhieuNhapData = await res.json();   // ✅

  renderTable(
    [
      { key: "MaCTPN", label: "Mã CTPN" },
      { key: "MaPhieuNhap", label: "Mã PN" },
      { key: "MaSanPham", label: "Mã SP" },
      { key: "TenSanPham", label: "Tên SP" },
      { key: "SoLuong", label: "Số lượng" },
      { key: "DonGiaNhap", label: "Đơn giá nhập" },
      { key: "ThanhTien", label: "Thành tiền" }
    ],
    ctPhieuNhapData
  );
}


function formCTPN() {
  showFormOnly();
  title.innerText = "Thêm chi tiết phiếu nhập";

  formArea.innerHTML = `
    <div class="form-container">
      <div class="form-group">
        <label>Mã CTPN</label>
        <input id="ma_ctpn">
        <div class="error" id="e_ma_ctpn"></div>
      </div>

      <div class="form-group">
        <label>Mã phiếu nhập</label>
        <input id="ma_pn">
        <div class="error" id="e_ma_pn"></div>
      </div>

      <div class="form-group">
        <label>Mã sản phẩm</label>
        <input id="ma_sp">
        <div class="error" id="e_ma_sp"></div>
      </div>

      <div class="form-group">
        <label>Số lượng</label>
        <input id="so_luong">
        <div class="error" id="e_so_luong"></div>
      </div>

      <div class="form-group">
        <label>Đơn giá nhập</label>
        <input id="don_gia">
        <div class="error" id="e_don_gia"></div>
      </div>

      <button id="btnAddCTPN" disabled onclick="addCTPN()">Thêm</button>
    </div>
  `;

  document
    .querySelectorAll("#ma_ctpn,#ma_pn,#ma_sp,#so_luong,#don_gia")
    .forEach(el => el.addEventListener("input", validateCTPN));

  ma_pn.addEventListener("blur", checkPhieuNhapTonTai);
  ma_sp.addEventListener("blur", checkSanPhamTonTai);
}

function validateCTPN() {
  let ok = true;

  if (!ma_ctpn.value || ma_ctpn.value <= 0) {
    e_ma_ctpn.innerText = "Mã CTPN phải > 0";
    ok = false;
  } else e_ma_ctpn.innerText = "";

  if (!ma_pn.value || ma_pn.value <= 0) {
    e_ma_pn.innerText = "Mã phiếu nhập không hợp lệ";
    ok = false;
  }

  if (!ma_sp.value || ma_sp.value <= 0) {
    e_ma_sp.innerText = "Mã sản phẩm không hợp lệ";
    ok = false;
  }

  if (!so_luong.value || so_luong.value <= 0) {
    e_so_luong.innerText = "Số lượng phải > 0";
    ok = false;
  } else e_so_luong.innerText = "";

  if (!don_gia.value || don_gia.value <= 0) {
    e_don_gia.innerText = "Đơn giá phải > 0";
    ok = false;
  } else e_don_gia.innerText = "";

  btnAddCTPN.disabled = !ok;
}

async function addCTPN() {
  document.querySelectorAll(".error").forEach(e => e.innerText = "");

  const res = await fetch(`${API_URL}/ctpn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ma_ctpn: Number(ma_ctpn.value),
      ma_phieu_nhap: Number(ma_pn.value),
      ma_sp: Number(ma_sp.value),
      so_luong: Number(so_luong.value),
      don_gia_nhap: Number(don_gia.value)
    })
  });

  const result = await res.json();

  if (!res.ok) {
    e_ma_ctpn.innerText = result.message || "Lỗi dữ liệu";
    return;
  }

  alert("Thêm chi tiết phiếu nhập thành công");
}
function searchCTPN() {
  const keyword = event.target.value;

  const filtered = ctPhieuNhapData.filter(ct =>
    ct.MaCTPN.toString().includes(keyword)
  );

  renderTable(
    [
      { key: "MaCTPN", label: "Mã CTPN" },
      { key: "MaPhieuNhap", label: "Mã PN" },
      { key: "MaSanPham", label: "Mã SP" },
      { key: "TenSanPham", label: "Tên SP" },
      { key: "SoLuong", label: "Số lượng" },
      { key: "DonGiaNhap", label: "Đơn giá nhập" },
      { key: "ThanhTien", label: "Thành tiền" }
    ],
    filtered
  );
}


/* ================================================= */
/* ================== HÓA ĐƠN ====================== */
/* ================================================= */
function showHoaDon() {
  title.innerText = "Hóa đơn";
  subMenu.innerHTML = `
    <button onclick="loadHD()">📋 Hiển thị</button>
    <button onclick="formHD()">➕ Thêm</button>
  `;
  formArea.innerHTML = "";
  loadHD();
  renderSearchBox({
  placeholder: "🔍 Tìm theo mã",
  onInputFunc: "searchHoaDon"
});
}

async function loadHD() {
  showTableOnly();
  const res = await fetch(`${API_URL}/hoadon`);
  hoaDonData = await res.json();   // ✅

  renderTable(
    [
      { key: "MaHD", label: "Mã HD" },
      { key: "MaKH", label: "Mã KH" },
      { key: "TenKH", label: "Tên KH" },
      { key: "NgayBan", label: "Ngày bán" },
      { key: "TongTien", label: "Tổng tiền" }
    ],
    hoaDonData
  );
}


function formHD() {
  showFormOnly();
  title.innerText = "Thêm hóa đơn";

  (async () => {
    const res = await fetch(`${API_URL}/khachhang`);
    const khs = await res.json();

    formArea.innerHTML = `
      <div class="form-container">
        <input id="ma_hd" placeholder="Mã hóa đơn">
        <div class="error" id="e_ma_hd"></div>

        <select id="ma_kh">
          <option value="">-- Chọn KH --</option>
          ${khs.map(k => `<option value="${k.MaKH}">${k.TenKH}</option>`).join("")}
        </select>

        <input id="ngay" type="date">
        <input id="tt" placeholder="Tổng tiền">

        <button id="btnAddHD" disabled onclick="addHD()">Thêm</button>
      </div>
    `;

    ma_hd.oninput = validateHD;
  })();
}
function validateHD() {
  btnAddHD.disabled = !ma_hd.value || ma_hd.value <= 0;
}


async function addHD() {
  const res = await fetch(`${API_URL}/hoadon`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ma_hd: Number(ma_hd.value),
      ma_kh: Number(ma_kh.value),
      ngay_ban: ngay.value,
      tong_tien: Number(tt.value)
    })
  });

  const result = await res.json();

  if (!res.ok) {
    e_ma_hd.innerText = result.message || "Lỗi dữ liệu";
    return;
  }

  alert("Thêm hóa đơn thành công");
  loadHD();
}
async function checkHoaDonTonTai() {
  const res = await fetch(`${API_URL}/hoadon`);
  const data = await res.json();
  const ok = data.some(h => h.MaHD === Number(ma_hd.value));

  if (!ok) e_ma_hd.innerText = "Hóa đơn không tồn tại";
  else e_ma_hd.innerText = "";

  validateCTHD();
}

function searchHoaDon() {
  const keyword = event.target.value;

  const filtered = hoaDonData.filter(h =>
    h.MaHD.toString().includes(keyword)
  );

  renderTable(
    [
      { key: "MaHD", label: "Mã HD" },
      { key: "MaKH", label: "Mã KH" },
      { key: "TenKH", label: "Tên KH" },
      { key: "NgayBan", label: "Ngày bán" },
      { key: "TongTien", label: "Tổng tiền" }
    ],
    filtered
  );
}


/* ================================================= */
/* =============== CHI TIẾT HÓA ĐƠN ================ */
/* ================================================= */
function showCTHD() {
  title.innerText = "Chi tiết hóa đơn";
  subMenu.innerHTML = `
    <button onclick="loadCTHD()">📋 Hiển thị</button>
    <button onclick="formCTHD()">➕ Thêm</button>
  `;
  formArea.innerHTML = "";
  loadCTHD();
  renderSearchBox({
  placeholder: "🔍 Tìm theo mã",
  onInputFunc: "searchCTHD"
});

}

async function loadCTHD() {
  showTableOnly();

  const res = await fetch(`${API_URL}/cthd`);
  ctHoaDonData = await res.json();   // ⭐ CỰC QUAN TRỌNG

  renderTable(
    [
      { key: "MaCTHD", label: "Mã CTHD" },
      { key: "MaHoaDon", label: "Mã hóa đơn" },
      { key: "MaSanPham", label: "Mã sản phẩm" },
      { key: "TenSanPham", label: "Tên sản phẩm" },
      { key: "SoLuong", label: "Số lượng" },
      { key: "DonGiaBan", label: "Đơn giá bán" },
      { key: "ThanhTien", label: "Thành tiền" }
    ],
    ctHoaDonData
  );
}



function formCTHD() {
  showFormOnly();
  title.innerText = "Thêm chi tiết hóa đơn";

  formArea.innerHTML = `
    <div class="form-container">
      <div class="form-group">
        <label>Mã CTHD</label>
        <input id="ma_cthd">
        <div class="error" id="e_ma_cthd"></div>
      </div>

      <div class="form-group">
        <label>Mã hóa đơn</label>
        <input id="ma_hd">
        <div class="error" id="e_ma_hd"></div>
      </div>

      <div class="form-group">
        <label>Mã sản phẩm</label>
        <input id="ma_sp">
        <div class="error" id="e_ma_sp"></div>
      </div>

      <div class="form-group">
        <label>Số lượng</label>
        <input id="so_luong">
        <div class="error" id="e_so_luong"></div>
      </div>

      <div class="form-group">
        <label>Đơn giá bán</label>
        <input id="don_gia">
        <div class="error" id="e_don_gia"></div>
      </div>

      <button id="btnAddCTHD" disabled onclick="addCTHD()">Thêm</button>
    </div>
  `;

  document
    .querySelectorAll("#ma_cthd,#ma_hd,#ma_sp,#so_luong,#don_gia")
    .forEach(el => el.addEventListener("input", validateCTHD));

  ma_hd.addEventListener("blur", checkHoaDonTonTai);
  ma_sp.addEventListener("blur", checkSanPhamTonTai);
}

function validateCTHD() {
  let ok = true;

  if (!ma_cthd.value || ma_cthd.value <= 0) {
    e_ma_cthd.innerText = "Mã CTHD phải > 0";
    ok = false;
  } else e_ma_cthd.innerText = "";

  if (!ma_hd.value || ma_hd.value <= 0) {
    e_ma_hd.innerText = "Mã hóa đơn không hợp lệ";
    ok = false;
  }

  if (!ma_sp.value || ma_sp.value <= 0) {
    e_ma_sp.innerText = "Mã sản phẩm không hợp lệ";
    ok = false;
  }

  if (!so_luong.value || so_luong.value <= 0) {
    e_so_luong.innerText = "Số lượng phải > 0";
    ok = false;
  } else e_so_luong.innerText = "";

  if (!don_gia.value || don_gia.value <= 0) {
    e_don_gia.innerText = "Đơn giá phải > 0";
    ok = false;
  } else e_don_gia.innerText = "";

  btnAddCTHD.disabled = !ok;
}

async function addCTHD() {
  document.querySelectorAll(".error").forEach(e => e.innerText = "");

  const res = await fetch(`${API_URL}/cthd`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ma_cthd: Number(ma_cthd.value),
      ma_hd: Number(ma_hd.value),
      ma_sp: Number(ma_sp.value),
      so_luong: Number(so_luong.value),
      don_gia_ban: Number(don_gia.value)
    })
  });

  const result = await res.json();

  if (!res.ok) {
    e_ma_cthd.innerText = result.message || "Lỗi dữ liệu";
    return;
  }

  alert("Thêm chi tiết hóa đơn thành công");
}
function searchCTHD() {
  const keyword = event.target.value;

  const filtered = ctHoaDonData.filter(ct =>
    ct.MaCTHD.toString().includes(keyword)
  );

  renderTable(
    [
      { key: "MaCTHD", label: "Mã CTHD" },
      { key: "MaHoaDon", label: "Mã HD" },
      { key: "MaSanPham", label: "Mã SP" },
      { key: "TenSanPham", label: "Tên SP" },
      { key: "SoLuong", label: "Số lượng" },
      { key: "DonGiaBan", label: "Đơn giá bán" },
      { key: "ThanhTien", label: "Thành tiền" }
    ],
    filtered
  );
}



/* ================================================= */
/* =================== TỒN KHO ===================== */
/* ================================================= */

function showTonKho() {
  title.innerText = "Bảng tồn kho";
  subMenu.innerHTML = `<button onclick="loadTonKho()">📋 Hiển thị</button>`;
  formArea.innerHTML = "";
  loadTonKho();
  renderSearchBox({
  placeholder: "🔍 Tìm theo mã ",
  onInputFunc: "searchTonKho"
});

}

async function loadTonKho() {
  showTableOnly();

  const res = await fetch(`${API_URL}/tonkho`);
  tonKhoData = await res.json();   // ⭐ CỰC QUAN TRỌNG

  renderTable(
    [
      { key: "ma_sp", label: "Mã sản phẩm" },
      { key: "ten_sp", label: "Tên sản phẩm" },
      { key: "ma_ncc", label: "Mã NCC" },
      { key: "ten_ncc", label: "Tên NCC" },
      { key: "sl_nhap", label: "Số lượng nhập" },
      { key: "sl_ban", label: "Số lượng bán" },
      { key: "ton_kho", label: "Số lượng tồn" }
    ],
    tonKhoData
  );
}

function searchTonKho() {
  const keyword = event.target.value;

  const filtered = tonKhoData.filter(t =>
    t.ma_sp.toString().includes(keyword)
  );

  renderTable(
    [
      { key: "ma_sp", label: "Mã sản phẩm" },
      { key: "ten_sp", label: "Tên sản phẩm" },
      { key: "ma_ncc", label: "Mã NCC" },
      { key: "ten_ncc", label: "Tên NCC" },
      { key: "sl_nhap", label: "Số lượng nhập" },
      { key: "sl_ban", label: "Số lượng bán" },
      { key: "ton_kho", label: "Số lượng tồn" }
    ],
    filtered
  );
}


