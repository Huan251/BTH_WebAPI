const API_URL = "http://localhost:3000/api";

const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch(`${API_URL}/dangnhap`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value.trim(),
      mat_khau: password.value.trim()
    })
  });

  const result = await res.json();

  // ❌ Sai tài khoản / mật khẩu
  if (!result.success) {
    alert("Sai tài khoản hoặc mật khẩu");
    return;
  }

  // ❌ KHÔNG PHẢI ADMIN
if (Number(result.data.role) !== 1) {
    alert("Bạn không có quyền truy cập hệ thống");
    return;
  }

  // ✅ ADMIN → cho vào trang chủ
  window.location.href = "../trangchu/trangchu.html";
});

function quenMatKhau() {
  alert("Vui lòng liên hệ admin để cấp lại mật khẩu");
}
