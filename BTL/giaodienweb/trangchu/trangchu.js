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
    so_luong_ban: "Số lượng bán",
    so_luong_ton: "Tồn kho",
    ton_kho: "Tồn kho",
    gia_nhap: "Giá nhập",
    gia_ban: "Giá bán",

    loi: "Lợi nhuận",
    thang: "Tháng",
    loi_nhuan: "Lợi nhuận",
    doanh_thu: "Doanh thu"
};

const MONEY_FIELDS = [
  "DonGiaNhap",
  "DonGiaBan",
  "ThanhTien",
  "TongTien",
  "gia_nhap",
  "gia_ban",
  "doanh_thu",
  "loi_nhuan"
];

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
              let value = row[h] ?? "";

            // ⭐ FORMAT TIỀN TẠI ĐÂY
            if (MONEY_FIELDS.includes(h)) {
              value = formatMoney(value);
            }

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
  sessionStorage.setItem("currentTab", type);
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
    const res = await fetch(API_URL + "/tonkho");
    const data = await res.json();

    currentHeaders = ["ma_sp", "ten_sp", "ton_kho", "gia_nhap", "gia_ban"];

    currentData = data.map(sp => ({
        ma_sp: sp.ma_sp,
        ten_sp: sp.ten_sp,
        ton_kho: sp.ton_kho,
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
    const [resSP, resCTHD, resCTPN] = await Promise.all([
        fetch(API_URL + "/sanpham"),
        fetch(API_URL + "/cthd"),
        fetch(API_URL + "/ctpn")
    ]);

    const sanpham = await resSP.json();
    const cthd = await resCTHD.json();
    const ctpn = await resCTPN.json();

    const map = {};

    // khởi tạo
    sanpham.forEach(sp => {
        map[sp.ma_sp] = {
            ma_sp: sp.ma_sp,
            ten_sp: sp.ten_sp,
            so_luong_ban: 0,
            doanh_thu: 0,
            gia_nhap: 0
        };
    });

    // bán
cthd.forEach(item => {
    const maSP = item.MaSanPham;
    if (map[maSP]) {
        const sl = Number(item.SoLuong || 0);
        const gia = Number(item.DonGiaBan || 0);

        map[maSP].so_luong_ban += sl;
        map[maSP].doanh_thu += sl * gia;
    }
});


    // nhập
ctpn.forEach(item => {
    const maSP = item.MaSanPham;
    if (map[maSP]) {
        const sl = Number(item.SoLuong || 0);
        const gia = Number(item.DonGiaNhap || 0);

        map[maSP].gia_nhap += sl * gia;
    }
});


    currentHeaders = [
        "ma_sp",
        "ten_sp",
        "so_luong_ban",
        "doanh_thu",
        "gia_nhap",
        "loi_nhuan"
    ];

    currentData = Object.values(map).map(item => {
        let loiNhuan = item.doanh_thu - item.gia_nhap;
        if (loiNhuan < 0) loiNhuan = 0;

        return {
            ma_sp: item.ma_sp,
            ten_sp: item.ten_sp,
            so_luong_ban: item.so_luong_ban,
            doanh_thu: item.doanh_thu,
            gia_nhap: item.gia_nhap,
            loi_nhuan: loiNhuan

        };
    });

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
    const res = await fetch(API_URL + "/loinhuan/thang");
    const data = await res.json();

    /* ===== MAP ĐỦ 12 THÁNG ===== */
    const map = {};
    for (let i = 1; i <= 12; i++) {
        map[i] = 0;
    }

    data.forEach(item => {
        // item.thang = "2025-02"
        const thang = Number(item.thang.split("-")[1]); // ✅ FIX QUAN TRỌNG

        if (!isNaN(thang) && thang >= 1 && thang <= 12) {
            map[thang] = Number(item.loi_nhuan || 0);
        }
    });

    /* ===== BẢNG ===== */
    currentHeaders = ["thang", "loi_nhuan"];
    currentData = [];

    for (let i = 1; i <= 12; i++) {
        currentData.push({
            thang: i,
            loi_nhuan: map[i]
        });
    }

    tableArea.innerHTML = `
  <div class="profit-flex">

    <!-- BÊN TRÁI: BIỂU ĐỒ -->
    <div class="profit-chart">
      <div class="profit-title">Biểu đồ</div>
      <canvas id="profitChart"></canvas>
    </div>

    <!-- BÊN PHẢI: BẢNG -->
    <div class="profit-table">
      <div class="profit-title">Bảng</div>
      ${renderTable(
        ["thang", "loi_nhuan"],
        currentData
      )}
    </div>

  </div>
`;

    /* ===== BIỂU ĐỒ ===== */
    const labels = [];
    const values = [];

    for (let i = 1; i <= 12; i++) {
        labels.push("Tháng " + i);
        values.push(map[i]);
    }

    const ctx = document.getElementById("profitChart");

    new Chart(ctx, {
        type: "line",
        data: {
            labels,
           datasets: [{
  data: values,
  tension: 0.3,
  fill: false,

  // 🔘 chấm xám
  pointRadius: 4,
  pointHoverRadius: 6,
  pointBackgroundColor: "#9e9e9e",
  pointBorderColor: "#9e9e9e",

  // 🎨 đổi màu theo xu hướng
  segment: {
    borderColor: ctx => {
      const y0 = ctx.p0.parsed.y;
      const y1 = ctx.p1.parsed.y;

      if (y1 > y0) return "#1976d2"; // 🔵 Tăng
      if (y1 < y0) return "#d32f2f"; // 🔴 Giảm
      return "#fbc02d";              // 🟡 Giữ nguyên
    }
  }
}]


        },
        options: {
           plugins: {
  legend: {
    display: true,
    labels: {
      generateLabels: chart => {
        return [
          {
            text: "Tăng",
            strokeStyle: "#1976d2",
            fillStyle: "#1976d2",
            lineWidth: 3
          },
          {
            text: "Giảm",
            strokeStyle: "#d32f2f",
            fillStyle: "#d32f2f",
            lineWidth: 3
          },
          {
            text: "Giữ nguyên",
            strokeStyle: "#fbc02d",
            fillStyle: "#fbc02d",
            lineWidth: 3
          }
        ];
      }
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
