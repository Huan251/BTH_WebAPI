const API_URL = "http://localhost:3000/api";

const COLUMN_LABELS = {
    // ===== SẢN PHẨM =====
    ma_sp: "Mã sản phẩm",
    MaSanPham: "Mã sản phẩm",
    ten_sp: "Tên sản phẩm",
    TenSanPham: "Tên sản phẩm",
    MoTa: "Mô tả",
    mo_ta: "Mô tả",

    // ===== DANH MỤC =====
    ma_danh_muc: "Mã danh mục",
    ten_danh_muc: "Tên danh mục",

    // ===== NHÀ CUNG CẤP =====
    MaNCC: "Mã nhà cung cấp",
    ma_ncc: "Mã nhà cung cấp",
    TenNCC: "Tên nhà cung cấp",
    ten_ncc: "Tên nhà cung cấp",
    DienThoai: "Điện thoại",
    DiaChi: "Địa chỉ",
    Email: "Email",

    // ===== KHÁCH HÀNG =====
    MaKH: "Mã khách hàng",
    TenKH: "Tên khách hàng",

    // ===== PHIẾU NHẬP =====
    MaPhieuNhap: "Mã phiếu nhập",
    NgayNhap: "Ngày nhập",

    // ===== CHI TIẾT PHIẾU NHẬP =====
    MaCTPN: "Mã chi tiết phiếu nhập",
    SoLuong: "Số lượng",
    DonGiaNhap: "Đơn giá nhập",
    ThanhTien: "Thành tiền",

    // ===== HÓA ĐƠN =====
    MaHoaDon: "Mã hóa đơn",
    MaHD: "Mã hóa đơn",
    NgayBan: "Ngày bán",
    TongTien: "Tổng tiền",

    // ===== CHI TIẾT HÓA ĐƠN =====
    MaCTHD: "Mã chi tiết hóa đơn",
    DonGiaBan: "Đơn giá bán",

    // ===== TỒN KHO =====
    sl_nhap: "Số lượng nhập",
    sl_ban: "Số lượng bán",
    so_luong_ton: "Tồn kho",
    gia_nhap: "Giá nhập",
    gia_ban: "Giá bán",

    loi: "Lợi nhuận",
    thang: "Tháng",
    loi_nhuan: "Lợi nhuận"
};



const tableArea = document.getElementById("table-area");

/* ================= RENDER TABLE ================= */
function renderTable(headers, rows) {
    let html = `
    <table class="table-${currentType}" border="1" cellspacing="0" cellpadding="8" width="100%">
        <thead>
            <tr>
                ${headers.map(h => `<th>${COLUMN_LABELS[h] || h}</th>`).join("")}
            </tr>
        </thead>
        <tbody>
    `;

    rows.forEach(row => {
         // ===== NẾU LÀ KHÁCH HÀNG → CLICK CẢ HÀNG =====
        if (currentType === "khachhang") {
        html += `
        <tr class="click-row"
            onclick="viewKhachHang(${row.MaKH ?? row.ma_kh})">
        `;
        } else {
            html += `<tr>`;
        }

        headers.forEach(h => {
            const value = row[h] ?? "";

            /* ===== CỘT MÃ HÓA ĐƠN ===== */
            if (h === "MaHoaDon" || h === "MaHD") {
                html += `
                  <td>
                    <span class="code-cell"
                          onclick="viewHoaDon(${value})">
                      ${value}
                      <span class="tooltip">Chi tiết</span>
                    </span>
                  </td>
                `;
            }

            /* ===== CỘT MÃ PHIẾU NHẬP ===== */
            else if (h === "MaPhieuNhap") {
                html += `
                  <td>
                    <span class="code-cell"
                          onclick="viewPhieuNhap(${value})">
                      ${value}
                      <span class="tooltip">Chi tiết</span>
                    </span>
                  </td>
                `;
            }

            /* ===== CỘT BÌNH THƯỜNG ===== */
            else {
                html += `<td>${value}</td>`;
            }
        });

        html += "</tr>";
    });

    html += "</tbody></table>";
    return html;
}

/* ================= CLICK CHỨC NĂNG ================= */
let currentData = [];
let currentHeaders = [];
let currentType = "";

document.querySelectorAll(".function-card").forEach(card => {
  card.addEventListener("click", async () => {
    const type = card.dataset.type;
    currentType = type; // ⭐ RẤT QUAN TRỌNG

    try {

      /* ===== SẢN PHẨM ===== */
      if (type === "sanpham") {
        const res = await fetch(API_URL + "/sanpham");
        productData = await res.json();
        renderProduct(productData);
        return;
      }

      /* ===== NHÀ CUNG CẤP ===== */
      if (type === "nhacungcap") {
        const res = await fetch(API_URL + "/nhacungcap");
        const data = await res.json();
        currentData = data;

        let html = `<div class="product-grid">`;
        data.forEach(ncc => {
          html += `
            <div class="product-card" onclick="viewNCC(${ncc.MaNCC})">
              <img src="../Anh/ncc/${ncc.MaNCC}.png"
                   onerror="this.src='../Anh/ncc/ncc.png'">
            </div>`;
        });
        html += `</div>`;
        tableArea.innerHTML = html;
        return;
      }

      /* ===== CÁC BẢNG CHUNG ===== */
      const res = await fetch(`${API_URL}/${type}`);
      const data = await res.json();

      if (!data || data.length === 0) {
        tableArea.innerHTML = "<p>Không có dữ liệu</p>";
        return;
      }

      currentData = data;
      currentHeaders = Object.keys(data[0]);

      renderTableWithSearchAndSort(); // ⭐ GỌI HÀM CHUNG

    } catch (err) {
      console.error(err);
      tableArea.innerHTML = "<p>Lỗi tải dữ liệu</p>";
    }
  });
});


/* ================= CHI TIẾT SẢN PHẨM ================= */
function viewProduct(ma_sp) {
    window.location.href =
        "../chitietsanpham/chitietsanpham.html?ma_sp=" + ma_sp;
}
function viewNCC(ma_ncc) {
    window.location.href =
        "../nhacungcap/nhacungcap.html?ma_ncc=" + ma_ncc;
}

function searchTable(keyword) {
  keyword = keyword.toLowerCase();

  const filtered = currentData.filter(row =>
    currentHeaders.some(h =>
      String(row[h] ?? "")
        .toLowerCase()
        .includes(keyword)
    )
  );

  tableArea.querySelector("table").outerHTML =
    renderTable(currentHeaders, filtered);
}

function renderProduct(data) {
    let html = `
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Nhập mã sản phẩm..."
          oninput="searchProduct(this.value)"
          class="search-input"
        >
      </div>

      <div class="product-grid">
    `;

    data.forEach(sp => {
        html += `
          <div class="product-card" onclick="viewProduct(${sp.ma_sp})">
            <img src="../Anh/dochoi/${sp.ma_sp}.jpg"
                 onerror="this.src='../Anh/dochoi/sp.jpg'">
            <h4>${sp.ten_sp}</h4>
          </div>
        `;
    });

    html += `</div>`;
    tableArea.innerHTML = html;
}

function searchProduct(keyword) {
    keyword = keyword.toLowerCase();

    const filtered = productData.filter(sp =>
        String(sp.ma_sp).includes(keyword) ||
        sp.ten_sp.toLowerCase().includes(keyword)
    );

    tableArea.querySelector(".product-grid").outerHTML =
        renderGrid(filtered);
}

function renderGrid(data) {
    let html = `<div class="product-grid">`;
    data.forEach(sp => {
        html += `
          <div class="product-card" onclick="viewProduct(${sp.ma_sp})">
            <img src="../Anh/dochoi/${sp.ma_sp}.jpg"
                 onerror="this.src='../Anh/dochoi/sp.jpg'">
            <h4>${sp.ten_sp}</h4>
          </div>
        `;
    });
    html += `</div>`;
    return html;
}

document.querySelectorAll(".header-btn:not(.no-click)").forEach(btn => {
    btn.addEventListener("click", async () => {
        const type = btn.dataset.type;

        if (type === "tonkho") {
            loadTonKho();
        }

    });
});

async function loadTonKho() {
    const res = await fetch(API_URL + "/sanpham");
    const data = await res.json();

    currentHeaders = ["ma_sp", "ten_sp", "so_luong_ton", "gia_nhap", "gia_ban"];
    currentData = data.map(sp => ({
        ma_sp: sp.ma_sp,
        ten_sp: sp.ten_sp,
        so_luong_ton: sp.so_luong_ton,
        gia_nhap: sp.gia_nhap,
        gia_ban: sp.gia_ban
    }));

    tableArea.innerHTML = `
        <div class="search-box">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input
                type="text"
                placeholder="Nhập thông tin tìm kiếm..."
                oninput="searchTable(this.value)"
                class="search-input"
            >
        </div>
        ${renderTable(currentHeaders, currentData)}
    `;
}


async function loadLoiTheoSanPham() {
    const res = await fetch(API_URL + "/sanpham");
    const data = await res.json();

    currentHeaders = ["ma_sp", "ten_sp", "loi"];
    currentData = data.map(sp => ({
        ma_sp: sp.ma_sp,
        ten_sp: sp.ten_sp,
        loi: formatMoney(
            (sp.gia_ban - sp.gia_nhap) * sp.so_luong_ton
        )
    }));

    tableArea.innerHTML = `
        <div class="search-box">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input
                type="text"
                placeholder="Nhập thông tin tìm kiếm..."
                oninput="searchTable(this.value)"
                class="search-input"
            >
        </div>
        ${renderTable(currentHeaders, currentData)}
    `;
}

async function loadLoiTheoThang() {
    const res = await fetch(API_URL + "/hoadon");
    const data = await res.json();

    // map 12 tháng
    const map = {};
    for (let i = 1; i <= 12; i++) {
        map[i] = 0;
    }

    data.forEach(hd => {
        if (!hd.NgayBan) return;

        const parts = hd.NgayBan.split("/"); // DD/MM/YYYY
        const thang = Number(parts[1]);

        if (!isNaN(thang)) {
            map[thang] += Number(hd.TongTien || 0);
        }
    });

    const labels = [];
    const values = [];

    for (let i = 1; i <= 12; i++) {
        labels.push("Tháng " + i);
        values.push(map[i]);
    }

    tableArea.innerHTML = `
        <div class="profit-flex">

            <!-- BIỂU ĐỒ -->
            <div class="profit-chart">
            <h3 class="profit-title">Biểu đồ</h3>
            <canvas id="profitChart"></canvas>
            </div>

            <!-- BẢNG -->
            <div class="profit-table">
            <h3 class="profit-title">Bảng</h3>
            ${renderTable(
                ["thang", "loi_nhuan"],
                labels.map((_, i) => ({
                thang: i + 1,
                loi_nhuan: formatMoney(values[i])
                }))
            )}
            </div>

        </div>
        `;



    const ctx = document.getElementById("profitChart");

    new Chart(ctx, {
        type: "line",   // 👈 biểu đồ tăng
        data: {
            labels: labels,
            datasets: [{
                label: "Lợi nhuận (VNĐ)",
                data: values,
                borderColor: "#ff9800",
                backgroundColor: "rgba(255,152,0,0.2)",
                tension: 0.3,      // 👈 bo cong mềm
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // 👈 RẤT QUAN TRỌNG
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    ticks: {
                        callback: value =>
                            value.toLocaleString("vi-VN") + " đ"
                    }
                }
            }
        }

    });
}


document.querySelectorAll(".profit-item").forEach(item => {
    item.addEventListener("click", () => {
        const type = item.dataset.type;

        if (type === "loi-sanpham") {
            loadLoiTheoSanPham();
        }

        if (type === "loi-thang") {
            loadLoiTheoThang();
        }
    });
});

function formatMoney(value) {
    if (value == null || value === "") return "";

    return Number(value).toLocaleString("vi-VN") + " đ";
}

function searchNCC(keyword) {
    keyword = keyword.toLowerCase();

    const filtered = currentData.filter(ncc =>
        String(ncc.MaNCC).includes(keyword) ||
        ncc.TenNCC.toLowerCase().includes(keyword)
    );

    let html = `<div class="product-grid">`;
    filtered.forEach(ncc => {
        html += `
          <div class="product-card" onclick="viewNCC(${ncc.MaNCC})">
            <img src="../Anh/ncc/${ncc.MaNCC}.png"
                 onerror="this.src='../Anh/ncc/ncc.png'">
          </div>
        `;
    });
    html += `</div>`;

    tableArea.querySelector(".product-grid").outerHTML = html;
}

function viewHoaDon(ma) {
    sessionStorage.setItem("currentTab", "hoadon");
    window.location.href =
        "../chitiethoadon/chitiethoadon.html?ma_hd=" + ma;
}

function viewPhieuNhap(ma) {
    sessionStorage.setItem("currentTab", "phieunhap");
    window.location.href =
        "../chitietphieunhap/chitietphieunhap.html?ma_phieu_nhap=" + ma;
}

function viewKhachHang(ma_kh) {
    sessionStorage.setItem("currentTab", "khachhang");
    window.location.href =
        "../chitietkhachhang/chitietkhachhang.html?ma_kh=" + ma_kh;
}

window.addEventListener("load", () => {
  const tab = sessionStorage.getItem("currentTab") || "sanpham";

  const card = document.querySelector(
    `.function-card[data-type="${tab}"]`
  );

  if (card) {
    card.click();
  }
})

function renderTableWithSearchAndSort() {
  let sortHtml = "";

  /* ===== KHÁCH HÀNG (GIỮ NGUYÊN) ===== */
  if (currentType === "khachhang") {
    sortHtml = `
      <div class="sort-box">
        <select id="sort-field" onchange="sortKhachHang()">
          <option value="MaKH">Theo mã KH</option>
          <option value="TenKH">Theo tên KH</option>
        </select>

        <select id="sort-order" onchange="sortKhachHang()">
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>
    `;
  }

  /* ===== PHIẾU NHẬP ===== */
  if (currentType === "phieunhap") {
    sortHtml = `
      <div class="sort-hover">
        <button class="sort-btn">Sắp xếp</button>
        <div class="sort-menu">
          <div onclick="sortPhieuNhap('asc')">Tăng dần</div>
          <div onclick="sortPhieuNhap('desc')">Giảm dần</div>
        </div>
      </div>
    `;
  }
    /* ===== DANH MỤC ===== */
  if (currentType === "danhmuc") {
  sortHtml = `
    <div class="sort-hover">
      <div class="sort-btn">Sắp xếp</div>
      <div class="sort-menu">
        <div onclick="sortDanhMuc('asc')">Mã ↑</div>
        <div onclick="sortDanhMuc('desc')">Mã ↓</div>
      </div>
    </div>
  `;
}


  /* ===== HÓA ĐƠN / CTHD / CTPN ===== */
  if (
    currentType === "hoadon" ||
    currentType === "cthd" ||
    currentType === "ctpn"
  ) {

    sortHtml = `
      <div class="sort-box">
        <select id="sort-field" onchange="sortChung()">
          <option value="Ma">Theo mã</option>
          <option value="Tien">Theo tiền</option>
        </select>

        <select id="sort-order" onchange="sortChung()">
          <option value="asc">Tăng dần</option>
          <option value="desc">Giảm dần</option>
        </select>
      </div>
    `;
  }

  tableArea.innerHTML = `
    <div class="search-sort-row">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Nhập dữ liệu cần tìm..."
          oninput="searchTable(this.value)"
          class="search-input"
        >
      </div>
  
      ${sortHtml}
    </div>
  
    ${renderTable(currentHeaders, currentData)}
  `;
    if (
        currentType === "hoadon" ||
        currentType === "cthd" ||
        currentType === "ctpn"
        ) {
            // mặc định: theo mã – tăng dần
            sortChung();
        }

        if (currentType === "phieunhap") {
            // mặc định: theo mã – tăng dần
            sortPhieuNhap("asc");
        }

        if (currentType === "danhmuc") {
            // mặc định: theo mã danh mục – tăng dần
            sortDanhMuc();
        }
        if (currentType === "danhmuc") {
        sortDanhMuc("asc");
        }
}

function sortPhieuNhap(order) {
  if (currentType !== "phieunhap") return;

  const sorted = [...currentData].sort((a, b) =>
    order === "asc"
      ? a.MaPhieuNhap - b.MaPhieuNhap
      : b.MaPhieuNhap - a.MaPhieuNhap
  );

  tableArea.querySelector("table").outerHTML =
    renderTable(currentHeaders, sorted);
}

/* ===== HÓA ĐƠN / CTHD / CTPN: SORT CHUNG ===== */
function sortChung() {
  if (!["hoadon", "cthd", "ctpn"].includes(currentType)) return;

  const field = document.getElementById("sort-field").value;
  const order = document.getElementById("sort-order").value;

  const sorted = [...currentData].sort((a, b) => {
    let v1, v2;

    if (field === "Ma") {
      v1 =
        a.MaHD ??
        a.MaHoaDon ??
        a.MaCTHD ??
        a.MaCTPN ??
        0;
      v2 =
        b.MaHD ??
        b.MaHoaDon ??
        b.MaCTHD ??
        b.MaCTPN ??
        0;
    } else {
      v1 = a.ThanhTien ?? a.TongTien ?? 0;
      v2 = b.ThanhTien ?? b.TongTien ?? 0;
    }

    return order === "asc" ? v1 - v2 : v2 - v1;
  });

  tableArea.querySelector("table").outerHTML =
    renderTable(currentHeaders, sorted);
}

function sortDanhMuc(order = "asc") {
  if (currentType !== "danhmuc") return;

  const sorted = [...currentData].sort((a, b) => {
    return order === "asc"
      ? a.ma_danh_muc - b.ma_danh_muc
      : b.ma_danh_muc - a.ma_danh_muc;
  });

  tableArea.querySelector("table").outerHTML =
    renderTable(currentHeaders, sorted);
}

function sortKhachHang() {
  if (currentType !== "khachhang") return;

  const field = document.getElementById("sort-field").value;
  const order = document.getElementById("sort-order").value;

  const sorted = [...currentData].sort((a, b) => {
    let v1, v2;

    if (field === "TenKH") {
      // ⭐ SORT THEO TÊN (CHỮ CUỐI)
      v1 = getLastName(a.TenKH);
      v2 = getLastName(b.TenKH);
    } else {
      // sort theo mã KH
      v1 = a[field];
      v2 = b[field];
    }

    if (v1 > v2) return order === "asc" ? 1 : -1;
    if (v1 < v2) return order === "asc" ? -1 : 1;
    return 0;
  });

  tableArea.querySelector("table").outerHTML =
    renderTable(currentHeaders, sorted);
}


function getLastName(fullName) {
  if (!fullName) return "";
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1].toLowerCase();
}
