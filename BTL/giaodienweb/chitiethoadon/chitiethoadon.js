const API_URL = "http://localhost:3000/api";

const params = new URLSearchParams(window.location.search);
const ma_hd = params.get("ma_hd");

const info = document.getElementById("info");
const body = document.getElementById("detail-body");
const totalBox = document.getElementById("total");

/* ===== LOAD HÓA ĐƠN ===== */
fetch(`${API_URL}/hoadon/${ma_hd}`)

  .then(res => res.json())
  .then(hd => {
    info.innerHTML = `
      <b>Mã hóa đơn:</b> ${hd.ma_hd ?? hd.MaHD}<br>
      <b>Ngày bán:</b> ${hd.NgayBan}<br>
    `;
  });

/* ===== LOAD CHI TIẾT ===== */
fetch(`${API_URL}/cthd/hoadon/${ma_hd}`)
  .then(res => res.json())
  .then(list => {
    let sum = 0;
    let stt = 1;  
    body.innerHTML = "";

    list.forEach(item => {
      sum += item.ThanhTien;

      const imgPath = `../Anh/dochoi/${item.MaSanPham}.jpg`;

      body.innerHTML += `
        <tr>
        <td style="text-align:center">${stt++}</td>
          <td style="text-align:center">
            <img src="${imgPath}" width="70">
          </td>
          <td>${item.TenSanPham}</td>
          <td>${item.SoLuong}</td>
          <td style="text-align:right">${format(item.DonGiaBan)}</td>
          <td style="text-align:right;font-weight:bold">
            ${format(item.ThanhTien)}
          </td>
        </tr>
      `;
    });

    // ===== TỔNG CỘNG =====
    totalBox.innerText = "Tổng cộng: " + format(sum);

    // ===== TIỀN BẰNG CHỮ =====
    document.getElementById("total-text").innerText =
      numberToVietnamese(sum).charAt(0).toUpperCase() +
      numberToVietnamese(sum).slice(1);
  });


function format(v) {
  return Number(v).toLocaleString("vi-VN") + " đ";
}


function goBack() {
  window.history.back();
}


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


