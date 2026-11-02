# Praktikum React: Effect, Custom Hook, dan Router

Aplikasi ini merupakan proyek praktikum Pemrograman Web untuk mempelajari `useEffect`, custom hook, Context API, React Router, pengelolaan state, dan penyimpanan data menggunakan `localStorage`.

## 1. Persyaratan lingkungan

Pastikan perangkat sudah memiliki:

- Node.js **22.12.0 atau lebih baru** (Node.js 24 juga dapat digunakan).
- npm yang terpasang bersama Node.js.
- Editor kode, misalnya Visual Studio Code.
- Browser modern, misalnya Google Chrome, Firefox, atau Microsoft Edge.
- Koneksi internet saat pertama kali memasang dependency.

### Versi lingkungan acuan

Versi berikut tercatat pada verifikasi paket praktikum tanggal 27 Oktober 2026. Versi pada komputer yang digunakan untuk mengerjakan praktikum dapat berbeda. Periksa dan catat versi aktual perangkat sebelum mengumpulkan laporan.

| Komponen | Versi acuan |
|---|---:|
| Node.js | 24.22.1 |
| npm | 11.9.0 |
| React | 19.3.1 |
| React DOM | 19.3.1 |
| React Router | 7.18.4 |
| Vite | 7.3.7 |
| @vitejs/plugin-react | 5.2.0 |
| ESLint | 9.39.5 |

Untuk memeriksa versi pada komputer sendiri, jalankan perintah berikut dari terminal:

```bash
node --version
npm --version
npm list react react-dom react-router vite @vitejs/plugin-react eslint
```

**Sistem operasi:** isi sesuai perangkat yang digunakan, misalnya Windows 11 64-bit, Ubuntu 24.04 LTS, atau macOS.

## 2. Cara menjalankan aplikasi

### Langkah 1 — Ekstrak proyek

Ekstrak ZIP proyek praktikum terlebih dahulu. Jangan menjalankan aplikasi dengan membuka `index.html` melalui klik ganda.

### Langkah 2 — Buka folder proyek

Buka terminal pada folder aplikasi yang berisi file `package.json`, yaitu folder `praktikum-spa`.

Pastikan terminal berada di folder yang sama dengan `package.json`. Folder yang benar adalah `praktikum-spa`, bukan folder paket paling luar.

### Langkah 3 — Pasang dependency

Jalankan:

```bash
npm ci
```

Perintah ini memasang dependency berdasarkan versi yang tercatat di `package-lock.json`. Folder `node_modules` dibuat secara otomatis. Karena itu, folder tersebut tidak perlu disertakan dalam pengumpulan proyek.

### Langkah 4 — Jalankan server pengembangan

Jalankan:

```bash
npm run dev
```

Terminal akan menampilkan alamat aplikasi, biasanya:

```text
http://localhost:5173
```

Buka alamat tersebut melalui browser. Biarkan terminal tetap berjalan selama aplikasi digunakan.

Untuk menghentikan server, tekan `Ctrl + C` pada terminal.

**Catatan Windows:** apabila PowerShell memblokir `npm.ps1`, jalankan perintah melalui Command Prompt atau gunakan `npm.cmd`.

## 3. Perintah pemeriksaan proyek

Jalankan perintah berikut dari folder yang sama dengan `package.json`.

### Memeriksa kode dengan ESLint

```bash
npm run lint
```

Perintah ini memeriksa masalah kode berdasarkan konfigurasi ESLint, termasuk beberapa aturan React Hooks.

### Membuat production build

```bash
npm run build
```

Perintah ini membuat hasil build aplikasi di folder `dist`.

### Menjalankan hasil build secara lokal

```bash
npm run preview
```

Vite Preview biasanya menggunakan alamat `http://localhost:4173`. Gunakan alamat yang benar-benar ditampilkan oleh terminal.

## 4. Halaman dan fitur aplikasi

Aplikasi menggunakan React Router untuk menampilkan beberapa halaman dalam satu Single Page Application (SPA).

| URL | Halaman | Keterangan |
|---|---|---|
| `/` | Beranda | Halaman awal aplikasi. |
| `/products` | Katalog | Menampilkan produk, pencarian, dan filter kategori. |
| `/products/:id` | Detail produk | Menampilkan produk berdasarkan ID pada URL. |
| `/favorites` | Favorit | Menampilkan produk yang disimpan sebagai favorit dan menyediakan tombol hapus semua favorit. |
| `/about` | Tentang | Menjelaskan tujuan aplikasi praktikum. |
| URL lain | Not Found | Menampilkan halaman ketika route tidak tersedia. |

### Pencarian dan filter kategori

Pencarian menggunakan query parameter `q`, sedangkan filter kategori menggunakan query parameter `category`.

Contoh:

```text
/products?q=Buku
/products?category=Buku
/products?q=Buku&category=Buku
```

Ketika salah satu filter diubah, parameter lainnya tetap dipertahankan. Nilai pencarian dan kategori dibaca dari URL sehingga dapat mengikuti navigasi Back dan Forward pada browser.

### Favorit dan penyimpanan

Daftar favorit dikelola melalui state bersama yang disediakan oleh Favorites Provider dan Context. Perubahan daftar favorit disimpan ke `localStorage` dengan key:

```text
praktikum-favorites-v1
```

Data favorit dapat dipulihkan setelah halaman dimuat ulang pada browser dan origin yang sama. Tombol **Hapus semua favorit** mengosongkan daftar favorit; badge navigasi, kartu produk, dan data `localStorage` mengikuti perubahan tersebut.

`localStorage` terikat pada origin (kombinasi protokol, host, dan port). Menggunakan host atau port yang berbeda dapat menghasilkan penyimpanan yang berbeda.

## 5. Catatan struktur dan teknologi

Teknologi utama yang digunakan:

- **React** untuk membangun antarmuka berbasis komponen.
- **useState** untuk mengelola state.
- **useEffect** untuk menyinkronkan state dengan sistem di luar React, termasuk `localStorage` dan judul tab browser.
- **Custom Hook** untuk membungkus logika yang dapat digunakan kembali.
- **Context API** untuk menyediakan state favorit bersama kepada beberapa komponen.
- **React Router** untuk navigasi SPA, route dinamis, dan query parameter.
- **Vite** untuk menjalankan server pengembangan dan membuat production build.

Pastikan isi bagian fitur di atas sesuai dengan implementasi akhir proyek sebelum README dikumpulkan.

## 6. Catatan deployment

Aplikasi menggunakan `BrowserRouter`. Pada server produksi, permintaan langsung ke route seperti `/products/1` harus diarahkan kembali ke `index.html` agar React Router dapat menampilkan halaman yang sesuai.

Konfigurasi fallback bergantung pada layanan hosting yang digunakan. Tanpa konfigurasi tersebut, membuka atau me-reload route secara langsung dapat menghasilkan respons 404 dari server. Menjalankan `npm run dev` atau `npm run preview` secara lokal tidak dengan sendirinya membuktikan bahwa konfigurasi server produksi sudah benar.

## 7. Informasi pengumpulan

Sertakan file dan folder berikut:

- Folder `src` beserta kode aplikasi.
- `package.json`.
- `package-lock.json`.
- `README.md` ini.
- Laporan praktikum dan lembar hasil pengujian.
- Bukti tangkapan layar sesuai skenario pengujian.

Jangan sertakan folder `node_modules`.
