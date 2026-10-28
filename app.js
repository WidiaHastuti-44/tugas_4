"use strict";

// =====================================
// 1. INTERAKSI STATUS APLIKASI SIKA
// =====================================

const btnCek = document.getElementById("btnCek");
const statusAplikasi = document.getElementById("statusAplikasi");

if (btnCek && statusAplikasi) {
    btnCek.addEventListener("click", function () {
        statusAplikasi.textContent =
            "SIKA aktif dan JavaScript berjalan.";

        statusAplikasi.classList.add("success");
    });
}

// =====================================
// 2. MEMILIH ELEMEN FORM MAHASISWA
// =====================================

const formMahasiswa = document.getElementById("formMahasiswa");

const nim = document.getElementById("nim");
const nama = document.getElementById("nama");
const email = document.getElementById("email");
const prodi = document.getElementById("prodi");

const errorNim = document.getElementById("errorNim");
const errorNama = document.getElementById("errorNama");
const errorEmail = document.getElementById("errorEmail");
const errorProdi = document.getElementById("errorProdi");

// =====================================
// 3. FUNGSI PESAN KESALAHAN
// =====================================

function setError(element, message) {
    if (element) {
        element.textContent = message;
    }
}

function clearError(element) {
    if (element) {
        element.textContent = "";
    }
}

function showFieldError(input, errorElement, message) {
    setError(errorElement, message);

    if (input) {
        input.classList.add("input-error");
        input.setAttribute("aria-invalid", "true");
    }
}

function clearFieldError(input, errorElement) {
    clearError(errorElement);

    if (input) {
        input.classList.remove("input-error");
        input.setAttribute("aria-invalid", "false");
    }
}

// =====================================
// 4. VALIDASI NIM
// Aturan latihan: tepat 8 digit angka
// =====================================

function validateNim() {
    if (!nim) return true;

    const value = nim.value.trim();
    const numeric = /^\d{8}$/;

    if (!numeric.test(value)) {
        showFieldError(
            nim,
            errorNim,
            "NIM harus terdiri dari 8 digit angka."
        );

        return false;
    }

    clearFieldError(nim, errorNim);
    return true;
}

// =====================================
// 5. VALIDASI NAMA LENGKAP
// Minimal 3 karakter
// =====================================

function validateNama() {
    if (!nama) return true;

    const value = nama.value.trim();

    if (value.length < 3) {
        showFieldError(
            nama,
            errorNama,
            "Nama lengkap minimal 3 karakter."
        );

        return false;
    }

    clearFieldError(nama, errorNama);
    return true;
}

// =====================================
// 6. VALIDASI EMAIL
// =====================================

function validateEmail() {
    if (!email) return true;

    const value = email.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(value)) {
        showFieldError(
            email,
            errorEmail,
            "Format email tidak valid."
        );

        return false;
    }

    clearFieldError(email, errorEmail);
    return true;
}

// =====================================
// 7. VALIDASI PROGRAM STUDI
// =====================================

function validateProdi() {
    if (!prodi) return true;

    if (prodi.value === "") {
        showFieldError(
            prodi,
            errorProdi,
            "Program studi wajib dipilih."
        );

        return false;
    }

    clearFieldError(prodi, errorProdi);
    return true;
}

// =====================================
// 8. EVENT PADA FORM
// =====================================

if (formMahasiswa && nim && nama && email && prodi) {

    // Validasi ketika pengguna selesai mengisi field
    nim.addEventListener("blur", validateNim);
    nama.addEventListener("blur", validateNama);
    email.addEventListener("blur", validateEmail);

    // Validasi ketika pilihan program studi berubah
    prodi.addEventListener("change", validateProdi);

    // Bersihkan pesan setelah pengguna memperbaiki input
    nim.addEventListener("input", function () {
        if (nim.classList.contains("input-error")) {
            validateNim();
        }
    });

    nama.addEventListener("input", function () {
        if (nama.classList.contains("input-error")) {
            validateNama();
        }
    });

    email.addEventListener("input", function () {
        if (email.classList.contains("input-error")) {
            validateEmail();
        }
    });

    // Validasi seluruh field ketika form dikirim
    formMahasiswa.addEventListener("submit", function (event) {
        event.preventDefault();

        const nimValid = validateNim();
        const namaValid = validateNama();
        const emailValid = validateEmail();
        const prodiValid = validateProdi();

        if (
            !nimValid ||
            !namaValid ||
            !emailValid ||
            !prodiValid
        ) {
            return;
        }

        // Bab 4 belum menyimpan data ke database.
        alert(
            "Validasi berhasil. Data siap diproses pada tahap PHP."
        );
    });
}

// =====================================
// 9. PENCARIAN TABEL MAHASISWA
// Mencari berdasarkan teks pada baris
// =====================================

const cariMahasiswa =
    document.getElementById("cariMahasiswa");

const tabelMahasiswa =
    document.getElementById("tabelMahasiswa");

const pesanTidakDitemukan =
    document.getElementById("pesanTidakDitemukan");

if (cariMahasiswa && tabelMahasiswa) {

    const rows = tabelMahasiswa.querySelectorAll("tbody tr");

    function filterMahasiswa() {
        const keyword =
            cariMahasiswa.value.trim().toLowerCase();

        let jumlahCocok = 0;

        rows.forEach(function (row) {
            const teksBaris =
                row.textContent.toLowerCase();

            const cocok = teksBaris.includes(keyword);

            row.hidden = !cocok;

            if (cocok) {
                jumlahCocok++;
            }
        });

        if (pesanTidakDitemukan) {
            pesanTidakDitemukan.textContent =
                jumlahCocok === 0
                    ? "Data tidak ditemukan."
                    : "";
        }
    }

    cariMahasiswa.addEventListener(
        "input",
        filterMahasiswa
    );
}

// =====================================
// 10. PESAN UNTUK DEBUGGING AWAL
// =====================================

console.log("JavaScript SIKA aktif.");