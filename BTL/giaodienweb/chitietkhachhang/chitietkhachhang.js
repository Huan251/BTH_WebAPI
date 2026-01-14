const API_URL = "http://localhost:3000/api";
const params = new URLSearchParams(window.location.search);
const ma_kh = params.get("ma_kh");

const body = document.getElementById("body");

/* ===== LOAD LỊCH SỬ ===== */
fetch(`${API_URL}/hoadon/lsmh/${ma_kh}`)
  .then(res => res.json())
  .then(list => {
    let stt = 1;

    list.forEach(item => {
      body.innerHTML += `
        <tr>
          <td>${stt++}</td>
          <td>${item.TenSanPham}</td>
          <td>
            <img src="../Anh/dochoi/${item.MaSanPham}.jpg"
                 onerror="this.src='../Anh/dochoi/sp.jpg'">
          </td>
          <td>${item.SoLuong}</td>
          <td>${item.NgayBan}</td>
        </tr>
      `;
    });
  });

/* ===== THÔNG TIN KH ===== */
fetch(`${API_URL}/khachhang/${ma_kh}`)
  .then(res => res.json())
  .then(kh => {
    document.getElementById("kh-ma-ten").innerHTML =
      `<b>Mã KH:</b> ${kh.MaKH} - ${kh.TenKH}`;
    document.getElementById("kh-diachi").innerHTML =
      `<b>Địa chỉ:</b> ${kh.DiaChi}`;
    document.getElementById("kh-sdt").innerHTML =
      `<b>SĐT:</b> ${kh.DienThoai}`;
  });

function goBack() {
  window.history.back();
}
