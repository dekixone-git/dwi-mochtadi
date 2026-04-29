const scriptURL =
  "https://script.google.com/macros/s/AKfycbwT_3kkzVrea8Fmy7XiaJP2zjAYxytLbY6PPfZ_P3FBvYuuiTDcOSyZ3YN0fJUxjvR3/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvpForm");
  const statusMsg = document.getElementById("statusMsg");
  const listUcapan = document.getElementById("listUcapan");

  if (!form) return;

  // SUBMIT FORM
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    statusMsg.innerText = "Mengirim...";

    try {
      const formData = new FormData(form);

      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.ok) {
        statusMsg.innerText = "Ucapan berhasil dikirim ❤️";
        form.reset();
        loadUcapan();
      } else {
        statusMsg.innerText = result.message || "Gagal mengirim";
      }

    } catch (error) {
      statusMsg.innerText = "Terjadi kesalahan koneksi";
      console.error(error);
    }
  });

  // LOAD DATA
  async function loadUcapan() {
    try {
      const res = await fetch(scriptURL);
      const data = await res.json();

      let html = "";

      data.reverse().forEach(item => {
        html += `
          <div class="ucapan-item">
            <h4>${item.nama || "-"}</h4>
            <small>${item.hubungan || ""}</small>
            <p>${item.pesan || ""}</p>
          </div>
        `;
      });

      listUcapan.innerHTML = html;

    } catch (error) {
      listUcapan.innerHTML =
        "<p style='color:white'>Gagal memuat ucapan</p>";
      console.error(error);
    }
  }

  loadUcapan();
});