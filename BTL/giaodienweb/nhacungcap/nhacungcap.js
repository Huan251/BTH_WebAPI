const API_URL = "http://localhost:3000/api";

const params = new URLSearchParams(window.location.search);
const ma_ncc = Number(params.get("ma_ncc"));

if (!ma_ncc || isNaN(ma_ncc)) {
    alert("Mã nhà cung cấp không hợp lệ");
    window.location.href = "../trangchu/trangchu.html";
}

let originalData = null;

/* ================= LOAD NCC ================= */
fetch(`${API_URL}/nhacungcap/${ma_ncc}`)
    .then(res => res.json())
    .then(result => {
        const ncc = result.data ?? result;
        originalData = { ...ncc };

        const img = document.getElementById("ncc-img");
        img.src = `../Anh/ncc/${ncc.MaNCC}.png`;
        img.onerror = () => img.src = "../Anh/ncc/ncc.png";
        img.style.width = "400px";
        img.style.height = "400px";
        img.style.objectFit = "contain";

        const box = document.getElementById("ncc-info");
        box.innerHTML = `
            <h2>${ncc.TenNCC}</h2>

            ${row("Mã nhà cung cấp", `<input value="${ncc.MaNCC}" disabled>`)}
            ${row("Tên nhà cung cấp", `
                <input id="ten_ncc" value="${ncc.TenNCC}">
                <div class="error" id="e_ten_ncc"></div>
            `)}
            ${row("Điện thoại", `
                <input id="dien_thoai" value="${ncc.DienThoai ?? ""}">
                <div class="error" id="e_dien_thoai"></div>
            `)}
            ${row("Email", `
                <input id="email" value="${ncc.Email ?? ""}">
                <div class="error" id="e_email"></div>
            `)}
            ${row("Địa chỉ", `
                <input id="dia_chi" value="${ncc.DiaChi ?? ""}">
            `)}

            <div style="display:flex;gap:10px;margin-top:12px">
                <button onclick="goBack()">⬅ Trở về</button>
                <button id="btnUpdate" disabled onclick="update()">💾 Cập nhật</button>
            </div>
        `;

        document
            .querySelectorAll("#ten_ncc,#dien_thoai,#email,#dia_chi")
            .forEach(i => i.addEventListener("input", validateAll));

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

/* ================= CLEAR ERROR ================= */
function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.innerText = "");
}

/* ================= VALIDATE ================= */
function validateAll() {
    let ok = true;
    clearErrors();

    const Ten = ten_ncc.value.trim();
    const DienThoai = dien_thoai.value.trim();
    const Email = email.value.trim();

    if (!Ten) {
        err("e_ten_ncc", "Tên nhà cung cấp không được trống");
    }

    if (DienThoai && !/^\d{9,11}$/.test(DienThoai)) {
        err("e_dien_thoai", "Số điện thoại không hợp lệ");
    }

    if (Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
        err("e_email", "Email không hợp lệ");
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
        ten_ncc.value.trim() !== originalData.TenNCC ||
        dien_thoai.value.trim() !== (originalData.DienThoai ?? "") ||
        email.value.trim() !== (originalData.Email ?? "") ||
        dia_chi.value.trim() !== (originalData.DiaChi ?? "")
    );
}

/* ================= UPDATE ================= */
async function update() {
    const data = {
        ten_ncc: ten_ncc.value.trim(),
        dien_thoai: dien_thoai.value.trim(),
        email: email.value.trim(),
        dia_chi: dia_chi.value.trim()
    };

    const res = await fetch(`${API_URL}/nhacungcap/${ma_ncc}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        alert("Cập nhật thất bại");
        return;
    }

    alert("Cập nhật thành công");
    location.reload();
}

/* ================= TRỞ VỀ ================= */
function goBack() {
    window.location.href = "../trangchu/trangchu.html";
}
