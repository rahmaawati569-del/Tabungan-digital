
let saldo = Number(localStorage.getItem("saldo")) || 0;

let riwayat = JSON.parse(
    localStorage.getItem("riwayat")
) || [];

const saldoElement = document.getElementById("saldo");
const riwayatElement = document.getElementById("riwayat");
const inputJumlah = document.getElementById("jumlah");

// Format rupiah
function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

// Menampilkan saldo
function tampilkanSaldo() {
    saldoElement.textContent = formatRupiah(saldo);
}

// Menampilkan riwayat
function tampilkanRiwayat() {
    riwayatElement.innerHTML = "";

    if (riwayat.length === 0) {
        riwayatElement.innerHTML =
            "<li>Belum ada transaksi</li>";
        return;
    }

    riwayat.forEach(function (item) {
        const li = document.createElement("li");
        li.className = item.jenis === "Setor" ? "setor" : "ambil";

        li.textContent =
            item.jenis + " - " + formatRupiah(item.jumlah) +
            " | " + item.tanggal;

        riwayatElement.appendChild(li);
    });
}

// Menyimpan data
function simpanData() {
    localStorage.setItem("saldo", saldo);
    localStorage.setItem("riwayat", JSON.stringify(riwayat));
}

// Menambahkan transaksi
function tambahRiwayat(jenis, jumlah) {
    riwayat.unshift({
        jenis: jenis,
        jumlah: jumlah,
        tanggal: new Date().toLocaleString("id-ID")
    });

    simpanData();
    tampilkanSaldo();
    tampilkanRiwayat();
}

// Setor uang
function setorUang() {
    const jumlah = Number(inputJumlah.value);

    if (!Number.isFinite(jumlah) || jumlah <= 0) {
        alert("Masukkan jumlah uang yang valid!");
        return;
    }

    saldo += jumlah;
    tambahRiwayat("Setor", jumlah);

    inputJumlah.value = "";
    alert("Uang berhasil ditambahkan!");
}

// Ambil uang
function ambilUang() {
    const jumlah = Number(inputJumlah.value);

    if (!Number.isFinite(jumlah) || jumlah <= 0) {
        alert("Masukkan jumlah uang yang valid!");
        return;
    }

    if (jumlah > saldo) {
        alert("Saldo tidak mencukupi!");
        return;
    }

    saldo -= jumlah;
    tambahRiwayat("Ambil", jumlah);

    inputJumlah.value = "";
    alert("Uang berhasil diambil!");
}

// Menampilkan data saat halaman dibuka
tampilkanSaldo();
tampilkanRiwayat();


