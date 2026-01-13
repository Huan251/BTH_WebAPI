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
    <table border="1" cellspacing="0" cellpadding="8" width="100%">
        <thead>
            <tr>
                ${headers.map(h => `<th>${COLUMN_LABELS[h] || h}</th>`).join("")}
            </tr>
        </thead>
        <tbody>
    `;

    rows.forEach(row => {
        html += "<tr>";
        headers.forEach(h => {
            html += `<td>${row[h] ?? ""}</td>`;
        });
        html += "</tr>";
    });

    html += "</tbody></table>";
    return html;
}


/* ================= CLICK CHỨC NĂNG ================= */
document.querySelectorAll(".function-card").forEach(card => {
    card.addEventListener("click", async () => {
        const type = card.dataset.type;

        try {

            /* ===== SẢN PHẨM (ĐÃ LÀM RIÊNG) ===== */
           if (type === "sanpham") {
                const res = await fetch(API_URL + "/sanpham");
                productData = await res.json();

                renderProduct(productData);
                return;
            }

            /* ===== CÁC BẢNG KHÁC ===== */
            const res = await fetch(`${API_URL}/${type}`);
            const data = await res.json();

            if (!data || data.length === 0) {
                tableArea.innerHTML = "<p>Không có dữ liệu</p>";
                return;
            }

           currentData = data;
            currentHeaders = Object.keys(data[0]);

        tableArea.innerHTML = `
        <div class="search-box">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input 
            type="text"
            placeholder="Tìm kiếm..."
            oninput="searchTable(this.value)"
            class="search-input"
            >
        </div>
        ${renderTable(currentHeaders, currentData)}
        `;


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
          placeholder="Tìm sản phẩm..."
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

document.querySelectorAll(".header-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
        const type = btn.dataset.type;
        tableArea.innerHTML = "<p>Đang tải dữ liệu...</p>";

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
                placeholder="Tìm kiếm..."
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
                placeholder="Tìm sản phẩm..."
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

    // Khởi tạo đủ 12 tháng
    const map = {};
    for (let i = 1; i <= 12; i++) {
        map[i] = 0;
    }

    data.forEach(hd => {
        if (!hd.NgayBan) return;

        // DD/MM/YYYY
        const parts = hd.NgayBan.split("/");
        const thang = Number(parts[1]); // lấy tháng

        if (!isNaN(thang)) {
            map[thang] += Number(hd.TongTien || 0);
        }
    });

    const rows = Object.keys(map).map(thang => ({
        thang,
        loi_nhuan: formatMoney(map[thang])
    }));

    tableArea.innerHTML =
        renderTable(["thang", "loi_nhuan"], rows);
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
