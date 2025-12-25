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
}

async function loadDanhMuc() {
    showTableOnly();

    const res = await fetch(`${API_URL}/danhmuc`);
    const data = await res.json();

    renderTable(
    [
      { key: "ma_danh_muc", label: "Mã danh mục" },
      { key: "ten_danh_muc", label: "Tên danh mục" },
      { key: "mo_ta", label: "Mô tả" }
    ],
        data
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
}

async function loadNCC() {
    showTableOnly();
  const res = await fetch(`${API_URL}/nhacungcap`);
  const data = await res.json();

  renderTable(
    [
      { key: "MaNCC", label: "Mã NCC" },
      { key: "TenNCC", label: "Tên NCC" },
      { key: "DienThoai", label: "Điện thoại" },
      { key: "DiaChi", label: "Địa chỉ" },
      { key: "Email", label: "Email" }
    ],
    data
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
}

async function loadSanPham() {
    showTableOnly();
  const res = await fetch(`${API_URL}/sanpham`);
  const data = await res.json();

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
    data
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
    alert(msg); // fallback an toàn
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
}

async function loadKH() {
    showTableOnly();
  const res = await fetch(`${API_URL}/khachhang`);
  const data = await res.json();

  renderTable(
    [
      { key: "MaKH", label: "Mã KH" },
      { key: "TenKH", label: "Tên KH" },
      { key: "DienThoai", label: "Điện thoại" },
      { key: "DiaChi", label: "Địa chỉ" }
    ],
    data
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
}

async function loadPN() {
    showTableOnly();
  const res = await fetch(`${API_URL}/phieunhap`);
  const data = await res.json();

  renderTable(
    [
      { key: "MaPhieuNhap", label: "Mã PN" },
      { key: "MaNCC", label: "Mã NCC" },
      { key: "TenNCC", label: "Tên NCC" },
      { key: "NgayNhap", label: "Ngày nhập" }
    ],
    data
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
}

async function loadHD() {
    showTableOnly();
  const res = await fetch(`${API_URL}/hoadon`);
  const data = await res.json();

  renderTable(
    [
      { key: "MaHD", label: "Mã HD" },
      { key: "MaKH", label: "Mã KH" },
      { key: "TenKH", label: "Tên KH" },
      { key: "NgayBan", label: "Ngày bán" },
      { key: "TongTien", label: "Tổng tiền" }
    ],
    data
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

