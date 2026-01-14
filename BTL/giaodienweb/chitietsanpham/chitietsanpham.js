const API_URL = "http://localhost:3000/api";

const params = new URLSearchParams(window.location.search);
const ma_sp = Number(params.get("ma_sp"));

let originalData = null;

/* ================= LOAD SẢN PHẨM ================= */
fetch(`${API_URL}/sanpham/${ma_sp}`)
  .then(res => res.json())
  .then(result => {
    const sp = result.data ?? result;
    originalData = { ...sp };

    const img = document.getElementById("product-img");
    img.src = `../Anh/dochoi/${sp.ma_sp}.jpg`;
    img.onerror = () => img.src = "../Anh/dochoi/sp.jpg";
    img.style.width = "650px";
    img.style.height = "650px";
    img.style.objectFit = "cover";

    document.querySelector(".product-detail").style.justifyContent = "center";

    const box = document.getElementById("product-info");
    box.style.width = "360px";
    box.style.height = "fit-content";

    box.innerHTML = `
      <h2>${sp.ten_sp}</h2>

      ${row("Mã SP", `<input value="${sp.ma_sp}" disabled>`)}
      ${row("Tên SP", `<input id="ten_sp" value="${sp.ten_sp}"><div class="error" id="e_ten_sp"></div>`)}
      ${row("Mã danh mục", `<input id="ma_danh_muc" value="${sp.ma_danh_muc}"><div class="error" id="e_ma_dm"></div>`)}
      ${row("Mã NCC", `<input id="ma_ncc" value="${sp.ma_ncc}"><div class="error" id="e_ma_ncc"></div>`)}
      ${row("Giá bán", `<input id="gia_ban" value="${sp.gia_ban}"><div class="error" id="e_gia_ban"></div>`)}
      ${row("Giá nhập", `<input id="gia_nhap" value="${sp.gia_nhap}"><div class="error" id="e_gia_nhap"></div>`)}
      ${row("Tồn kho", `<input id="so_luong_ton" value="${sp.so_luong_ton}"><div class="error" id="e_so_luong"></div>`)}

      <div style="margin-bottom:12px">
        <b>Mô tả</b>
        <textarea id="mo_ta" rows="3"
          style="width:100%;resize:none;overflow-y:auto"
        >${sp.mo_ta ?? ""}</textarea>
      </div>

      <div style="display:flex;gap:10px">
        <button onclick="goBack()">⬅ Trở về</button>
        <button id="btnUpdate" disabled onclick="update()">💾 Cập nhật</button>
      </div>
    `;

    document.querySelectorAll(
      "#ten_sp,#ma_danh_muc,#ma_ncc,#gia_ban,#gia_nhap,#so_luong_ton,#mo_ta"
    ).forEach(i => i.addEventListener("input", validateAll));

    validateAll();
  });

/* ================= HÀM DÒNG ================= */
function row(label, html) {
  return `
    <div style="display:grid;grid-template-columns:120px 1fr;gap:6px;margin-bottom:10px">
      <b>${label}</b>
      <div>${html}</div>
    </div>
  `;
}

/* ================= KIỂM TRA TỒN TẠI ================= */
async function exists(url) {
  const res = await fetch(url);
  return res.ok;
}

function clear(id) {
  document.getElementById(id).innerText = "";
}

/* ================= VALIDATE ================= */
async function validateAll() {
  let ok = true;
  clearErrors();

  const Ten = ten_sp.value.trim();
  const MaDM = ma_danh_muc.value.trim();
  const MaNCC = ma_ncc.value.trim();
  const GiaBan = gia_ban.value.trim();
  const GiaNhap = gia_nhap.value.trim();
  const Sl = so_luong_ton.value.trim();

    if (!Ten) {
    err("e_ten_sp", "Tên sản phẩm không được trống");
    } else {
    clear("e_ten_sp");
    }

    if (!/^\d+(\.\d+)?$/.test(GiaBan)) {
    err("e_gia_ban", "Dữ liệu không hợp lệ");
    } else if (Number(GiaBan) <= 0) {
    err("e_gia_ban", "Giá bán phải > 0");
    } else {
    clear("e_gia_ban");
    }

    if (!/^\d+(\.\d+)?$/.test(GiaNhap)) {
    err("e_gia_nhap", "Dữ liệu không hợp lệ");
    } else if (Number(GiaNhap) <= 0) {
    err("e_gia_nhap", "Giá nhập phải > 0");
    } else if (
    /^\d+(\.\d+)?$/.test(GiaBan) &&
    Number(GiaNhap) >= Number(GiaBan)
    ) {
    err("e_gia_nhap", "Giá nhập phải nhỏ hơn giá bán");
    } else {
    clear("e_gia_nhap");
    }

  
    if (!/^\d+$/.test(Sl)) {
    err("e_so_luong", "Dữ liệu không hợp lệ");
    } else if (Number(Sl) < 0) {
    err("e_so_luong", "Số lượng tồn phải ≥ 0");
    } else {
    clear("e_so_luong");
    }

    if (!/^\d+$/.test(MaDM)) {
    err("e_ma_dm", "Dữ liệu không hợp lệ");
    } else {
    clear("e_ma_dm");
    }

    if (!/^\d+$/.test(MaNCC)) {
    err("e_ma_ncc", "Dữ liệu không hợp lệ");
    } else {
    clear("e_ma_ncc");
    }

    if (ok && MaDM) {
    if (!(await exists(`${API_URL}/danhmuc/${MaDM}`))) {
        err("e_ma_dm", "Danh mục không tồn tại");
    }
    }

    if (ok && MaNCC) {
    if (!(await exists(`${API_URL}/nhacungcap/${MaNCC}`))) {
        err("e_ma_ncc", "Nhà cung cấp không tồn tại");
    }
    }

  const changed = isChanged();
  btnUpdate.disabled = !(ok && changed);

  function err(id, msg) {
    document.getElementById(id).innerText = msg;
    ok = false;
  }
}

/* ================= SO SÁNH THAY ĐỔI ================= */
function isChanged() {
  return (
    ten_sp.value.trim() !== String(originalData.ten_sp) ||
    Number(ma_danh_muc.value) !== Number(originalData.ma_danh_muc) ||
    Number(ma_ncc.value) !== Number(originalData.ma_ncc) ||
    Number(gia_ban.value) !== Number(originalData.gia_ban) ||
    Number(gia_nhap.value) !== Number(originalData.gia_nhap) ||
    Number(so_luong_ton.value) !== Number(originalData.so_luong_ton) ||
    mo_ta.value.trim() !== (originalData.mo_ta ?? "").trim()
  );
}

/* ================= UPDATE ================= */
async function update() {
  const data = {
    ten_sp: ten_sp.value.trim(),
    ma_danh_muc: Number(ma_danh_muc.value),
    ma_ncc: Number(ma_ncc.value),
    gia_ban: Number(gia_ban.value),
    gia_nhap: Number(gia_nhap.value),
    so_luong_ton: Number(so_luong_ton.value),
    mo_ta: mo_ta.value.trim()
  };

  const res = await fetch(`${API_URL}/sanpham/${ma_sp}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    alert("Cập nhật thất bại");
    return;
  }

  alert("Cập nhật thành công");
  window.location.href = "chitietsanpham.html?ma_sp=" + ma_sp;
}

/* ================= TIỆN ÍCH ================= */
function goBack() {
  window.history.back();
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.innerText = "");
}
