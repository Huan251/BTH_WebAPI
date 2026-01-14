const API_URL = "http://localhost:3000/api";

document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  // ===== VALIDATE =====
  if (!email || !password || !role) {
    alert("Không được để trống");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Email không hợp lệ");
    return;
  }

  if (!["1","2","3"].includes(role)) {
    alert("Vai trò chỉ từ 1 đến 3");
    return;
  }

  const res = await fetch(`${API_URL}/dangky`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      mat_khau: password,
      role: Number(role)
    })
  });

  const result = await res.json();

  if (!result.success) {
    alert(result.message || "Đăng ký thất bại");
    return;
  }

  alert("Đăng ký thành công!");
  window.location.href = "dangnhap.html";
});
