const API_URL = "http://localhost:3000/api";
const params = new URLSearchParams(window.location.search);
const ma_phieu_nhap = params.get("ma_phieu_nhap");

const body = document.getElementById("detail-body");
const totalEl = document.getElementById("total");
const totalTextEl = document.getElementById("total-text");

/* ===== LOAD PHIẾU NHẬP ===== */
fetch(`${API_URL}/phieunhap/${ma_phieu_nhap}`)
  .then(res => res.json())
  .then(pn => {
    document.getElementById("ma-phieu").innerText =
      pn.ma_phieu_nhap ?? pn.MaPhieuNhap;

    document.getElementById("ngay-nhap").innerText =
      pn.ngay_nhap ?? pn.NgayNhap;
  });

/* ===== LOAD CHI TIẾT PHIẾU NHẬP ===== */
fetch(`${API_URL}/ctpn/phieunhap/${ma_phieu_nhap}`)
  .then(res => res.json())
  .then(list => {
    let sum = 0;
    let stt = 1;
    body.innerHTML = "";

    list.forEach(item => {
      const thanhTien = item.SoLuong * item.DonGiaNhap;
      sum += thanhTien;

      body.innerHTML += `
        <tr>
          <td>${stt++}</td>

          <td>
            <img src="../Anh/dochoi/${item.MaSanPham}.jpg"
                 onerror="this.src='../Anh/dochoi/sp.jpg'">
          </td>

          <td style="text-align:left">${item.TenSanPham}</td>
          <td>${item.SoLuong}</td>
          <td style="text-align:right">${format(item.DonGiaNhap)}</td>
          <td style="text-align:right">${format(thanhTien)}</td>
          <td></td>
        </tr>
      `;
    });

    totalEl.innerText = format(sum);
    totalTextEl.innerText = capitalize(numberToVietnamese(sum));
  });

/* ===== FORMAT TIỀN ===== */
function format(v) {
  return Number(v).toLocaleString("vi-VN") + " đ";
}

/* ===== VIẾT TIỀN BẰNG CHỮ ===== */
function numberToVietnamese(n) {
  const units = ["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"];

  function readTriple(num) {
    let tr = Math.floor(num / 100);
    let ch = Math.floor((num % 100) / 10);
    let dv = num % 10;
    let s = "";

    if (tr > 0) s += units[tr] + " trăm ";
    if (ch > 1) s += units[ch] + " mươi ";
    else if (ch === 1) s += "mười ";
    else if (tr > 0 && dv > 0) s += "lẻ ";

    if (dv === 1 && ch > 1) s += "mốt ";
    else if (dv === 5 && ch > 0) s += "lăm ";
    else if (dv > 0) s += units[dv] + " ";

    return s.trim();
  }

  let result = "";
  let million = Math.floor(n / 1_000_000);
  let thousand = Math.floor((n % 1_000_000) / 1000);
  let rest = n % 1000;

  if (million > 0) result += readTriple(million) + " triệu ";
  if (thousand > 0) result += readTriple(thousand) + " nghìn ";
  if (rest > 0) result += readTriple(rest);

  return result.trim() + " đồng chẵn";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function goBack() {
  window.history.back();
}
